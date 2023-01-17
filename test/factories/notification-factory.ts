import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { randomUUID } from 'crypto';

type NotificaitionPropsOverride = Partial<NotificationProps>;

export function makeNotification(
  notificationProps: NotificaitionPropsOverride = {},
) {
  return new Notification({
    recipientId: randomUUID(),
    content: new Content('This is a message'),
    category: 'social',
    ...notificationProps,
  });
}
