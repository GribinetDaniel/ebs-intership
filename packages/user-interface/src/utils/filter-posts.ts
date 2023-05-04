import { Post } from "../types";

export function filterPosts(inputText: string, posts: Array<Post>) {
 const filtredPosts = posts?.filter(el => {
  if (inputText === "") return el;
  let findByTagName = false;
  el.tags?.forEach(tag => {
   if (tag.name.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())) {
    findByTagName = true;
   }
  });
  return (
   el.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()) ||
   el.body.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()) ||
   findByTagName
  );
 });
 return filtredPosts;
}
