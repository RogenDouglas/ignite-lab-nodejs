import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
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
      new Notification({
        recipientId,
        content: new Content('This one message'),
        category: 'social',
      }),
    );

    await inMemoryNotificationRepository.create(
      new Notification({
        recipientId,
        content: new Content('This two message'),
        category: 'social',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
