export class NameService {

  constructor(
    private name: string,
  ) { }

  public getName(): string {
    return this.name;
  }
}
