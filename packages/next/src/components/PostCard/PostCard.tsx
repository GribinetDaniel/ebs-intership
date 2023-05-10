import { Post } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactFragment } from "react";
import styles from "./PostCard.module.css";

interface PostCardProps {
 post: Post;
}

export function PostCard({ post }: PostCardProps) {
 const router = useRouter();

 return (
  <div
   className={styles.postCard}
   onClick={() => router.push(`/posts/${post.id}`)}
  >
   <img src={post.imageURL} alt="image" className={styles.image} />
   <div className={styles.description}>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
   </div>
  </div>
 );
}
