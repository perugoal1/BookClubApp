import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import {
    Container,
    Row,
    InputGroup,
    Form,
    Button,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { useNavigate } from 'react-router-dom';
import { ic_admin_panel_settings_twotone } from 'react-icons-kit/md/ic_admin_panel_settings_twotone';
import { ic_download_done_twotone } from 'react-icons-kit/md/ic_download_done_twotone';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getAllUsers, getApprovalList } from '../../actions/users';
import useUserStatus from '../../hooks/auth';
import AdminActionModel from './adminActionModel';
import ApprovalModel from './approvalActionModel';

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

const approvalActionsRenderer = (props) => {
    const approvalActions = () => {
        props.setAppShow(true);
        props.setAppId(props.data._id);
    };

    return (
        <span>
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip> Approve </Tooltip>}
            >
                <Button
                    className="mx-1"
                    variant="success"
                    size="sm"
                    onClick={approvalActions}
                >
                    <Icon icon={ic_download_done_twotone} />
                </Button>
            </OverlayTrigger>
        </span>
    );
};

const UserList = () => {
    const [searchText, setSearchText] = useState('');

    const [rowData, setRowData] = useState([]);
    const [appRowData, setAppRowData] = useState([]);

    const [adminShow, setAdminShow] = useState(false);
    const [appShow, setAppShow] = useState(false);
    const [create, setCreate] = useState(false);

    const [id, setId] = useState('');
    const [appId, setAppId] = useState('');

    const { online, data } = useUserStatus();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const searchAction = () => {
        dispatch(getAllUsers(searchText))
            .then((data) => {
                console.log(data);
                setRowData(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getApprovalAction = () => {
        dispatch(getApprovalList())
            .then((data) => {
                console.log(data);
                setAppRowData(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const createUserModel = () => {
        setAdminShow(true);
        setId();
        setCreate(true);
    };

    const columns = [
        { field: 'name', filter: 'agTextColumnFilter' },
        { field: 'email', filter: 'agTextColumnFilter' },
        { field: 'role', filter: 'agTextColumnFilter' },
        {
            field: 'date_joined',
            filter: 'agTextColumnFilter',
            headerName: 'Joined Date',
        },
    ];

    const approvalColums = [
        { field: 'action', filter: 'agTextColumnFilter' },
        { field: 'data.name', filter: 'agTextColumnFilter' },
        { field: 'data.role', filter: 'agTextColumnFilter' },
        { field: 'data.email', filter: 'agTextColumnFilter' },
    ];

    if (data.role === 'admin') {
        columns.push({
            field: 'admin_actions',
            headerName: 'Admin Actions',
            cellRenderer: adminActionsRenderer,
            cellRendererParams: { setAdminShow, setId },
        });

        approvalColums.push({
            field: 'approve',
            headerName: 'Approve Actions',
            cellRenderer: approvalActionsRenderer,
            cellRendererParams: { setAppShow, setAppId },
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

    useEffect(() => {
        if (!online || data.role === 'member') {
            navigate(`/book-management`);
        } else {
            getApprovalAction();
        }
    }, []);

    return (
        <Container>
            <Row>
                <h3 className="my-2">Users List</h3>
                <InputGroup className="my-2">
                    <Form.Control
                        placeholder="Search User"
                        aria-label="Search Users"
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
                        <Button variant="primary" onClick={createUserModel}>
                            Add New User
                        </Button>
                    </div>
                )}
                <div
                    className="ag-theme-alpine my-2"
                    style={{ width: '100%', height: '250px' }}
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                    ></AgGridReact>
                </div>
                {data.role === 'admin' && (
                    <>
                        <h3>Approval List</h3>
                        <div
                            className="ag-theme-alpine my-2"
                            style={{ width: '100%', height: '250px' }}
                        >
                            <AgGridReact
                                rowData={appRowData}
                                columnDefs={approvalColums}
                                defaultColDef={defaultColDef}
                                pagination={true}
                            ></AgGridReact>
                        </div>
                    </>
                )}
            </Row>
            <AdminActionModel
                show={adminShow}
                handleClose={setAdminShow}
                id={id}
                searchAction={searchAction}
                getApprovalAction={getApprovalAction}
                create={create}
                setCreate={setCreate}
            />

            <ApprovalModel
                show={appShow}
                handleClose={setAppShow}
                appId={appId}
                searchAction={searchAction}
                getApprovalAction={getApprovalAction}
            />
        </Container>
    );
};
export default UserList;
