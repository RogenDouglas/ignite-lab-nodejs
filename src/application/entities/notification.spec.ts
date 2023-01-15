import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('Você recebeu uma mensagem.'),
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});
