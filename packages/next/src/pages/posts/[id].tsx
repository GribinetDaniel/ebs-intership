import React from "react";
import { Post } from "@/types";
import PostContent from "@/components/PostContent/PostContent";
import Custom500 from "../500";
import { mainAxios } from "@/utils";
import { GetStaticProps } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

interface PostProps {
 post: Post;
}

interface StaticProps extends NextParsedUrlQuery {
 id: string;
}

export default function Post({ post }: PostProps) {
 return <PostContent post={post} />;
}

export async function getStaticPaths() {
 const posts = (await mainAxios.get("/posts")).data;
 const paths = posts.map((post: Post) => ({
  params: { id: post.id.toString() },
 }));
 return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async context => {
 const { id } = context.params as StaticProps;
 const res = (await mainAxios.get(`/posts/${id}`)).data;
 return { props: { post: res } };
};
