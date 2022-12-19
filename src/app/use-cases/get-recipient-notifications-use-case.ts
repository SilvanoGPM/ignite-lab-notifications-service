import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

export interface GetRecipientNotificationsRequest {
  recipientId: string;
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
