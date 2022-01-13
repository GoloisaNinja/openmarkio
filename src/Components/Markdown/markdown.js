import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateText } from '../../Actions/editor';
import Preview from '../Preview/preview';
import styles from './markdown.module.scss';

const MarkdownEditor = ({ text, updateText, showPreview }) => {
	const handleUpdate = (text) => {
		updateText(text);
	};
	return (
		<div className={styles.container}>
			<textarea
				id='md_editor'
				value={text}
				className={showPreview ? styles.md_editor_hidden : styles.md_editor}
				onChange={(e) => handleUpdate(e.target.value)}
			/>
			<Preview showPreview={showPreview} />
		</div>
	);
};

MarkdownEditor.propTypes = {
	text: PropTypes.string.isRequired,
	updateText: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	text: state.editor.text,
});

export default connect(mapStateToProps, { updateText })(MarkdownEditor);
