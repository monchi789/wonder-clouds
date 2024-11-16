import os
from pathlib import Path
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import smtplib
from jinja2 import Environment, FileSystemLoader
import asyncio
from fastapi import HTTPException
from .config import settings
from .schema import ContactForm

class EmailService:
    def __init__(self):
        self.settings = settings
        self.template_dir = Path(__file__).parent / "templates"
        self.env = Environment(loader=FileSystemLoader(str(self.template_dir)))
        
    def _create_smtp_connection(self):
        try:
            smtp = smtplib.SMTP(self.settings.SMTP_HOST, self.settings.SMTP_PORT)
            smtp.starttls()
            smtp.login(self.settings.SMTP_USERNAME, self.settings.SMTP_PASSWORD)
            return smtp
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al conectar con el servidor SMTP: {str(e)}"
            )
    
    def _create_message(self, template_name: str, data: dict, subject: str, to_email: str) -> MIMEMultipart:
        try:
            template = self.env.get_template(template_name)
            html_content = template.render(**data)
            
            message = MIMEMultipart()
            message["Subject"] = subject
            message["From"] = self.settings.COMPANY_EMAIL
            message["To"] = to_email
            
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)
            
            # Adjuntar logo
            logo_path = self.template_dir / "logo.webp"
            if logo_path.exists():
                with open(str(logo_path), "rb") as f:
                    img = MIMEImage(f.read())
                    img.add_header('Content-ID', '<logo.webp>')
                    message.attach(img)
                    
            return message
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al crear el mensaje: {str(e)}"
            )
    
    async def send_confirmation_email(self, contact_form: ContactForm):
        """Envía email de confirmación al cliente"""
        try:
            data = contact_form.model_dump()
            message = self._create_message(
                template_name="confirmacion.html",
                data=data,
                subject="Confirmación de recepción de mensaje - Wonder Clouds",
                to_email=contact_form.correo
            )
            
            await asyncio.to_thread(self._send_email, message)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al enviar el email de confirmación: {str(e)}"
            )
    
    async def send_notification_email(self, contact_form: ContactForm):
        """Envía email de notificación al equipo"""
        try:
            data = contact_form.model_dump()
            message = self._create_message(
                template_name="envio.html",
                data=data,
                subject=f"Nuevo mensaje de contacto de {contact_form.nombre}",
                to_email=self.settings.COMPANY_EMAIL
            )
            
            await asyncio.to_thread(self._send_email, message)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al enviar el email de notificación: {str(e)}"
            )
    
    def _send_email(self, message: MIMEMultipart):
        """Método auxiliar para enviar emails"""
        with self._create_smtp_connection() as smtp:
            smtp.send_message(message)
    
    async def process_contact_form(self, contact_form: ContactForm):
        """Procesa el formulario de contacto enviando ambos emails"""
        try:
            # Enviar emails de forma asíncrona
            await asyncio.gather(
                self.send_confirmation_email(contact_form),
                self.send_notification_email(contact_form)
            )
            
            return {
                "status": "success", 
                "message": "Emails enviados correctamente"
            }
            
        except HTTPException as http_err:
            raise http_err
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error inesperado al procesar el formulario: {str(e)}"
            )
