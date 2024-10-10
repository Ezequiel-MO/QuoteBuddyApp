import { Spinner } from '@components/atoms'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'

const PDFGenerator: React.FC = () => {
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
		<>
			{isLoading ? (
				<div style={{ textAlign: 'center' }}>
					<Spinner />
					<p>Bear with me, your PDF is being generated ...</p>
				</div>
			) : (
				<div
					onClick={handleGeneratePDF}
					className="flex flex-col items-center cursor-pointer"
				>
					<Icon icon="ant-design:printer-twotone" width="30" color="#ea5933" />
					<span>PDF</span>
				</div>
			)}
		</>
	)
}

export default PDFGenerator
