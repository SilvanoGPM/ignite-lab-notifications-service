import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '../../../app/use-cases/send-notification-use-case';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const { recipientId, category, content } = createNotificationDto;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification };
  }
}
