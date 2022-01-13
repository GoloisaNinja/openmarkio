import { UPDATE_TEXT } from '../Actions/types';

const initialState = {
	text: `# Welcome to OpenMarkIo\n## A markdown editor for the people!\n**OpenMarkIo allows you to effortlessly inject markdown via our wysiwyg toolset!**\n\n*Because who can remember markdown syntax ammirite??*\n\nSigning in with Google gives you even more goodies like:\n1. a customized user experience\n1. save and retrieve articles\n1. feeling young again\n\nAll users can use our quick copy tool to take your carefully crafted markdown and copy it to your clipboard.\n\nOur view toggle allows you to switch between your markdown and an HTML preview on smaller screens!\n> Cool styles like blockquotes are supported out of the box\n\`\`\`\n//code blocks omg\nfunction whatTheFunction() {\n\tlet awesome = true;\n\treturn 'lit';\n}\n\`\`\`\nEver seen a shameless plug link?\nOf course you have\n[definitely not my portfolio site...](https://jcodes.page)\nI'll bet you've never seen a Hibachi Bed and Breakfast before though...\n![a sketch of a hibachi chef ominously making your bed](https://i.imgur.com/2M91tJo.jpg)\n\nSo go ahead my little markown demons - click the new article button at the top and start creating amazing markdown!`,
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
