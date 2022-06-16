import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { InputGroup, Form, ToastContainer, Toast } from 'react-bootstrap';

import {
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
} from '../../actions/users';

function AdminAction(props) {
    const [user, setUser] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [succesText, setSuccesText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.id) {
            dispatch(getUserDetails(props.id))
                .then((data) => {
                    setUser(data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [props.id]);

    const handleUserDetailsChange = (event, key) => {
        let { value } = event.target;
        setUser({ ...user, [key]: value });
    };

    const CreateUserAction = () => {
        setSuccesText('Create');
        dispatch(createUser(user))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                props.getApprovalAction();
                setTimeout(() => {
                    props.setCreate(false);
                    props.handleClose(false);
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateUserAction = () => {
        setSuccesText('Update');
        dispatch(updateUser(props.id, user))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                props.getApprovalAction();
                setTimeout(() => {
                    props.setCreate(false);
                    props.handleClose(false);
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteUserAction = () => {
        setSuccesText('Delete');
        dispatch(deleteUser(props.id))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                props.getApprovalAction();
                setTimeout(() => {
                    props.setCreate(false);
                    props.handleClose(false);
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    props.handleClose(false);
                    props.setCreate(false);
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Name
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            value={user.name}
                            onChange={(e) => {
                                handleUserDetailsChange(e, 'name');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">
                            Email ID
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon2"
                            value={user.email}
                            onChange={(e) => {
                                handleUserDetailsChange(e, 'email');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Role
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Role"
                            aria-label="Role"
                            aria-describedby="basic-addon3"
                            value={user.role}
                            onChange={(e) => {
                                handleUserDetailsChange(e, 'role');
                            }}
                        />
                    </InputGroup>
                    {props.create && (
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon4">
                                Password
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon4"
                                value={user.password}
                                onChange={(e) => {
                                    handleUserDetailsChange(e, 'password');
                                }}
                            />
                        </InputGroup>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            props.handleClose(false);
                            props.setCreate(false);
                        }}
                    >
                        Close
                    </Button>
                    {props.create ? (
                        <Button variant="primary" onClick={CreateUserAction}>
                            Create
                        </Button>
                    ) : (
                        <>
                            <Button variant="danger" onClick={deleteUserAction}>
                                Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={updateUserAction}
                            >
                                Update
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>

            <ToastContainer className="p-3" position="bottom-center">
                <Toast
                    onClose={() => setShowSuccess(false)}
                    show={showSuccess}
                    delay={2000}
                    autohide
                    bg="info"
                >
                    <Toast.Header>
                        <img className="rounded me-2" alt="" />
                        <strong className="me-auto">
                            {succesText} Succesful
                        </strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        User {succesText}d and sent for approval.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AdminAction;
