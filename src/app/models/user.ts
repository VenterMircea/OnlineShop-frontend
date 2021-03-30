export interface User {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  telephone: string,
  sex: string,
  password: string,
  addressEntity: addressEntity,
  id: string,
  token?: string,
}

interface addressEntity {
  address: string,
  city: string,
  county: string,
  postalCode: string,
}
