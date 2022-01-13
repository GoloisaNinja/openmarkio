import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadArticles, startNewArticle } from '../../Actions/articles';
import { updateText } from '../../Actions/editor';
import { loginUser, logoutUser } from '../../Actions/auth';
import Overlay from '../Overlay/overlay';
import ArticleOverlay from '../Overlay/articleOverlay';
import MainButtonGroup from './mainButtonGroup';
import ArticleMenu from '../ArticleMenu/articleMenu';
import { nanoid } from 'nanoid';
import {
	MdFolder,
	MdLogin,
	MdLogout,
	MdPreview,
	MdClose,
} from 'react-icons/md';
import { BiHash } from 'react-icons/bi';
import { ImGoogle3 } from 'react-icons/im';
import styles from './toolbar.module.scss';
import db, {
	ref,
	set,
	provider,
	getAuth,
	signInWithRedirect,
	signOut,
} from '../../Firebase/firebase';

const Toolbar = ({
	open,
	handleSidebar,
	article,
	loadArticles,
	loginUser,
	logoutUser,
	text,
	updateText,
	user,
	startNewArticle,
	togglePreview,
}) => {
	const [currentArticleTitle, setCurrentArticleTitle] = useState('New_Article');
	const [iconOverlay, setIconOverlay] = useState(false);
	const [articleOverlay, setArticleOverlay] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			if (article !== null) {
				if (article.title) {
					setCurrentArticleTitle(article.title);
				} else {
					setCurrentArticleTitle('New_Article');
				}
			}
		}
	}, [article]);

	const editor = useRef({});

	useEffect(() => {
		if (typeof window !== undefined) {
			editor.current = document.getElementById('md_editor');
		}
	}, []);

	// GET EDITOR CURSOR POSITION CRITICAL FOR INSERTS
	const getPosition = () => {
		let startPos = editor.current.selectionStart;
		let endPos = editor.current.selectionEnd;
		return {
			startPos,
			endPos,
		};
	};
	// HANDLES INSERTION OF HELPER TEXT AT CURSOR POSITION BASED ON TOOLBAR ICON SELECTION
	const handleInsertion = (insertionValue) => {
		let newText;
		const waitForPosition = new Promise((resolve, reject) => {
			resolve(getPosition());
		});
		waitForPosition.then((result) => {
			let preInsert = text.substring(0, result.startPos);
			let postInsert = text.substring(result.endPos, text.length);
			newText = `${preInsert} ${insertionValue} ${postInsert}`;
			updateText(newText);
			editor.current.selectionStart =
				result.startPos + insertionValue.length + 1;
			editor.current.selectionEnd = result.startPos + insertionValue.length + 1;
			editor.current.focus();
		});
	};
	// A COPY MARKDOWN FUNCTION THAT COPIES EDITOR CONTENT TO CLIPBOARD FOR EASY EXTRACT
	const copyMarkdown = () => {
		navigator.clipboard.writeText(text);
	};

	// LOGIN FUNCTION FOR GOOGLE SIGN IN WITH POP UP
	const handleLogin = () => {
		console.log('handle login called');
		const auth = getAuth();
		signInWithRedirect(auth, provider);
	};

	// I MEAN - THIS LOGS YOU OUT...
	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				console.log('logging out');
				logoutUser();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// SAVES NEW / OVERWRITES EXISTING ARTICLE TO FIREBASE DB
	const handleArticleSave = () => {
		let articleId;

		// IS THERE ALREADY AND ARTICLE ID? IF SO USE IT AND OVERWRITE - ELSE ASSIGN NANOID

		if (article.article_id) {
			articleId = article.article_id;
		} else {
			articleId = nanoid();
		}

		set(ref(db, `articles/${articleId}`), {
			author: user.displayName,
			content: text,
			title: currentArticleTitle,
			user_id: user.uid,
		});
		set(ref(db, `users/${user.uid}/articles/${articleId}`), {
			title: currentArticleTitle,
		});
	};

	const handleNewArticle = () => {
		startNewArticle();
	};

	const toggleIconMenu = () => {
		setIconOverlay(!iconOverlay);
	};

	const toggleArticleMenu = () => {
		setArticleOverlay(!articleOverlay);
	};

	return (
		<div className={open ? styles.toolbar_open : styles.toolbar}>
			<div className={styles.toolbar_lg}>
				{user.hasOwnProperty('uid') && (
					<button onClick={(e) => handleSidebar()}>
						<MdFolder />
					</button>
				)}
				<MainButtonGroup
					handleNewArticle={handleNewArticle}
					handleInsertion={handleInsertion}
					copyMarkdown={copyMarkdown}
					handleArticleSave={handleArticleSave}
					open={open}
					uid={user.uid}
				/>

				{user.uid && (
					<input
						value={currentArticleTitle}
						onChange={(e) => setCurrentArticleTitle(e.target.value)}
						required
					/>
				)}
				<div>
					<button onClick={(e) => togglePreview()}>
						<MdPreview />
					</button>
					{user.uid ? (
						<button disabled={open} onClick={(e) => handleLogout()}>
							<MdLogout />
						</button>
					) : (
						<button onClick={(e) => handleLogin()}>
							<ImGoogle3 />
						</button>
					)}
				</div>
			</div>
			<div className={styles.toolbar_sm}>
				<button
					className={user.uid ? styles.btn_visible : styles.btn_hidden}
					disabled={iconOverlay}
					onClick={(e) => toggleArticleMenu()}>
					<MdFolder />
				</button>
				{user.uid && (
					<input
						value={currentArticleTitle}
						onChange={(e) => setCurrentArticleTitle(e.target.value)}
						required
					/>
				)}
				<button disabled={articleOverlay} onClick={(e) => toggleIconMenu()}>
					<BiHash />
				</button>
			</div>
			{/* LEFT HAND ARTICLE SECTION FOR SELECTING SAVED ARTICLES FROM FIREBASE */}
			<ArticleOverlay active={articleOverlay}>
				<div className={styles.article_menu}>
					<div className={styles.articlemenu_top}>
						<button onClick={(e) => toggleArticleMenu()}>
							<MdClose />
						</button>
					</div>
					<div className={styles.articlemenu_bottom}>
						<ArticleMenu />
					</div>
				</div>
			</ArticleOverlay>
			{/* RIGHT HAND MENU SECTION FOR MARKDOWN ACTIONS, LOGIN, VIEW TOGGLE ETC */}
			<Overlay active={iconOverlay}>
				<div className={styles.toolbar_menu}>
					<div className={styles.menu_top}>
						<button onClick={(e) => toggleIconMenu()}>
							<MdClose />
						</button>
					</div>
					<div className={styles.menu_logout}>
						{user.uid ? (
							<button disabled={open} onClick={(e) => handleLogout()}>
								<MdLogout />
								<span className={styles.btn_span}>Logout</span>
							</button>
						) : (
							<button onClick={(e) => handleLogin()}>
								<MdLogin />
								<span className={styles.btn_span}>Login</span>
							</button>
						)}
						<button onClick={(e) => togglePreview()}>
							<MdPreview />
							<span className={styles.btn_span}>Toggle View</span>
						</button>
					</div>
					<div className={styles.menu_bottom}>
						<MainButtonGroup
							handleNewArticle={handleNewArticle}
							handleInsertion={handleInsertion}
							copyMarkdown={copyMarkdown}
							handleArticleSave={handleArticleSave}
							open={open}
							uid={user.uid}
							menu={true}
						/>
					</div>
				</div>
			</Overlay>
		</div>
	);
};

Toolbar.propTypes = {
	article: PropTypes.object,
	startNewArticle: PropTypes.func.isRequired,
	loadArticles: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	updateText: PropTypes.func.isRequired,
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
	article: state.articles.article,
	text: state.editor.text,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	updateText,
	loginUser,
	logoutUser,
	loadArticles,
	startNewArticle,
})(Toolbar);
