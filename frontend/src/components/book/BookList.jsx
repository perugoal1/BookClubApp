import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBookDetails } from '../../actions/books';

const BookList = () => {
    const initialBookState = {
        id: null,
        title: '',
        description: '',
    };

    const [book, setBook] = useState(initialBookState);
    const dispatch = useDispatch();

    // const tutorials = useSelector((state: any) => state.tutorials);
    // const saveTutorial = async (id: any) => {
    //     await dispatch(getBookDetails(id));
    // };

    const saveTutorial = (id) => {
        dispatch(getBookDetails(id))
          .then(data => {
            console.log(data);
          })
          .catch(e => {
            console.log(e);
          });
    };
    useEffect(() => {
        (async () => {
            const a = await saveTutorial('62a8249476806834b94eb739');
            console.log(123213123, a);
        })();
    }, []);

    return <div>123123</div>;
};
export default BookList;
