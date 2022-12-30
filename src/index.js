import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (   
    <React.StrictMode>
      <App />
    </React.StrictMode> 
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Index /> );
