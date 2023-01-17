import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('Should be able to read a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(
      inMemoryNotificationRepository,
    );

    const notification = makeNotification();

    await inMemoryNotificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to read a non existing notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(
      inMemoryNotificationRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
