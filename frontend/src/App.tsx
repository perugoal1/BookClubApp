import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Login from './components/login/Login';
import BookList from './components/book/BookList';

import './App.css';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Login />
                        </div>
                    }
                />
               
                <Route path="/home" element={ <BookList />}/>
            </Routes>
        </div>
    );
}

export default App;
