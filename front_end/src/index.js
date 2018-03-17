import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
