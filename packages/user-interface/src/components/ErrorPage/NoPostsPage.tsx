import React from "react";
import img from "./images/no-posts-image.png";
export function NoPostsPage() {
 return (
  <div className="user-posts">
   <div className="no-posts">
    <img src={img} alt="err" />
    <h1>OOOPS...</h1>
    <p>
     No posts yet
     <br />
     Press plus button to create a post
    </p>
   </div>
  </div>
 );
}
