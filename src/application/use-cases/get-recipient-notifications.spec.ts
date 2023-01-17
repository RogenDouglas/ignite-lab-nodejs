import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { randomUUID } from 'crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get notifications', () => {
  it('Should be able to get recipient notifications', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      inMemoryNotificationRepository,
    );

    const recipientId = randomUUID();

    await inMemoryNotificationRepository.create(
      makeNotification({ recipientId }),
    );

    await inMemoryNotificationRepository.create(
      makeNotification({ recipientId }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
