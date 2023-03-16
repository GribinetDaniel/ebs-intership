import React from 'react'
import { UserContext } from '../context/myContext'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export function Header() {
    const { user } = React.useContext(UserContext)
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Collapse>
                    {user?.permission === "user" ? (
                        <Nav className='me-auto'>
                            <Nav.Link href="/">All Posts</Nav.Link>
                            <Nav.Link href="/own-posts">My Posts</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <NavDropdown title='Posts'>
                                <NavDropdown.Item href='/'>All</NavDropdown.Item>
                                <NavDropdown.Item href='/own-posts'>Own</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/users">Users</Nav.Link>
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