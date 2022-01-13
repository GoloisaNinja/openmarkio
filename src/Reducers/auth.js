import { LOGIN_USER, LOGOUT_USER } from '../Actions/types';

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_USER:
			return {
				...state,
				isAuthenticated: true,
				user: payload,
			};
		case LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				user: {},
			};
		default:
			return state;
	}
}
