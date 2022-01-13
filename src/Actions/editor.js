import { UPDATE_TEXT } from './types';

export const updateText = (text) => (dispatch) => {
	dispatch({
		type: UPDATE_TEXT,
		payload: text,
	});
};
