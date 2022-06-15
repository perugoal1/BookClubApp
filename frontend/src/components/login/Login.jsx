import React, {useState, useEffect} from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastHeader, ToastBody  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/auth';
import useUserStatus from '../../hooks/auth';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    
    const handleEmailChange = (event) => {
        const { name, value } = event.target;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPassword(value);
    };

    const loginAction = () => {
        dispatch(login(email, password))
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                setShow(true)
                console.log(e);
        });
    }

    // const auth = useSelector((state) => state.authReducer);
    const isOnline = useUserStatus();
    console.log(2222, isOnline);

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



        <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide bg="danger">
            <Toast.Header>
                <img className="rounded me-2" alt="" />
                <strong className="me-auto">Login Failed</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Username / Password is incorrect.</Toast.Body>
        </Toast>    
        </Container>
    );
}

export default Login;
