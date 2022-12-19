import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-use-case';

describe('Get recipient notifications use case', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const getRecipientNotifications = new GetRecipientNotificationsUseCase(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
