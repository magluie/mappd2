import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import 'leaflet/dist/leaflet.css';
// import './components/Plaintext';
import App from './App.js';
import "bootstrap/dist/css/bootstrap.min.css";


  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();