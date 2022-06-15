import React from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useUserStatus from '../../hooks/auth';
import { logout } from '../../actions/auth';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { online, data } = useUserStatus();
    const isAdmin = data && data.role === 'admin' ? true : false;

    const logoutAction = () => {
        dispatch(logout())
            .then(() => {
                navigate(`/`);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">ABC Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/home">Search Books</Nav.Link>
                        {online && isAdmin && (
                            <Nav.Link href="#action1">Book Management</Nav.Link>
                        )}
                        {online && isAdmin && (
                            <Nav.Link href="#action2">User Management</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {online ? (
                            <NavDropdown
                                title="User Logged In"
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutAction}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button href="/" variant="primary">
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
