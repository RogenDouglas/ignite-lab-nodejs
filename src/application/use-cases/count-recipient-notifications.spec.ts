import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { randomUUID } from 'crypto';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count notification', () => {
  it('Should be able to count recipient notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      inMemoryNotificationRepository,
    );

    const recipientId = randomUUID();

    await inMemoryNotificationRepository.create(
      makeNotification({ recipientId }),
    );

    await inMemoryNotificationRepository.create(
      makeNotification({ recipientId }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
