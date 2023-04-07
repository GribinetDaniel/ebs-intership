import React from 'react';
import { Post } from '../types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/user-context';
import { useLocation, useNavigate } from 'react-router-dom';

export function PostCard(props: Post) {
  const { user } = React.useContext(UserContext);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <Card className='col-md-3'>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card.Body>
      {(user?.permission === 'admin' ||
        (pathname === '/own-posts' && user?.id === props.userId)) && (
        <Card.Footer>
          <Button
            className=''
            variant='primary'
            onClick={() => navigate(`/posts/${props.id}`)}
          >
            Edit
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
