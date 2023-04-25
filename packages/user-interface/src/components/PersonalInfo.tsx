import { Link } from "react-router-dom";
import { Input } from "./Input";
import { User } from "../types";
import "../pages/Register/index.scss";

import { Autocomplete } from "./Autocomplete";

interface PersonalInfoProps {
 user: User;
 handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setValue: (value: string) => void;
 addressInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalInfo({
 user,
 handleInput,
 setValue,
 addressInput,
}: PersonalInfoProps) {
 return (
  <div className="items">
   <form autoComplete="off">
    <Input
     label="Phone"
     type="text"
     name="phone"
     placeholder="+1(XXX) XXX-XXXX"
     value={user.phone}
     onChange={handleInput}
    />
    <Autocomplete setValue={setValue} placeholder="Chisinau" value="" />

    <Input
     label="Street"
     type="text"
     name="street"
     placeholder="M. Eminescu 5"
     value={user.address.street}
     onChange={addressInput}
    />
    <Input
     label="Suite"
     type="text"
     name="suite"
     placeholder="Apt.48"
     value={user.address.suite}
     onChange={addressInput}
    />
    <p>
     Already have an account?
     <Link to="/login" className="register__link">
      {" "}
      Sign In
     </Link>
    </p>
   </form>
  </div>
 );
}
