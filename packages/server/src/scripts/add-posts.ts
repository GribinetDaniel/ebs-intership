import { faker } from "@faker-js/faker";
import { mainAxios, delay } from "../utils";
import { Post } from "../types";
main();

async function main() {
 let { userId, postId } = await getId();
 let newPosts = createPosts(userId, postId);
 await updatePosts(newPosts);
}

async function getId() {
 let x = (await mainAxios.get("/posts")).data;
 let userId = x[x.length - 1].userId;
 let postId = x[x.length - 1].id;
 return { userId, postId };
}

function createPosts(userId: number, postId: number) {
 userId++;
 postId++;

 let posts: Array<Post> = [...Array(10)].map((_, index) => ({
  userId,
  id: postId + index,
  title: faker.lorem.words(3),
  body: faker.lorem.sentences(4, "\n"),
 }));

 return posts;
}

async function updatePosts(posts: Array<Post>) {
 for (let post of posts) {
  await mainAxios.post("/posts", post);
  await delay(100);
 }
}
