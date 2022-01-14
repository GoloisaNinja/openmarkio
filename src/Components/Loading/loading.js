import Loader from '../../Utils/openmarkdownio.gif';
import styles from './loading.module.scss';

const Loading = () => {
	return (
		<div className={styles.loading_container}>
			<img
				src={Loader}
				className={styles.loader}
				alt='a lovely little loading bar that fills and unfills as you wait!'
			/>
		</div>
	);
};
export default Loading;
