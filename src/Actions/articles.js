import {
	LOAD_ARTICLES,
	SET_ARTICLE,
	UPDATE_TEXT,
	START_NEW_ARTICLE,
} from './types';

export const loadArticles = (articles) => (dispatch) => {
	dispatch({
		type: LOAD_ARTICLES,
		payload: articles,
	});
};
export const setArticle =
	({ article_id, content, title }) =>
	(dispatch) => {
		dispatch({
			type: SET_ARTICLE,
			payload: {
				article_id,
				content,
				title,
			},
		});
		dispatch({
			type: UPDATE_TEXT,
			payload: content,
		});
	};
export const startNewArticle = () => (dispatch) => {
	dispatch({
		type: START_NEW_ARTICLE,
	});
	dispatch({
		type: UPDATE_TEXT,
		payload: '',
	});
};
