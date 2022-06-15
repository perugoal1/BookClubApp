import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    Form,
    FormControl,
    Button,
    NavDropdown,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import useUserStatus from '../../hooks/auth';
import { logout } from '../../actions/auth';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { online, data } = useUserStatus();
    const isAdmin = data && data.role === 'admin' ? true: false;

    const logoutAction = () => {
        dispatch(logout()) .then(() => {
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
                        <Nav.Link></Nav.Link>
                        {online && isAdmin && (
                            <Nav.Link href="#action1">Book Management</Nav.Link>
                        )}
                        {online && isAdmin && (
                            <Nav.Link href="#action2">User Management</Nav.Link>
                        )}
                    </Nav>
                    <Form className="d-flex mx-5 ">
                        <FormControl
                            type="search"
                            placeholder="Search for books"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="light">Search</Button>
                    </Form>
                    {online ? (    
                        <DropdownButton id="dropdown-basic-button" title="User Logged In">
                            <Dropdown.Item onClick={logoutAction}>Logout</Dropdown.Item>
                        </DropdownButton>
                     ) : (
                        <Button href="/" variant="primary" >
                            Login
                        </Button>
                     )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
