import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { UserContext } from "../../context/user-context";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../components/Input";
import { defaultUser, User } from "../../types";
import { UserImage } from "../../components/UserImage";
import { CirclePicker } from "react-color";
import { mainAxios } from "../../utils";
import { useQueryClient } from "react-query";
import { isAxiosError } from "axios";
import "./index.scss";
import { Autocomplete } from "../../components/Autocomplete";

export function Account() {
 const { user } = React.useContext(UserContext);
 const navigate = useNavigate();
 const [modifedUser, setModifedUser] = React.useState<User>(defaultUser);
 const [errors, setErrors] = React.useState({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
 });

 React.useEffect(() => {
  if (user) setModifedUser(user);
 }, [user]);

 const queryClient = useQueryClient();

 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setModifedUser({
   ...modifedUser,
   [event.target.name]: event.target.value,
  });
 };

 const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setModifedUser({
   ...modifedUser,
   address: {
    ...modifedUser.address,
    [event.target.name]: event.target.value,
   },
  });
 };

 const handleSubmit = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  try {
   await mainAxios.patch(`/users/${modifedUser.id}`, modifedUser);
   queryClient.refetchQueries("user");
   navigate("/");
  } catch (err) {
   if (isAxiosError(err)) {
    let errs: Array<{ msg: string; param: string }> = [];
    const obj: any = {};
    errs = err!.response!.data.errors;
    errs.forEach(err => (obj[err.param] = err.msg));
    setErrors(obj);
   } else console.log(err);
  }
 };

 return (
  <>
   {user && (
    <div className="content">
     <Header />
     <div className="settings">
      <div className="settings__header">
       <Button
        type="circle"
        onClick={() => navigate("/")}
        className="settings__button--back"
       >
        <FontAwesomeIcon icon={faArrowLeft} size="xs" />
       </Button>
       Account Settings
      </div>
      <hr className="settings__line" />
      <div className="settings__body">
       <div className="settings__left">
        <div className="settings__description">
         <h3>User Information</h3>
         <p>
          Here you can edit public information about yourself <br />
          The changes will be displayed for other users
         </p>
        </div>
        <form autoComplete="off">
         <div className="settings__row">
          <Input
           label="Email"
           name="email"
           type="email"
           value={modifedUser.email}
           onChange={handleInput}
           errors={errors.email}
          />
          <Input
           label="Phone"
           name="phone"
           type="text"
           value={modifedUser.phone}
           onChange={handleInput}
          />
         </div>
         <div className="settings__row">
          <Input
           label="Name"
           name="name"
           type="text"
           value={modifedUser.name}
           onChange={handleInput}
           errors={errors.name}
          />
          <Input
           label="Username"
           name="username"
           type="text"
           value={modifedUser.username}
           onChange={handleInput}
           errors={errors.username}
          />
         </div>
         <div className="settings__row">
          <Autocomplete
           setValue={(value: string) =>
            setModifedUser({
             ...modifedUser,
             address: {
              ...modifedUser.address,
              city: value,
             },
            })
           }
           value={user.address.city}
          />
          <Input
           label="Street"
           name="street"
           type="text"
           value={modifedUser.address.street}
           onChange={addressInput}
          />
          <Input
           label="Suite"
           name="suite"
           type="text"
           value={modifedUser.address.suite}
           onChange={addressInput}
          />
         </div>
        </form>
        <div className="settings__button--save">
         <Button type="primary" onClick={handleSubmit}>
          Save
         </Button>
        </div>
       </div>
       <div className="settings__right">
        <div className="settings__user-image">
         <UserImage
          style={{
           width: "150px",
           height: "150px",
           fontSize: "50px",
           backgroundColor: modifedUser.userImage,
           marginBottom: "30px",
          }}
         />
        </div>
        <CirclePicker
         onChange={(color: any) =>
          setModifedUser({
           ...modifedUser,
           userImage: color.hex,
          })
         }
        />
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
