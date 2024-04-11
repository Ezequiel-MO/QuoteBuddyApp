import { useLocation } from 'react-router-dom'

const PDFPresentation = () => {
	const location = useLocation()
	const pdfUrl = location.state?.pdfUrl

	if (!pdfUrl) {
		return <div>No PDF file found.</div>
	}

	return (
		<iframe
			src={pdfUrl}
			style={{ width: '100%', height: '100vh', border: 'none' }}
			title="PDF Viewer"
		></iframe>
	)
}

export default PDFPresentation
