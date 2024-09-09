import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Load_landingpage from './index.js';
import Edit from './edit.js';
import Dashboard from './dashboard.js';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Load_landingpage />}></Route>
      <Route exact path='/edit' element={<Edit/>}></Route>
      <Route exact path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
  );
}

export default function App() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }