import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './config';
import './app.css';
import store from './store';
import Home from './components/Home';

const reactDiv = document.getElementById('react');
Provider.propTypes.children = PropTypes.object;
ReactDOM.render(<Provider store={ store }><Home/></Provider>, reactDiv);
