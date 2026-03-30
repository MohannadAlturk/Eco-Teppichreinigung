export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
