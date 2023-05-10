import { Post } from "@/types";
import React from "react";
import styles from "./PostContent.module.css";

interface PostContentProps {
 post: Post;
}

export default function PostContent({ post }: PostContentProps) {
 return (
  <div className={styles.post}>
   <img
    src={post.imageURL}
    alt="Image"
    style={{ width: "750px", borderRadius: "10px" }}
   />
   <div className={styles.description}>
    <h1>{post.title}</h1>
    <p className={styles.paragraph}>{post.body}</p>
   </div>
  </div>
 );
}
