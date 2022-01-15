import { UPDATE_TEXT } from '../Actions/types';

const initialState = {
	text: `# Welcome to OpenMarkIo\n## An online markdown editor for cool kids!\n**OpenMarkIo allows you to effortlessly inject markdown via our wysiwyg toolset!**\n\n*Because who can remember markdown syntax ammirite??*\n\nSigning in with Google gives you even more goodies like:\n1. the app will know your name - not in a creepy way!\n1. your work is precious, save and retrieve articles!\n1. feel superior to lesser mortals!\n\nAll users get access to our quick copy tool to take your carefully crafted markdown and copy it to your clipboard.\n\nOur view toggle allows you to switch between your markdown and an HTML preview on smaller screens!\n> Cool styles like blockquotes are supported out of the box\n\`\`\`\n//code blocks omg\nfunction whatTheFunction() {\n\tlet awesome = true;\n\treturn 'lit';\n}\n\`\`\`\nEver seen a shameless plug link?\nOf course you have\n\n[definitely not my portfolio site...](https://jcodes.page)\n\nImages you ask? Oh yes, we can do images. Observe the Majestic Millie posing with her favorite monkey which she murdered roughly 3 weeks after this photo was taken.\n![My french bulldog Millie looking absolutely gorgeous with her now deceased pet stuffed monkey](https://i.imgur.com/XCJTOKv.jpg)\n\nSo go ahead my little markown demons - start creating amazing markdown with OpenMarkdowIo!`,
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case UPDATE_TEXT:
			return {
				...state,
				text: payload,
			};
		default:
			return state;
	}
}
