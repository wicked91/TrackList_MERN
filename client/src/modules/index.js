import { combineReducers } from 'redux';
import base from './base';
import update from './update';
import users from './users';
import search from './search';

export default combineReducers({
    base,
    update,
    users,
    search,
});
