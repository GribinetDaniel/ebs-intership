import React from "react";
import { Header } from "../components/Header";
import { User, defaultUser } from "../types";
import { UserCard } from "../components/UserCard";
import { useQuery } from "react-query";
import { mainAxios } from "../utils";
import { Loading } from "../components/Loading";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { PlusButton } from "../components/PlusButton";
import { AddUserModal } from "../components/AddUserModal";
import { EditUserModal } from "../components/EditUserModal";
import { DeleteUserModal } from "../components/DeleteUserModal";

export function Users() {
 const { isLoading, error, data } = useQuery("users", () => {
  return mainAxios.get("/users");
 });

 const [showModalEdit, setShowModalEdit] = React.useState(false);
 const [showModalAdd, setShowModalAdd] = React.useState(false);
 const [showModalDelete, setShowModalDelete] = React.useState(false);
 const [selectedUser, setSelectedUser] = React.useState<User>(defaultUser);

 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />
     <div className="users">
      <div
       className="d-flex justify-content-around flex-wrap"
       style={{ gap: "30px" }}
      >
       {data?.data.map((user: User) => (
        <UserCard
         user={user}
         onEdit={() => setShowModalEdit(true)}
         onDelete={() => setShowModalDelete(true)}
         onSelect={(user: User) => setSelectedUser(user)}
        />
       ))}
      </div>
     </div>
     {showModalEdit && (
      <EditUserModal
       onClose={() => setShowModalEdit(false)}
       user={selectedUser}
      />
     )}
     <PlusButton onClick={() => setShowModalAdd(true)} />
     {showModalAdd && <AddUserModal onClose={() => setShowModalAdd(false)} />}

     {showModalDelete && (
      <DeleteUserModal
       user={selectedUser}
       onClose={() => setShowModalDelete(false)}
      />
     )}
    </div>
   )}
  </>
 );
}
