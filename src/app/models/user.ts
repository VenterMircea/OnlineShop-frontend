export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  username!: string;
  telephone!: string;
  sex!: string;
  password!: string;
  addressEntity!: addressEntity;
  id!: string;
}
class addressEntity {
  address!: string;
  city!: string;
  county!: string;
  postalCode!: string;
}
