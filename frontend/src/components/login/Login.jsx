import React, { useState } from 'react';
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../actions/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    };

    const loginAction = () => {
        dispatch(login(email, password))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate(`/book-management`);
                }, 1000);
            })
            .catch((e) => {
                setShow(true);
                console.log(e);
            });
    };

    return (
        <Container className="mt30">
            <Row>
                <Col md={{ span: 4, offset: 4 }} className="login">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address / Username </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email / username"
                                onChange={handleEmailChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="primary" onClick={loginAction}>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>

            <ToastContainer className="p-3" position="bottom-center">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={2000}
                    autohide
                    bg="danger"
                >
                    <Toast.Header>
                        <img className="rounded me-2" alt="" />
                        <strong className="me-auto">Login Failed</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Username / Password is incorrect.
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer className="p-3" position="bottom-center">
                <Toast
                    onClose={() => setShowSuccess(false)}
                    show={showSuccess}
                    delay={2000}
                    autohide
                    bg="success"
                >
                    <Toast.Header>
                        <img className="rounded me-2" alt="" />
                        <strong className="me-auto">Login Succesful</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        User Logged in Successfully
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default Login;
