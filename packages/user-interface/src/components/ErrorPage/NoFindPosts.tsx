import React from "react";
import img from "./images/no-find-posts.png";
export function NoFindPosts() {
 return (
  <div className="user-posts">
   <div className="no-posts">
    <img src={img} alt="No post found" />
    <h1>No results found</h1>
    <p>We couldn't find what you're looking for</p>
   </div>
  </div>
 );
}
