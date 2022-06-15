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
                            <BookList />
                        </div>
                    }
                />
                {/* <Route path="/about">
                    <About />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route> */}
            </Routes>
        </div>
    );
}

export default App;
