import { MailService } from './mail.service';

export class SMTPMailService implements MailService {
  sendMail(mail: string): string {
    return `Send mail : "${mail}" with SMTPMail`;
  }
}
