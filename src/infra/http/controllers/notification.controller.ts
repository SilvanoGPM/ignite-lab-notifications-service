import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  HttpCode,
} from '@nestjs/common';

import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationMapper } from '../mappers/notification-mapper';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
  ) {}

  @Get(':recipientId/find')
  async findManyByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationMapper.toHttp),
    };
  }

  @Get(':recipientId/count')
  async countByRecipient(@Param('recipientId') recipientId: string) {
    return this.countRecipientNotifications.execute({ recipientId });
  }

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const { recipientId, category, content } = createNotificationDto;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationMapper.toHttp(notification) };
  }

  @Patch(':id/read')
  @HttpCode(204)
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  @HttpCode(204)
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch(':id/cancel')
  @HttpCode(204)
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }
}
