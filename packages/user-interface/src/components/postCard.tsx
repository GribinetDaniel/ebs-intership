import React from 'react'
import {Post} from '../types/post'
import Card from 'react-bootstrap/Card'

export function PostCard(props: Post) {

    return (
        <Card className = "col-md-3">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.body}</Card.Text>
            </Card.Body>
        </Card>
    )
}