export class CreateUser {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public sex: string,
    public telephone: string,
    public username: string,
    public addressEntity: {
      address: string;
      city: string;
      county: string;
      postalCode: string;
    }
  ) {}
}
