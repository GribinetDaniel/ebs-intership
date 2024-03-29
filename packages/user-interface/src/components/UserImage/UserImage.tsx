import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";
import "./index.scss";
import "../Header/index.scss";

export function UserImage({ style }: any) {
 const { user } = useContext(UserContext);
 return (
  <div className="user-image navbar__link" style={style}>
   {user?.username[0]}
  </div>
 );
}
