interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  permission: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  userImage: string;
}

export const defaultUser = {
  id: 0,
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  permission: '',
  address: {
    city: '',
    street: '',
    suite: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
  userImage: '#ffd847',
};
