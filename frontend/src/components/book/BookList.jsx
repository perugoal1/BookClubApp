import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import {Container, Row, Button} from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getBookDetails } from '../../actions/books';


const ActionsRenderer = (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  
    const buttonClicked = () => {
      alert(`${cellValue} medals won!`);
    };
  
    return (
      <span>
        <span>{cellValue}</span>&nbsp;
        <button> fgh</button>
      </span>
    );
}

const BookList = () => {
    const initialBookState = {
        id: null,
        title: '',
        description: '',
    };

    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    
    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        {   field: 'price',
            cellRenderer: ActionsRenderer,
            cellRendererParams: {
            onClick: () => { alert()},
            label: 'Click 1'
            }
        }
    ])

    const [book, setBook] = useState(initialBookState);
    const dispatch = useDispatch();

    // const tutorials = useSelector((state: any) => state.tutorials);
    // const saveTutorial = async (id: any) => {
    //     await dispatch(getBookDetails(id));
    // };

    const saveTutorial = (id) => {
        dispatch(getBookDetails(id))
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        (async () => {
            const a = await saveTutorial('62a8249476806834b94eb739');
            console.log(123213123, a);
        })();
    });

    return (
        <Container>
            <Row>
                <div className="ag-theme-alpine my-5" style={{width: '100%', height: '500px'}}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}>
                    </AgGridReact>
                </div>
            </Row>
       </Container>
    );
};
export default BookList;
