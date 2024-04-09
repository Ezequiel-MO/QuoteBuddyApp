import { StyleSheet, PDFViewer } from '@react-pdf/renderer'
import PDFMainComponent from './PDFMainComponent'
import { useCurrentProject } from 'src/hooks'

export const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	viewer: {
		width: '100%',
		height: '100vh',
		maxWidth: '1400px',
		margin: '0 auto'
	},

	quoteTitle: {
		fontSize: 18,
		fontWeight: 'extrabold',
		textAlign: 'center',
		color: '#4B5563',
		marginBottom: 24
	}
})

const PDFPresentation = () => {
	const { currentProject } = useCurrentProject()
	return (
		<PDFViewer style={styles.viewer}>
			<PDFMainComponent currentProject={currentProject} />
		</PDFViewer>
	)
}

export default PDFPresentation
