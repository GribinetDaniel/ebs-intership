import React from "react";
import { Post } from "../../types";
import { UserContext } from "../../context/user-context";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { mainAxios } from "../../utils";
import { useQuery } from "react-query";

export function PostCard(props: Post) {
 const { user } = React.useContext(UserContext);
 const pathname = useLocation().pathname;
 const navigate = useNavigate();
 const { data } = useQuery(`author${props.userId}`, () => {
  return mainAxios.get(`/users/${props.userId}`);
 });

 const onEditClick = (e: React.SyntheticEvent) => {
  navigate(`/posts/${props.id}/edit`);
  e.stopPropagation();
 };

 return (
  <>
   {data && (
    <div className="post-card" onClick={() => navigate(`/posts/${props.id}`)}>
     <div className="post-card__label">Name</div>
     <div className="post-card__title">{props.title}</div>
     {(user?.permission === "admin" ||
      (pathname === "/own-posts" && user?.id === props.userId)) && (
      <FontAwesomeIcon
       icon={faPenToSquare}
       className="post-card__icon"
       onClick={onEditClick}
      />
     )}
     <hr className="post-card__line" />
     <div className="post-card__body">{props.body}</div>
     <div className="post-card__footer">
      <div>
       <div className="post-card__label">Author</div>
       <div className="post-card__author">{data.data.username}</div>
      </div>

      <div className="post-card__icon-box">
       <FontAwesomeIcon
        className="post-card__icon--arrow"
        icon={faAngleRight}
        size="2xl"
        style={{ color: "#c5c5c5" }}
       />
      </div>
     </div>
    </div>
   )}
  </>
 );
}
