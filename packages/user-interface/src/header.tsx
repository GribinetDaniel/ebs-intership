import React from 'react'
import { UserContext } from '../context/myContext'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link} from 'react-router-dom'

export function Header() {
    const { user } = React.useContext(UserContext)
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Collapse>
                    {user?.permission === "user" ? (
                        <Nav className='me-auto'>
                            <Nav.Link as = {Link} to = {'/'}>All Posts</Nav.Link>
                            <Nav.Link as = {Link} to = {'/own-posts'}>My Posts</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <NavDropdown title='Posts'>
                                <NavDropdown.Item as={Link} to = {'/'}>All</NavDropdown.Item>
                                <NavDropdown.Item as = {Link} to = {'/own-posts'}>Own</NavDropdown.Item>
                            </NavDropdown>
                            {/* <Link to = '/users'>Users</Link> */}
                            <Nav.Link as = {Link} to = {'/users'}>Users</Nav.Link>
                        </Nav>
                    )}

                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Nav.Link href="#" style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>{user?.username}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}