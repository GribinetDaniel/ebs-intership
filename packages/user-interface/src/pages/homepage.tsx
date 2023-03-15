import React from 'react'
import { mainAxios } from '../utils/mainAxios';
import {User} from '../types/user'
import axios from 'axios';
import { UserContext } from '../context/myContext';
import { Post } from '../types/post';

function Homepage() {

    const {posts, setPosts} = React.useContext(UserContext)
    console.log(posts)
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