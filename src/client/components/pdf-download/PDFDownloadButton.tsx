import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'
import { Icon } from '@iconify/react'
import { Spinner } from '@components/atoms'

const PDFDownloadButton: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()

	const handleGeneratePDF = async () => {
		setIsLoading(true)
		try {
			const response = await baseAPI.post(
				'generate-pdf',
				JSON.stringify(currentProject),
				{
					responseType: 'blob'
				}
			)
			const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
			const pdfUrl = URL.createObjectURL(pdfBlob)

			navigate('/client/pdf', { state: { pdfUrl } })
		} catch (error) {
			console.error('Error generating PDF:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			onClick={handleGeneratePDF}
			className="flex items-center px-4 py-2 bg-cyan-500 text-white-0 font-bold rounded hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
			disabled={isLoading}
			aria-label="Download PDF"
		>
			{isLoading ? (
				<>
					<Spinner />
					<span className="ml-2">Generating PDF...</span>
				</>
			) : (
				<>
					<Icon icon="ant-design:printer-twotone" width="20" className="mr-2" />
					<span>Download PDF</span>
				</>
			)}
		</button>
	)
}

export default PDFDownloadButton
