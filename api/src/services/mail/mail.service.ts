import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import mailConfig from 'src/config/mail';

// Пока что это черновик, использоваться будет чуть позже
@Injectable()
export class MailService {
    private readonly mailClient = nodemailer.createTransport(mailConfig);

    async sendMail(recipient: string, subject: string, text: string): Promise<any> {
        return await this.mailClient.sendMail({
            from: 'MegaStore',
            to: recipient,
            subject: subject,
            text: text
        });
    }
}
