import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './toolkitRedux/main';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import Logic from './pages/logic';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>

      <Link to="/login" element={<Login/>}>Login</Link>
      <Link to="/register" element={<Register />}>Register</Link>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logic" element={<Logic />} />
      </Routes>

    </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

