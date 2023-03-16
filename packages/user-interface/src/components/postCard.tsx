import React from 'react'
import {Post} from '../types/post'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { UserContext } from '../context/myContext'

export function PostCard(props: Post) {

    const {user} = React.useContext(UserContext);

    return (
        <Card className = "col-md-3">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.body}</Card.Text>
            </Card.Body>
                {(user?.permission === 'admin' || user?.id === props.userId) && 
                    <Card.Footer>
                        <Button className = '' variant = 'primary'>Edit</Button>
                    </Card.Footer>
                }
        </Card>
    )
}