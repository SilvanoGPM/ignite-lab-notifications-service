import { Content } from '../entities/content';
import { Notification } from '../entities/notification';

export interface SendNotificationRequest {
  recipientId: string;
  category: string;
  content: string;
}

export interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotificationUseCase {
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    return { notification };
  }
}
