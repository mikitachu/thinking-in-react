import React from 'react';
import ReactDOM from 'react-dom';
import productsTable from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import './index.css';

const store = createStore(productsTable);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);