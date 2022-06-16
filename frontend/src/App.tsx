import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Login from './components/login/Login';
import BookList from './components/book/BookList';
import UserList from './components/user/UserList';
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

                <Route path="/book-management" element={<BookList />} />
                <Route path="/user-management" element={<UserList />} />
                <Route path="/analytics" element={<BookList />} />
            </Routes>
        </div>
    );
}

export default App;
