import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/css/bootstrap.min.css';
import './assets/css/feathericon.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/select2.min.css';
import './assets/plugins/datatables/datatables.min.css';
import './assets/css/style.css';
import store from './app/store.js';
import { Provider } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
