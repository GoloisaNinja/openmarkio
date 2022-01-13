import styles from './articleOverlay.module.scss';

const ArticleOverlay = ({ active, children }) => {
	return (
		<div className={active ? styles.overlay_active : styles.overlay}>
			{children}
		</div>
	);
};
export default ArticleOverlay;
