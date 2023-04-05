import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function UserCard({ user, setShowModal, setSelectedUser }: any) {
  return (
    <Card className='col-md-3'>
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Subtitle>{user.name}</Card.Subtitle>
        <Card.Text>
          Email: {user.email}
          <br />
          Phone: {user.phone}
          <br />
          Permission: {user.permission}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          variant='primary'
          onClick={() => {
            setShowModal(true);
            setSelectedUser(user);
          }}
        >
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
}
