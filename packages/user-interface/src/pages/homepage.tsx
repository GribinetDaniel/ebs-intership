import React from 'react'
import { UserContext } from '../context/myContext';
import { Post } from '../types/post';
function Homepage() {

    const {posts, setPosts} = React.useContext(UserContext)
    return (
        <>
        <h2>Home page</h2>
        <ul>
            {posts?.map((post: Post) => (
                <li>{post.title}</li>
            ))}
        </ul>
        </>
    )
}

export default Homepage;