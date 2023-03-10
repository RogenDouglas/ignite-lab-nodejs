import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countNotificationsByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return count.length;
  }

  async findNotificationsByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return notifications;
  }
}
