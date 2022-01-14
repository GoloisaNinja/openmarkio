import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Loading from './Components/Loading/loading';
import { getAuth, onAuthStateChanged, ref, onValue } from './Firebase/firebase';
import db from './Firebase/firebase';
import { loadArticles } from './Actions/articles';
import { loginUser } from './Actions/auth';

let hasRendered = false;

const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(<App />, document.getElementById('root'));
		hasRendered = true;
	}
};

ReactDOM.render(<Loading />, document.getElementById('root'));

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

// GETS ARTICLE TITLES TO POPULATE SIDEBAR MENU (ADDS ARTICLES TO REDUX STATE)
const handleGetArticles = (uid) => {
	const articleRef = ref(db, `users/${uid}/articles`);
	onValue(articleRef, (snapshot) => {
		let articles = [];
		snapshot.forEach((childSnapshot) => {
			articles.push({
				id: childSnapshot.key,
				...childSnapshot.val(),
			});
		});
		if (articles.length > 0) {
			store.dispatch(loadArticles(articles));
		}
	});
};

const auth = getAuth();
const currentUser = auth.currentUser;

console.log(currentUser);

onAuthStateChanged(auth, (user) => {
	console.log(user);
	if (user) {
		handleGetArticles(user.uid);
		store.dispatch(loginUser(user));
		renderApp();
	} else {
		renderApp();
	}
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
