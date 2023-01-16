import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('Should be able to send a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(
      inMemoryNotificationRepository,
    );

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'social',
    });

    expect(inMemoryNotificationRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
