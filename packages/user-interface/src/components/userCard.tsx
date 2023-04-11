import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function UserCard({
  user,
  setShowModalEdit,
  setSelectedUser,
  setShowModalDelete,
}: any) {
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
      <Card.Footer style={{ display: 'flex', gap: '170px' }}>
        <Button
          variant='secondary'
          onClick={() => {
            setShowModalDelete(true);
            setSelectedUser(user);
          }}
        >
          Delete
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            setShowModalEdit(true);
            setSelectedUser(user);
          }}
        >
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
}
