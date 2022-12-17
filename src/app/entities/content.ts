export class Content {
  private readonly content: string;

  public get value() {
    return this.content;
  }

  private validateContentLength(content: string) {
    return content.length > 5 && content.length < 2040;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }
}
