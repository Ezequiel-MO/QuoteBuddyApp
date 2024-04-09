import { Page, Text, View, Document } from '@react-pdf/renderer'
import { styles } from './PDFPresentation'
import { IProject } from '@interfaces/project'
import PDFRichParagraph from './PDFRichParagraph'
import PDFRenderPhotos from './PDFRenderPhotos'

interface Props {
	currentProject: IProject
}

const PDFMainComponent = ({ currentProject }: Props) => {
	console.log(
		'photos',
		currentProject.schedule[0].lunch.restaurants[0].imageContentUrl
	)
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text
						style={styles.quoteTitle}
					>{`Quotation Gr. ${currentProject.groupName}`}</Text>
					<PDFRichParagraph
						text={
							currentProject.schedule[0].lunch.restaurants[0].textContent || ''
						}
					/>
				</View>

				<View style={styles.section}>
					<PDFRenderPhotos
						images={
							currentProject.schedule[0].lunch.restaurants[0].imageContentUrl ||
							[]
						}
					/>
				</View>
			</Page>
		</Document>
	)
}

export default PDFMainComponent
