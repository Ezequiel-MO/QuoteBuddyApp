import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig' // Assumes an axios instance with authentication
import { useCurrentProject } from 'src/hooks' // Custom hook to get current project
import { Icon } from '@iconify/react'
import { Spinner } from '@components/atoms' // Custom spinner component
import { toast } from 'react-toastify'

const PDFDownloadButton = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [jobId, setJobId] = useState<string | null>(null)
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()

	useEffect(() => {
		if (!jobId) return

		const pollStatus = async () => {
			try {
				const response = await baseAPI.get(`generate-pdf/status/${jobId}`)
				console.log('Polling response:', response.data)
				const { status, pdfUrl } = response.data.data
				console.log('Status:', status, 'PDF URL:', pdfUrl)

				if (status === 'completed' && pdfUrl) {
					console.log('Storing PDF in localStorage')
					storePdfInLocalStorage(pdfUrl)
					toast.success('PDF generated successfully!')
					setIsGenerating(false) // Stop the spinner
					setJobId(null) // Clear jobId to stop polling
				} else if (status === 'failed') {
					console.log('PDF generation failed')
					toast.error('PDF generation failed. Please try again.')
					setIsGenerating(false) // Stop the spinner on failure
					setJobId(null) // Clear jobId
				}
			} catch (error) {
				console.error('Polling error:', error)
				toast.error('Error checking PDF status. Please try again.')
				setIsGenerating(false) // Stop the spinner on error
				setJobId(null) // Clear jobId
			}
		}

		const intervalId = setInterval(pollStatus, 3000)
		return () => clearInterval(intervalId) // Cleanup polling on unmount or jobId change
	}, [jobId])

	const storePdfInLocalStorage = (pdfUrl: string) => {
		try {
			const pdfList = JSON.parse(localStorage.getItem('generatedPdfs') || '[]')
			if (pdfList.findIndex((pdf: any) => pdf.pdfUrl === pdfUrl) >= 0) return

			const newPdf = {
				id: Date.now(),
				projectCode: currentProject.code,
				projectName: currentProject.groupName,
				pdfUrl,
				timestamp: new Date().toISOString()
			}
			pdfList.push(newPdf)
			localStorage.setItem('generatedPdfs', JSON.stringify(pdfList))
			window.dispatchEvent(new CustomEvent('pdfListUpdated'))
		} catch (error) {
			console.error('Error storing PDF:', error)
		}
	}

	const handleGeneratePDF = async () => {
		setIsGenerating(true)
		try {
			const response = await baseAPI.post(
				'generate-pdf',
				JSON.stringify(currentProject)
			)
			const { jobId } = response.data.data
			setJobId(jobId)
			toast.info("PDF generation started. We'll notify you when it's ready.")
		} catch (error) {
			console.error('Error starting PDF generation:', error)
			toast.error('Failed to start PDF generation. Please try again.')
			setIsGenerating(false) // Stop the spinner if starting fails
		}
	}

	return (
		<button
			onClick={handleGeneratePDF}
			className="flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out border border-transparent
        bg-[#ea5933]/90 text-white-0 hover:bg-[#ea5933] 
        dark:bg-[#ea5933]/40 dark:hover:bg-[#ea5933]/90
        disabled:opacity-50 shadow-sm"
			disabled={isGenerating}
			aria-label="Generate PDF"
		>
			{isGenerating ? (
				<>
					<Spinner />
					<span className="ml-2">Processing PDF...</span>
				</>
			) : (
				<>
					<Icon icon="mdi:file-pdf-box" className="w-5 h-5 mr-2" />
					<span>Generate PDF</span>
				</>
			)}
		</button>
	)
}

export default PDFDownloadButton
