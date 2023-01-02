import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Container from './elements/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditExpense from './components/EditExpense';
import ExpensesByCategory from './components/ExpensesByCategory';
import Login from './components/Login';
import Register from './components/Register';
import ExpensesList from './components/ExpensesList';
import { Helmet } from 'react-helmet';
import favicon from './images/logo.png';
import Background from './elements/Background'

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
      </Helmet>
      <React.StrictMode>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categories" element={<ExpensesByCategory />} />
              <Route path="/list" element={<ExpensesList />} />
              <Route path="/edit/:id" element={<EditExpense />} />
            </Routes>
          </Container>
        </BrowserRouter>

        <Background />
      </React.StrictMode>
    </>

  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Index /> );
