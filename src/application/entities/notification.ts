import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createAt?: Date }>) {
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    };
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get createAt(): Date {
    return this.props.createAt;
  }
}
