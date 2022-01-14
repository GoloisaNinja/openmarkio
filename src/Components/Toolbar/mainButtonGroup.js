import {
	MdTitle,
	MdFormatBold,
	MdFormatItalic,
	MdFormatListBulleted,
	MdFormatListNumbered,
	MdCode,
	MdFormatQuote,
	MdInsertLink,
	MdImage,
	MdContentCopy,
	MdSave,
	MdInsertDriveFile,
} from 'react-icons/md';
import styles from './mainButtonGroup.module.scss';

const MainButtonGroup = ({
	handleNewArticle,
	handleInsertion,
	copyMarkdown,
	handleArticleSave,
	open,
	uid,
	menu,
	toggleIconMenu,
}) => {
	// HELPER TEXT TO SHOW USERS HOW TO USE CERTAIN MARKDOWN SYNTAX BASED ON TOOLBAR ICONS
	const insertionValues = {
		bold: `**bold_text**`,
		blockquote: `\n> your_quote`,
		italics: `*italic_text*`,
		header1: `\n# your_header`,
		image: `\n![describe_your_image](https://your_image_url.com)`,
		link: `[click to follow link](https;//www.example.com)`,
		unorderedList: `\n- list_item`,
		orderedList: `\n1. list_item`,
		codeBlock: `\n\`\`\` \n function foo() { \n \tlet a = true; \n \tlet b = 'bar' \n \treturn b; \n } \n \`\`\``,
	};

	return (
		<>
			<button
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleNewArticle();
				}}>
				<MdInsertDriveFile />
				{menu && <span className={styles.btn_span}>New Article</span>}
			</button>
			<button
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.header1);
				}}>
				<MdTitle />
				{menu && <span className={styles.btn_span}>Insert Header</span>}
			</button>
			<button
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.bold);
				}}>
				<MdFormatBold />
				{menu && <span className={styles.btn_span}>Insert Bold</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.italics);
				}}>
				<MdFormatItalic />
				{menu && <span className={styles.btn_span}>Insert Italic</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.unorderedList);
				}}>
				<MdFormatListBulleted />
				{menu && <span className={styles.btn_span}>Insert Bullet List</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.orderedList);
				}}>
				<MdFormatListNumbered />
				{menu && <span className={styles.btn_span}>Insert Num List</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.blockquote);
				}}>
				<MdFormatQuote />
				{menu && <span className={styles.btn_span}>Insert Blockquote</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.codeBlock);
				}}>
				<MdCode />
				{menu && <span className={styles.btn_span}>Insert Code Block</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.link);
				}}>
				<MdInsertLink />
				{menu && <span className={styles.btn_span}>Insert Link</span>}
			</button>
			<button
				className={open ? styles.btn_sm_hide : 'null'}
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					handleInsertion(insertionValues.image);
				}}>
				<MdImage />
				{menu && <span className={styles.btn_span}>Insert Image</span>}
			</button>
			<button
				onClick={(e) => {
					if (menu) {
						toggleIconMenu();
					}
					copyMarkdown();
				}}>
				<MdContentCopy />
				{menu && <span className={styles.btn_span}>Copy Markdown</span>}
			</button>
			{uid && (
				<button
					onClick={(e) => {
						if (menu) {
							toggleIconMenu();
						}
						handleArticleSave();
					}}>
					<MdSave />
					{menu && <span className={styles.btn_span}>Save Article</span>}
				</button>
			)}
		</>
	);
};
export default MainButtonGroup;
