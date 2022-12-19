import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

export interface CancelNotificationRequest {
  notificationId: string;
}

export type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
