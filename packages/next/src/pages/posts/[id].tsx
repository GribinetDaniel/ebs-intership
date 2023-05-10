import React from "react";
import { Post } from "@/types";
import PostContent from "@/components/PostContent/PostContent";
import Custom500 from "../500";
import { mainAxios } from "@/utils";
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
 const res = (await mainAxios.get(`/posts/${params.params.id}`)).data;
 return { props: { post: res } };
}
