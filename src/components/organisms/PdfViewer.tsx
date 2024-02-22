import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'

interface Props {
	pdfMenus: string[]
}

export const PdfViewer: React.FC<Props> = ({ pdfMenus }) => {
	const [showModal, setShowModal] = useState(false)
	const [numPages, setNumPages] = useState<number | null>(null)

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages)
	}

	if (pdfMenus.length === 0) {
		return null
	}

	return (
		<>
			<button
				className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
				onClick={() => setShowModal(true)}
			>
				Visualize Sample Menus
			</button>
			<CentralModal
				open={showModal}
				handleClose={() => setShowModal(false)}
				typeOfModal="PDFViewer"
			>
				<Document file={pdfMenus[0]} onLoadSuccess={onDocumentLoadSuccess}>
					{Array.from(new Array(numPages || 0), (_, index) => (
						<Page key={`page_${index + 1}`} pageNumber={index + 1} />
					))}
				</Document>
			</CentralModal>
		</>
	)
}
