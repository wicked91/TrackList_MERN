import { combineReducers } from 'redux';
import base from './base';
import shop from './shop';
import users from './users';
import search from './search';

export default combineReducers({
    base,
    shop,
    users,
    search,
});
