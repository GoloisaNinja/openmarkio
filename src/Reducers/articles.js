import {
	LOAD_ARTICLES,
	SET_ARTICLE,
	CLEAR_ARTICLES,
	START_NEW_ARTICLE,
} from '../Actions/types';

const initialState = {
	article: {},
	articles: null,
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_ARTICLES:
			return {
				...state,
				articles: payload,
			};
		case SET_ARTICLE:
			return {
				...state,
				article: {
					article_id: payload.article_id,
					content: payload.content,
					title: payload.title,
				},
			};
		case START_NEW_ARTICLE:
			return {
				...state,
				article: {},
			};
		case CLEAR_ARTICLES:
			return {
				...state,
				article: {},
				articles: null,
			};
		default:
			return state;
	}
}
