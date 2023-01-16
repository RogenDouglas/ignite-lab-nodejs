import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      createAt: notification.createAt,
    };
  }
}
