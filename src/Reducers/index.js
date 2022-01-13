import { combineReducers } from 'redux';
import articles from './articles';
import editor from './editor';
import auth from './auth';

export default combineReducers({
	articles,
	auth,
	editor,
});
