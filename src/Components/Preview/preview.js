import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import Prism from 'prismjs';
import styles from './preview.module.scss';

const Preview = ({ text, showPreview }) => {
	marked.setOptions({
		breaks: true,
		highlight: function (code) {
			return Prism.highlight(code, Prism.languages.javascript, 'javascript');
		},
	});
	const renderer = new marked.Renderer();
	renderer.link = function (href, title, text) {
		return `<a target="_blank" href="${href}">${text}</a>`;
	};

	const parsedMarkdown = marked.parse(text, { renderer: renderer });
	return (
		<div
			className={showPreview ? styles.preview : styles.preview_hidden}
			dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></div>
	);
};

Preview.propTypes = {
	text: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	text: state.editor.text,
});

export default connect(mapStateToProps, null)(Preview);
