import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import {
    Container,
    Row,
    InputGroup,
    Form,
    Button,
    Badge,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { ic_library_add_twotone } from 'react-icons-kit/md/ic_library_add_twotone';
import { ic_keyboard_return_twotone } from 'react-icons-kit/md/ic_keyboard_return_twotone';
import { ic_album_twotone } from 'react-icons-kit/md/ic_album_twotone';
import { ic_admin_panel_settings_twotone } from 'react-icons-kit/md/ic_admin_panel_settings_twotone';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getAllBookDetails, borrowBook, returnBook } from '../../actions/books';
import useUserStatus from '../../hooks/auth';
import AdminActionModel from './adminActionModel';

const genreRenderer = (props) => {
    return (
        <span>
            {props.value &&
                props.value.map((genre) => (
                    <Badge className="mx-1" bg="success" key={genre}>
                        {genre}
                    </Badge>
                ))}
        </span>
    );
};

const titleRenderer = (props) => {
    return (
        <span>
            {props.value}
            {props.data.availability ? (
                <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip> Available </Tooltip>}
                >
                    <span>
                        <Icon
                            className="mx-1 text-success"
                            icon={ic_album_twotone}
                        />
                    </span>
                </OverlayTrigger>
            ) : (
                <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip> Unavailable </Tooltip>}
                >
                    <span>
                        <Icon
                            className="mx-1 text-danger"
                            icon={ic_album_twotone}
                        />
                    </span>
                </OverlayTrigger>
            )}
        </span>
    );
};

const actionsRenderer = (props) => {
    const dispatch = useDispatch();
    const { data } = useUserStatus();

    const borrowAction = () => {
        dispatch(borrowBook(props.data._id))
            .then(() => {
                props.searchAction();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const returnAction = () => {
        dispatch(returnBook(props.data._id))
            .then(() => {
                props.searchAction();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const borrowOpts = {};
    if (!props.data.availability) {
        borrowOpts.disabled = 'disabled';
    }

    let returnOpts = { disabled: 'disabled' };
    if (props.data.current_borrower === data._id) {
        returnOpts = {};
    }

    return (
        <span>
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip> Borrow </Tooltip>}
            >
                <Button
                    className="mx-1"
                    variant="success"
                    size="sm"
                    {...borrowOpts}
                    onClick={borrowAction}
                >
                    <Icon icon={ic_library_add_twotone} />
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip> Return </Tooltip>}
            >
                <Button
                    className="mx-1"
                    variant="warning"
                    size="sm"
                    {...returnOpts}
                    onClick={returnAction}
                >
                    <Icon icon={ic_keyboard_return_twotone} />
                </Button>
            </OverlayTrigger>
        </span>
    );
};

const adminActionsRenderer = (props) => {
    const adminActions = () => {
        props.setAdminShow(true);
        props.setId(props.data._id);
    };

    return (
        <span>
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip> Admin Edit / Delete </Tooltip>}
            >
                <Button
                    className="mx-1"
                    variant="info"
                    size="sm"
                    onClick={adminActions}
                >
                    <Icon icon={ic_admin_panel_settings_twotone} />
                </Button>
            </OverlayTrigger>
        </span>
    );
};

const BookList = () => {
    const [searchText, setSearchText] = useState('');

    const [rowData, setRowData] = useState([]);
    const [adminShow, setAdminShow] = useState(false);
    const [create, setCreate] = useState(false);

    const [id, setId] = useState('');

    const { online, data } = useUserStatus();
    const dispatch = useDispatch();
    const searchAction = () => {
        dispatch(getAllBookDetails(searchText))
            .then((data) => {
                console.log(data);
                setRowData(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const createBookModel = () => {
        setAdminShow(true);
        setId();
        setCreate(true);
    };

    const columns = [
        { field: 'title', cellRenderer: titleRenderer, sort: 'asc' },
        { field: 'description', filter: 'agTextColumnFilter' },
        {
            field: 'genre',
            cellRenderer: genreRenderer,
            filter: 'agTextColumnFilter',
        },
        { field: 'author', filter: 'agTextColumnFilter' },
        {
            field: 'published_year',
            headerName: 'Published Year',
            filter: 'agNumberColumnFilter',
        },
    ];

    if (online) {
        columns.unshift({
            field: 'actions',
            cellRenderer: actionsRenderer,
            cellRendererParams: { searchAction },
        });
    }

    if (data.role === 'admin' || data.role === 'editor') {
        columns.push({
            field: 'admin_actions',
            headerName: 'Admin Actions',
            cellRenderer: adminActionsRenderer,
            cellRendererParams: { setAdminShow, setId },
        });
    }

    const [columnDefs] = useState(columns);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
        };
    }, []);

    const searchTextChange = (event) => {
        const { value } = event.target;
        setSearchText(value);
    };

    return (
        <Container>
            <Row>
                <InputGroup className="my-3">
                    <Form.Control
                        placeholder="Search Books"
                        aria-label="Search Books"
                        aria-describedby="search"
                        onChange={searchTextChange}
                    />
                    <Button
                        variant="outline-primary"
                        id="search"
                        onClick={searchAction}
                    >
                        Search
                    </Button>
                </InputGroup>

                {(data.role === 'admin' || data.role === 'editor') && (
                    <div>
                        <Button variant="primary" onClick={createBookModel}>
                            Add New Book
                        </Button>
                    </div>
                )}
                <div
                    className="ag-theme-alpine my-5"
                    style={{ width: '100%', height: '500px' }}
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                    ></AgGridReact>
                </div>
            </Row>
            <AdminActionModel
                show={adminShow}
                handleClose={setAdminShow}
                id={id}
                searchAction={searchAction}
                create={create}
                setCreate={setCreate}
            />
        </Container>
    );
};
export default BookList;
