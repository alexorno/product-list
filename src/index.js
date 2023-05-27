import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DocumentTitle from 'react-document-title';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DocumentTitle title={'ProductList of Alexorno'}>
      <App />
    </DocumentTitle>
  </React.StrictMode>
);


