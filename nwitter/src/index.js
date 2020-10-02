import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from './myFirebase';

ReactDOM.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  // index.js에서 React.strictMode = 렌더링을 두번 유발
  ,
  document.getElementById('root')
);

