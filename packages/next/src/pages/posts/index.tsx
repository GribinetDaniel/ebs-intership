import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import React from "react";
import { Post } from "../../types";

interface PostsProps {
 posts: Array<Post>;
}
export default function Posts({ posts }: PostsProps) {
 console.log(posts);
 return (
  <div
   style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "70px",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
   }}
  >
   {posts.map(post => (
    <PostCard post={post} />
   ))}
  </div>
 );
}

export async function getServerSideProps() {
 const res = await fetch("http://localhost:1234/posts");
 const data = await res.json();
 return { props: { posts: data } };
}
