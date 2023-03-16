import React from 'react'
import { UserContext } from '../context/myContext'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

export function Header () {
    const {user} = React.useContext(UserContext)
    return (
        <Navbar bg = "light" expand = "lg" sticky = "top">
            <Container>
                <Navbar.Collapse>
                    {user?.permission == "user" ? (
                        <Nav className='me-auto'>
                            <Nav.Link href = "#">All Posts</Nav.Link>
                            <Nav.Link href = "#">My Posts</Nav.Link>
                        </Nav>
                        ) : (
                        <Nav className = "me-auto">
                            <NavDropdown title = 'Posts'>
                                <NavDropdown.Item href = '#'>All</NavDropdown.Item>
                                <NavDropdown.Item href = '#'>Own</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href = "#">Users</Nav.Link>
                        </Nav>
                        )}
                        
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Nav.Link href = "#" style ={{
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