import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { UnreadNotificationUseCase } from './unread-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('Unread notification use case', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'test-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
