export class IdentityError {

  public dictionary: { [code: string]: string } = {};

  public getCodes(): string[] {
    const keys: string[] = [];
    for (const key in this.dictionary) {
      if (key != null) {
        keys.push(key);
      }
    }
    return keys;
  }

  public get(key: string) {
    if (this.dictionary[key] != null && this.dictionary[key] !== undefined) {
      return this.dictionary[key];
    }
  }
  public set(key: string, value: string) {
    this.dictionary[key] = value;
  }
}
