import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from "./test";
import Logic from './home/index';
import Table from './utility/table';
import * as serviceWorker from './serviceWorker';
let context = {
    tablename: 'mainTable',
    required_fields: ['name', 'length', 'quantity','name'],
    rows: [{
        values:{
            name:'zeal',length:6,quantity:6,name:'zeal'
        }
    }]
}



//ReactDOM.render(<Logic />, document.getElementById('root'));
ReactDOM.render(<Table context={context} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
