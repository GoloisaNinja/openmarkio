import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setArticle } from '../../Actions/articles';
import { get, child, getDatabase, ref } from '../../Firebase/firebase';
import styles from './articleMenu.module.scss';

const ArticleMenu = ({ articles, setArticle, user, toggleArticleMenu }) => {
	let name = '';
	const fetchArticle = (id) => {
		const dbRef = ref(getDatabase());
		get(child(dbRef, `articles/${id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let articleObj = {};
					articleObj = snapshot.val();
					articleObj.article_id = snapshot.ref.key;
					setArticle(articleObj);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	if (user.hasOwnProperty('uid')) {
		name = user.displayName.split(' ');
	}

	return (
		<>
			<h2>
				Welcome <span className={styles.color_span}>{name[0]}!</span>
			</h2>
			<h3>Saved Articles</h3>
			<div className={styles.article_container}>
				{articles !== null &&
					articles.map((user_article) => (
						<button
							className={styles.btn}
							key={user_article.id}
							onClick={(e) => {
								toggleArticleMenu();
								fetchArticle(user_article.id);
							}}>
							{user_article.title}
						</button>
					))}
			</div>
		</>
	);
};

ArticleMenu.propTypes = {
	articles: PropTypes.array,
	setArticle: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	articles: state.articles.articles,
	user: state.auth.user,
});
export default connect(mapStateToProps, { setArticle })(ArticleMenu);
