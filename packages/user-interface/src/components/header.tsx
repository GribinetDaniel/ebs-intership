import React from 'react'
import { UserContext } from '../context/user-context'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link, useNavigate} from 'react-router-dom'

export function Header() {
    const { user, setUser, isAuth, setIsAuth } = React.useContext(UserContext)
    const navigate = useNavigate();
    
    function logout(){
        setUser(undefined);
        setIsAuth(false);
        localStorage.removeItem("token");
        navigate('/login')
    }

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
                            <Nav.Link as = {Link} to = {'/users'}>Users</Nav.Link>
                        </Nav>
                    )}

                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <NavDropdown title = {user?.username} style = {{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>
                            <NavDropdown.Item as = {Link} to = {'/account'}>Account</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}