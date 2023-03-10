import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(
      inMemoryNotificationRepository,
    );

    const notification = makeNotification();

    await inMemoryNotificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a non existing notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(
      inMemoryNotificationRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
