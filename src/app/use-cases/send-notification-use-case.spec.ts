import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotificationUseCase } from './send-notification-use-case';

describe('Send notification use case', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotificationUseCase(
      notificationRepository,
    );

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'test',
      recipientId: 'test-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
