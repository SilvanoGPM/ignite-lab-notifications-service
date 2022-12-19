import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotificationsUseCase } from './count-recipient-notifications-use-case';

describe('Count recipient notifications use case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const countRecipientNotifications = new CountRecipientNotificationsUseCase(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
