import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.css'
import Root from './Root';
import * as serviceWorker from './serviceWorker';

import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store = {store}>
        <Helmet>
            <title>TrackList</title>
        </Helmet>
        <Root />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
