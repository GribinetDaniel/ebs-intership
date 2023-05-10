import { faker } from "@faker-js/faker";
import { delay, mainAxios } from "../utils";
import { Post } from "../types/post";

main();

async function main() {
 let posts = await getPosts();
 let updatedPosts = await updatePosts(posts);
 savePosts(updatedPosts);
}

async function getPosts() {
 return (await mainAxios.get("posts")).data;
}

function updatePosts(posts: Array<Post>) {
 for (let post of posts) post.imageURL = faker.image.image(640, 480);
 return posts;
}

async function savePosts(posts: Array<Post>) {
 for (let post of posts) {
  await mainAxios.patch(`posts/${post.id}`, post);
  await delay(100);
 }
}
