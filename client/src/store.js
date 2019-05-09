import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';

import ReduxThunk from 'redux-thunk';

const store = createStore(
    modules,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store;