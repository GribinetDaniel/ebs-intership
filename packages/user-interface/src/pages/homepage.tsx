import React from 'react'
import { UserContext } from '../context/myContext';
import { Post } from '../types/post';
import {Header} from '../components/header'
import Container from 'react-bootstrap/Container'
function Homepage() {

    const {posts, setPosts} = React.useContext(UserContext)
    return (
        <>
        <Header/>
        <Container>
        <h2>Home page</h2>
        <ul>
            {posts?.map((post: Post) => (
                <li><div>{post.title}</div></li>
            ))}
        </ul>
        </Container>
        </>
    )
}

export default Homepage;