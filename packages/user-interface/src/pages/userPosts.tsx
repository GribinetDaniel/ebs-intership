import React from 'react'
import {UserContext} from '../context/myContext'
import {Post} from '../types/post'
import {Header} from '../components/header'
import { PostCard } from '../components/postCard'
import Container from 'react-bootstrap/Container'

export function UserPosts() {

    
    const {user, posts} = React.useContext(UserContext)
    const userPosts = posts?.filter((post: Post) => (user?.id === post.userId))

    return (
        <>
        <Header/>
        <Container>
        <h2>Home page</h2>
        <div className = "row justify-content-center" style = {{gap: "80px"}}>
            {userPosts?.map((post: Post) => (
                <PostCard {...post}/>
            ))}
        </div> 
        </Container>
        </>
    )
}