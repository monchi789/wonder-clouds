import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactFormDto } from './dto/send-email.dto';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, datos: ContactFormDto) {
    const templatePath = path.resolve(__dirname, 'templates', 'envio.html');

    try {
      const htmlContent = await fsPromises.readFile(templatePath, 'utf-8');

      if (!htmlContent) {
        throw new Error('La plantilla HTML está vacía o no se pudo leer.');
      }

      const finalHtmlContent = htmlContent
        .replace('{{nombre}}', datos.nombre)
        .replace('{{correo}}', datos.correo)
        .replace('{{numero}}', datos.numero || 'No proporcionado')
        .replace('{{mensaje}}', datos.mensaje);

      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html: finalHtmlContent,
        attachments: [
          {
            filename: 'logo.png',
            path: path.resolve(__dirname, 'templates', 'logo.webp'),
            cid: 'logo@wonderclouds.com',
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo');
    }
  }

  async enviarCorreoDeConfirmacion(datos: ContactFormDto) {
    const templatePath = path.resolve(
      __dirname,
      'templates',
      'confirmacion.html',
    );

    try {
      const htmlContent = await fsPromises.readFile(templatePath, 'utf-8');

      if (!htmlContent) {
        throw new Error('La plantilla HTML está vacía o no se pudo leer.');
      }

      const finalHtmlContent = htmlContent
        .replace('{{nombre}}', datos.nombre)
        .replace('{{mensaje}}', datos.mensaje);

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: datos.correo,
        subject: 'Confirmación de mensaje enviado',
        html: finalHtmlContent,
        attachments: [
          {
            filename: 'logo.png',
            path: path.resolve(__dirname, 'templates', 'logo.webp'),
            cid: 'logo@wonderclouds.com',
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Correo de confirmación enviado');
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      throw new Error('Error al enviar el correo de confirmación');
    }
  }
}
