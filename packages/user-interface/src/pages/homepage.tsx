import React from 'react'
import { UserContext } from '../context/myContext';
import { Post } from '../types/post';
import {Header} from '../components/header'
import {PostCard} from '../components/postCard'
import Container from 'react-bootstrap/Container'
import CardGroup from 'react-bootstrap/CardGroup'

function Homepage() {

    const {posts, setPosts} = React.useContext(UserContext)
    return (
        <>
        <Header/>
        <Container>
        <h2>Home page</h2>
        <div className = "row justify-content-center" style = {{gap: "80px"}}>
            {posts?.map((post: Post) => (
                <PostCard {...post}/>
            ))}
        </div> 
        </Container>
        </>
    )
}

export default Homepage;