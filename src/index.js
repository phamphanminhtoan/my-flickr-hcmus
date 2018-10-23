import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';


const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispa
ReactDOM.render(
    <Provider store = {store}>
        <AppContainer />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();


