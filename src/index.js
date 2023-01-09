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
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

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
      <AuthProvider>
        <BrowserRouter>
          <Container>
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path='/categories' element={
                <PrivateRoute>
                  <ExpensesByCategory />
                </PrivateRoute>
              }/>

              <Route path='/list' element={
                <PrivateRoute>
                  <ExpensesList />
                </PrivateRoute>
              }/>

              <Route path='/edit/:id' element={
                <PrivateRoute>
                  <EditExpense />
                </PrivateRoute>
              }/>


              <Route path='/' element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              }/>


            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>

      <Background />
    </>

  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Index /> );
