import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('Cancel notification use case', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotificationUseCase(
      notificationRepository,
    );

    const notification = new Notification({
      content: new Content('You recieve a notification'),
      category: 'generic',
      recipientId: 'test-recipient-id',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'test-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
