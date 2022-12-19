import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';
import { Replace } from '@helpers/replace';

type Override = Partial<Replace<NotificationProps, { content: string }>>;

export function makeNotification({ content, ...override }: Override = {}) {
  return new Notification({
    content: new Content(content ?? 'You recieve a notification'),
    category: override.category ?? 'generic',
    recipientId: override.recipientId ?? 'test-recipient-id',
    ...override,
  });
}
