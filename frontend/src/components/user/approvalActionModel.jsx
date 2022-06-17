import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { InputGroup, Form, ToastContainer, Toast } from 'react-bootstrap';

import { getApprovalDetails, approveUser } from '../../actions/users';

function AdminAction(props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    });
    const [action, setAction] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.appId) {
            dispatch(getApprovalDetails(props.appId))
                .then((data) => {
                    setUser(data.data);
                    setAction(data.action);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [props.appId]);

    const ApproveAction = () => {
        dispatch(approveUser(props.appId))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                props.getApprovalAction();
                setTimeout(() => {
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
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Approve User</Modal.Title>
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
                            disabled
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
                            disabled
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
                            disabled
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon5">
                            Action
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon5"
                            value={action}
                            disabled
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            props.handleClose(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={ApproveAction}>
                        Approve
                    </Button>
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
                        <strong className="me-auto">Approval Succesful</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        User changes approved.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AdminAction;
