import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('Should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'This is a notification',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
