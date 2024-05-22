import React, { useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useCurrentProject } from 'src/hooks'

const PDFBudget: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const pdfToPrintRef = useRef<HTMLDivElement | null>(null)
	const [numPages, setNumPages] = useState<number | null>(null)

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages)
	}

	return (
		<div ref={pdfToPrintRef} id="budget_id">
			<Document
				file={currentProject.imageContentUrl[0]}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				{Array.from(new Array(numPages), (el, index) => (
					<div key={`page_${index + 1}`}>
						<Page
							pageNumber={index + 1}
							canvasBackground="#A9ba9d"
							width={600}
							scale={1}
							renderTextLayer={false}
							renderAnnotationLayer={false}
						/>
					</div>
				))}
			</Document>
		</div>
	)
}

export default PDFBudget
