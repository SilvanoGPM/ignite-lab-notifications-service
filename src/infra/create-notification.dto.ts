import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 2048)
  content: string;

  @IsNotEmpty()
  category: string;
}
