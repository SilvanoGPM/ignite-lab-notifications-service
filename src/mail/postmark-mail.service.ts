import { MailService } from './mail.service';

export class PostmarkMailService implements MailService {
  sendMail(mail: string): string {
    return `Send mail : "${mail}" with PostmarkMail`;
  }
}
