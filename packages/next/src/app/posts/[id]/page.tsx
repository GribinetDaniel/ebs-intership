"use client";
import Loading from "@/components/Loading/Loading";
import PostContent from "@/components/PostContent/PostContent";
import { Post } from "@/types";
import { mainAxios } from "@/utils";
import React from "react";

export default function Post({ params }: { params: { id: string } }) {
 const [post, setPost] = React.useState<Post>();

 React.useEffect(() => {
  async function fetchData() {
   const res = await mainAxios.get(`posts/${params.id}`);
   const data = await res.data;
   setPost(data);
  }
  fetchData();
 }, []);

 if (!post) return <Loading />;
 return <PostContent post={post} />;
}

export async function generateStaticParams() {
 const posts = (await mainAxios.get("/posts")) as Array<Post>;
 return posts.map(post => ({
  id: post.id,
 }));
}
