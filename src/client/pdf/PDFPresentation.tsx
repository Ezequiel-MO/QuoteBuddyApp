import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig'

const PDFPresentation = () => {
	const location = useLocation()
	const pdfUrl = location.state?.pdfUrl
	const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!pdfUrl) return

		const fetchPdf = async () => {
			try {
				const response = await baseAPI.get(pdfUrl, { responseType: 'blob' })
				const blob = new Blob([response.data], { type: 'application/pdf' })
				const url = URL.createObjectURL(blob)
				setPdfBlobUrl(url)
			} catch (err) {
				console.error('Error fetching PDF:', err)
				setError('Failed to load PDF. Please try again.')
			}
		}

		fetchPdf()

		return () => {
			if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl)
		}
	}, [pdfUrl])

	if (!pdfUrl) {
		return <div>No PDF file found.</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!pdfBlobUrl) {
		return <div>Loading PDF...</div>
	}

	return (
		<iframe
			src={pdfBlobUrl}
			style={{ width: '100%', height: '100vh', border: 'none' }}
			title="PDF Viewer"
		/>
	)
}

export default PDFPresentation
