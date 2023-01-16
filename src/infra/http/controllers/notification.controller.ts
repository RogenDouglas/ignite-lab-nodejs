import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dtos/create-notificationDTO';

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

    return {
      notification,
    };
  }
}
