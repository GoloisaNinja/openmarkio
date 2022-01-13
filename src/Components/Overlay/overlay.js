import styles from './overlay.module.scss';

const Overlay = ({ active, children }) => {
	return (
		<div className={active ? styles.overlay_active : styles.overlay}>
			{children}
		</div>
	);
};
export default Overlay;
