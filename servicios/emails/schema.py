from pydantic import BaseModel, EmailStr

class ContactForm(BaseModel):
    nombre: str
    correo: EmailStr
    numero: str
    mensaje: str
