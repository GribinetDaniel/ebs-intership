import React from "react";
import { Post } from "@/types";
import PostContent from "@/components/PostContent/PostContent";
interface PostProps {
 post: Post;
}

export default function Post({ post }: PostProps) {
 return <PostContent post={post} />;
}

export async function getStaticPaths() {
 const res = await fetch("http://localhost:1234/posts");
 const posts = await res.json();
 const paths = posts.map((post: Post) => ({
  params: { id: post.id.toString() },
 }));
 return { paths, fallback: false };
}

export async function getStaticProps(params: any) {
 let url = "http://localhost:1234/posts/" + params.params.id;
 console.log(url);
 const res = await fetch(url);
 const post = await res.json();
 return { props: { post } };
}
