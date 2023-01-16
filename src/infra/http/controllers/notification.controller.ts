import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dtos/create-notificationDTO';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

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
