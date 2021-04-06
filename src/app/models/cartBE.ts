export class cartBE {
  constructor(
    public userId: string = '',
    public products: {
      [prop: string]: number;
    } = {
      '': 0,
    }
  ) {}
}
