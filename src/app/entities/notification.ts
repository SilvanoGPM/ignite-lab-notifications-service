import { Replace } from 'src/helpers/replace';
import { Content } from './content';
import { BaseEntity } from './base-entity';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readtAt?: Date | null;
  createdAt: Date;
}

export type CreateNotificationProps = Replace<
  NotificationProps,
  { createdAt?: Date }
>;

export class Notification extends BaseEntity {
  private props: NotificationProps;

  constructor(props: CreateNotificationProps) {
    super();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content() {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category() {
    return this.props.category;
  }

  public set readtAt(readtAt: Date | undefined | null) {
    this.props.readtAt = readtAt;
  }

  public get readtAt(): Date | undefined | null {
    return this.props.readtAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
