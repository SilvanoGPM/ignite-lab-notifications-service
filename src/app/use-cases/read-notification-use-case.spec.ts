import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { ReadNotificationUseCase } from './read-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('Read notification use case', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it does not exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotificationUseCase(
      notificationRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'test-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
