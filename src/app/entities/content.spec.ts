import { Content } from './content';

describe('Notification Content', () => {
  it('should be be able to create a notification content', () => {
    const expectedContentValue = 'You recieve a notification';

    const content = new Content('You recieve a notification');

    expect(content).toBeTruthy();

    expect(content.value).toEqual(expectedContentValue);
  });

  it('should not be be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('abc')).toThrow();
  });

  it('should not be be able to create a notification content with more than 2400 characters', () => {
    expect(() => new Content('a'.repeat(2401))).toThrow();
  });
});
