import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom';
// import App from './App-sync'; // use require.context sync
import App from './App-lazy'; // use require.context lazy

ReactDOM.render(
  <React.StrictMode>
    In index.js file.
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
