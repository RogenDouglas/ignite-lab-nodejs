import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('Should be able to unread a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(
      inMemoryNotificationRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await inMemoryNotificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationRepository.notifications[0].readAt).toBeNull();
  });

  it('Should not be able to unread a non existing notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(
      inMemoryNotificationRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
