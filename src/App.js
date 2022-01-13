import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './Components/Sidebar/sidebar';
import MarkdownEditor from './Components/Markdown/markdown';
import Toolbar from './Components/Toolbar/toolbar';

function App() {
	const [sidebar, setSidebar] = useState(false);
	const [showPreview, setShowPreview] = useState(true);
	const styles = {
		container: {
			display: 'flex',
		},
		editor: {
			width: sidebar ? 'calc(100% - 250px)' : '100%',
		},
	};
	const handleSidebar = () => {
		setSidebar(!sidebar);
	};
	const togglePreview = () => {
		setShowPreview(!showPreview);
	};
	return (
		<Provider store={store}>
			<div style={styles.container}>
				<div>
					<Sidebar open={sidebar} />
				</div>
				<div style={styles.editor}>
					<Toolbar
						handleSidebar={handleSidebar}
						open={sidebar}
						togglePreview={togglePreview}
					/>
					<MarkdownEditor showPreview={showPreview} />
				</div>
			</div>
		</Provider>
	);
}

export default App;
