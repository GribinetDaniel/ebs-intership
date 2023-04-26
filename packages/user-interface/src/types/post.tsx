export interface Tag {
 name: string;
 color: string;
}

export interface Post {
 userId: number;
 id: number;
 title: string;
 body: string;
 tags: Array<Tag>;
}

export const defaultPost: Post = {
 userId: 0,
 id: 0,
 title: "",
 body: "",
 tags: [{ name: "", color: "" }],
};
