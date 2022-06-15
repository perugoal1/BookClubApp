import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { InputGroup, Form, ToastContainer, Toast } from 'react-bootstrap';

import { getBookDetails, createBook, updateBook, deleteBook } from '../../actions/books';

function AdminAction(props) {
    const [book, setBook] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [succesText, setSuccesText] = useState('');
    const [copies, setCopies] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.id) {
            dispatch(getBookDetails(props.id))
                .then((data) => {
                    setBook(data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [props, dispatch]);

    const handleBookDetailsChange = (event, key) => {
        let { value } = event.target;
        if (key === 'genre') {
            value = value.split(',');
        }
        setBook({ ...book, [key]: value });
    };

    const CreateBookAction = () => {
        setSuccesText('Create');
        dispatch(createBook(book))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                setTimeout(() => {
                    props.setCreate(false);
                    props.handleClose(false);
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };


    const updateBookAction = () => {
        setSuccesText('Update');
        dispatch(updateBook(props.id, book))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
                setTimeout(() => {
                    props.setCreate(false);
                    props.handleClose(false);
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteBookAction = () => {
        setSuccesText('Delete');
        dispatch(deleteBook(props.id))
            .then(() => {
                setShowSuccess(true);
                props.searchAction();
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
                onHide={() => 
                  { 
                    props.handleClose(false);
                    props.setCreate(false);
                  }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Title
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            value={book.title}
                            onChange={(e) => {
                                handleBookDetailsChange(e, 'title');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            aria-label="Description"
                            placeholder="Description"
                            value={book.description}
                            onChange={(e) => {
                                handleBookDetailsChange(e, 'description');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">
                            Author
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Author"
                            aria-label="Author"
                            aria-describedby="basic-addon2"
                            value={book.author}
                            onChange={(e) => {
                                handleBookDetailsChange(e, 'author');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Published Year
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Published Year"
                            aria-label="Published Year"
                            aria-describedby="basic-addon3"
                            type="number"
                            value={book.published_year}
                            onChange={(e) => {
                                handleBookDetailsChange(e, 'published_year');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4">
                            Genre
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Enter Genre as comma separated values"
                            aria-label="Genre"
                            aria-describedby="basic-addon4"
                            type="text"
                            value={(() => {
                                return book.genre ? book.genre.join(',') : '';
                            })()}
                            onChange={(e) => {
                                handleBookDetailsChange(e, 'genre');
                            }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon5">
                           No. of Copies
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="No. of Copies"
                            aria-label="No. of Copies"
                            aria-describedby="basic-addon5"
                            type="number"
                            value={book.copies}
                            onChange={(e) => {
                              handleBookDetailsChange(e, 'copies');
                          }}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => 
                          { 
                            props.handleClose(false);
                            props.setCreate(false);
                          }}
                    >
                        Close
                    </Button>
                    {
                      props.create ? 
                      (<Button variant="primary" onClick={CreateBookAction}>
                          Create
                        </Button>
                      ):(
                        <>
                          <Button variant="danger" onClick={deleteBookAction}>
                              Delete
                          </Button>
                          <Button variant="primary" onClick={updateBookAction}>
                              Update
                          </Button>
                      </>
                    )
                  }
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
                        Book {succesText}d successfully.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AdminAction;
