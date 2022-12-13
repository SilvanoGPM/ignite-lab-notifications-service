import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailService {
  abstract sendMail(mail: string): string;
}
