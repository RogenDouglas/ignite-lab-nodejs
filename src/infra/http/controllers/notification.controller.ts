import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dtos/create-notificationDTO';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Patch('cancel/:id')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('countByRecipient/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      count,
    };
  }

  @Get('getByRecipient/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch('read/:id')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch('unread/:id')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() createNotificationDTO: CreateNotificationDTO) {
    const { recipientId, content, category } = createNotificationDTO;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    const notificationViewModel = NotificationViewModel.toHttp(notification);

    return {
      notification: notificationViewModel,
    };
  }
}
