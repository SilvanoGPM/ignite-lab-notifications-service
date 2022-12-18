import { randomUUID } from 'node:crypto';

export class BaseEntity {
  protected _id: string;

  constructor() {
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }
}
