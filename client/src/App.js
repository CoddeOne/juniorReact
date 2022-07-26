
import './App.css';

import React from 'react';
import "./App.css"
import Main from "./components/Main"
import { Route, Routes } from 'react-router-dom';

import PDP from './components/PDP';
import Cart from './components/Cart';
class App extends React.Component {
  render() {
    return (
      <>



        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<PDP />} path="/PDP" />
          <Route element={<Cart />} path="/cart" />
        </Routes>
      </>
    )
  }
}

export default App;
