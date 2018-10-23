import { combineReducers } from 'redux';
import tags from './tags';
import searchKeys from './searchKeys';

const appReducers = combineReducers({
    tags,
    searchKeys
});

export default appReducers;
