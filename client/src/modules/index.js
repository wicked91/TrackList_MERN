import { combineReducers } from 'redux';
import base from './base';
import update from './update';
import users from './users';
import keyword from './keyword';

export default combineReducers({
    base,
    update,
    users,
    keyword,
});
