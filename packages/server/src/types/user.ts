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
 permission: string;
 confirmPassword?: string;
 address: Address;
 phone: string;
 website: string;
 company: Company;
 userImage: string;
}
