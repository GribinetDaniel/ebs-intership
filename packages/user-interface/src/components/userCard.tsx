import React from 'react'
import { User } from '../types/user'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export function UserCard(props: User) {

    return(
        <Card className = "col-md-3">
            <Card.Body>
                <Card.Title>{props.username}</Card.Title>
                <Card.Subtitle>{props.name}</Card.Subtitle>
                <Card.Text>
                    Email: {props.email}<br/>
                    Phone: {props.phone}<br/>
                    Permission: {props.permission}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant='primary'>Edit</Button>
            </Card.Footer>
        </Card>
    )
}