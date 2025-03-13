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
			className="flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out border border-transparent
			bg-[#ea5933]/90 text-white-0 hover:bg-[#ea5933] 
			dark:bg-[#ea5933]/40 dark:hover:bg-[#ea5933]/90
			disabled:opacity-50 shadow-sm"
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
					<Icon icon="mdi:file-pdf-box" className="w-5 h-5 mr-2" />
					<span>Download PDF</span>
				</>
			)}
		</button>
	)
}

export default PDFDownloadButton
