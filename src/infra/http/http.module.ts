import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { UnreadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notifications-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    GetRecipientNotificationsUseCase,
    CountRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
