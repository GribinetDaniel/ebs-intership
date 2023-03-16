import React from 'react'
import { UserContext } from '../context/myContext'
import { Header } from '../components/header'
import { Container } from 'react-bootstrap';
import {User} from '../types/user'
import { UserCard } from '../components/userCard'

export function Users() {

    const {users} = React.useContext(UserContext);


    return (
        <>
        <Header/>
        <Container>
            <h2>Users</h2>
            <div className='row justify-content-center' style={{gap: "80px"}}>
                {users?.map((user: User, index) => (
                    <UserCard {...user}/>
                ))}
            </div>
        </Container>
        </>
    )
}