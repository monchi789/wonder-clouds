import { Body, Controller, Post } from '@nestjs/common';
import { ContactFormDto } from './dto/send-email.dto';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendContactForm(@Body() contactFormDto: ContactFormDto) {
    try {
      await this.mailService.sendMail(
        process.env.SMTP_USER,
        'Nuevo mensaje del formulario de contacto',
        contactFormDto,
      );

      await this.mailService.enviarCorreoDeConfirmacion(contactFormDto);

      return {
        message:
          'Correo enviado correctamente y confirmación enviada al remitente',
      };
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return {
        message: 'Hubo un error al enviar el correo',
        error: error.message,
      };
    }
  }
}
