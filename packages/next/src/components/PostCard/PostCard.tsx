import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./PostCard.module.css";

interface PostCardProps {
 post: Post;
}

export function PostCard({ post }: PostCardProps) {
 return (
  <Link href={`/posts/${post.id}`}>
   <div className={styles.postCard}>
    <img src={post.imageURL} alt="image" className={styles.image} />
    <div className={styles.description}>
     <h1>{post.title}</h1>
     <p>{post.body}</p>
    </div>
   </div>
  </Link>
 );
}
