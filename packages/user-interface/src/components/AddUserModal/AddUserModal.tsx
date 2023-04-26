import React from "react";
import { Modal, ModalFooter } from "../Modal";
import { Input } from "../Input";
import { useMutation, useQueryClient } from "react-query";
import { mainAxios, catchAxiosError } from "../../utils";
import { ModalContent } from "../Modal";
import { isAxiosError } from "axios";
import { defaultUser, User } from "../../types";
import { Button } from "../Button";

export interface AddUserModalProps {
 onClose: () => void;
}

export function AddUserModal({ onClose }: AddUserModalProps) {
 const [newUser, setNewUser] = React.useState<User>(defaultUser);

 const [errors, setErrors] = React.useState({
  name: "",
  username: "",
  permission: "",
  email: "",
  password: "",
 });

 const createMutation = useMutation({
  mutationFn: (newUser: User) => {
   return mainAxios.post("/users", newUser);
  },
 });

 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({ ...newUser, [event.target.name]: event.target.value });
 };

 const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({
   ...newUser,
   address: {
    ...newUser.address,
    [event.target.name]: event.target.value,
   },
  });
 };

 const queryClient = useQueryClient();

 async function handleSubmit(event: React.SyntheticEvent) {
  event.preventDefault();
  createMutation.mutate(newUser, {
   onSuccess: () => {
    onClose();
    queryClient.refetchQueries("users");
   },
   onError: error => {
    if (isAxiosError(error)) setErrors(catchAxiosError(error));
    else console.log(error);
   },
  });
 }

 return (
  <Modal title="Create new User" onClickOutside={onClose}>
   <ModalContent>
    <form autoComplete="off">
     <div className="d-flex justify-content-around gap-4">
      <Input
       label="Name"
       type="text"
       name="name"
       value={newUser.name}
       onChange={handleInput}
       errors={errors.name}
      />
      <Input
       label="Username"
       type="text"
       name="username"
       value={newUser.username}
       onChange={handleInput}
       errors={errors.username}
      />
     </div>
     <div className="d-flex justifu-content-around gap-4">
      <Input
       label="Password"
       type="password"
       name="password"
       value={newUser.password}
       onChange={handleInput}
       errors={errors.password}
      />
      <Input
       label="Email"
       type="text"
       name="email"
       value={newUser.email}
       onChange={handleInput}
       errors={errors.email}
      />
     </div>
     <div className="d-flex justify-content-around gap-4">
      <Input
       label="Street"
       type="text"
       name="street"
       value={newUser.address.street}
       onChange={addressInput}
      />
      <Input
       label="Suite"
       type="text"
       name="suite"
       value={newUser.address.suite}
       onChange={addressInput}
      />
     </div>
     <div className="d-flex justify-content-around gap-4">
      <Input
       label="City"
       type="text"
       name="city"
       value={newUser.address.city}
       onChange={addressInput}
      />
      <Input
       label="Phone"
       type="text"
       name="phone"
       value={newUser.phone}
       onChange={handleInput}
      />
     </div>
     <Input
      label="Permission"
      type="text"
      name="permission"
      value={newUser.permission}
      onChange={handleInput}
      errors={errors.permission}
     />
    </form>
   </ModalContent>
   <ModalFooter>
    <Button type="secondary" onClick={onClose}>
     Close
    </Button>
    <Button
     type="primary"
     onClick={handleSubmit}
     disabled={createMutation.isLoading}
    >
     Create
    </Button>
   </ModalFooter>
  </Modal>
 );
}
