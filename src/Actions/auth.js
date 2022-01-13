import { LOGIN_USER, LOGOUT_USER, CLEAR_ARTICLES } from './types';

export const loginUser = (user) => (dispatch) => {
	dispatch({
		type: LOGIN_USER,
		payload: user,
	});
};
export const logoutUser = () => (dispatch) => {
	dispatch({
		type: LOGOUT_USER,
	});
	dispatch({
		type: CLEAR_ARTICLES,
	});
};
