import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Formulatron from './components/Formulatron'


import './index.css'

ReactDOM.render(
    <Router>
        <Formulatron />
    </Router>
    , document.getElementById('root'))




