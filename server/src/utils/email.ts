import nodemailer, { TransportOptions } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

export interface MailCustomOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = (options: MailCustomOptions): void => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    logger: true
  });

  // Define the email options
  const mailOptions: MailOptions = {
    from: 'Fashion <hoangloc@fashion.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send the email
  transporter.sendMail(mailOptions);
};
