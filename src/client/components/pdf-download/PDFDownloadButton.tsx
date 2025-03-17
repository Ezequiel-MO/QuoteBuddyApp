import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'
import { Icon } from '@iconify/react'
import { Spinner } from '@components/atoms'
import { toast } from 'react-toastify'

const PDFDownloadButton = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [jobId, setJobId] = useState<string | null>(null)
	const [statusPolling, setStatusPolling] = useState<NodeJS.Timeout | null>(
		null
	)
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()

	// Effect to handle status polling
	useEffect(() => {
		if (!jobId) return

		const pollStatus = async () => {
			try {
				const response = await baseAPI.get(`generate-pdf/status/${jobId}`)
				const { status, pdfUrl } = response.data.data

				if (status === 'completed' && pdfUrl) {
					if (statusPolling) {
						clearInterval(statusPolling)
					}
					setStatusPolling(null)
					setIsGenerating(false)
					setJobId(null)

					// Show success notification
					toast.success('PDF generated successfully!', {
						onClick: () => navigate('/client/pdf', { state: { pdfUrl } })
					})

					// Store the PDF in local storage for later access
					const pdfList = JSON.parse(
						localStorage.getItem('generatedPdfs') || '[]'
					)
					pdfList.push({
						id: Date.now(),
						projectCode: currentProject.code,
						projectName: currentProject.groupName,
						pdfUrl,
						timestamp: new Date().toISOString()
					})
					localStorage.setItem('generatedPdfs', JSON.stringify(pdfList))
				} else if (status === 'failed') {
					if (statusPolling) {
						clearInterval(statusPolling)
					}
					setStatusPolling(null)
					setIsGenerating(false)
					setJobId(null)
					toast.error('PDF generation failed. Please try again.')
				}
			} catch (error) {
				console.error('Error checking PDF status:', error)
			}
		}

		// Poll every 3 seconds
		const intervalId = setInterval(pollStatus, 3000)
		setStatusPolling(intervalId)

		// Cleanup function
		return () => {
			if (statusPolling) clearInterval(statusPolling)
		}
	}, [jobId, navigate, currentProject])

	const handleGeneratePDF = async () => {
		setIsGenerating(true)
		try {
			const response = await baseAPI.post(
				'generate-pdf',
				JSON.stringify(currentProject)
			)

			// Extract job ID from response
			const { jobId, statusUrl } = response.data.data
			setJobId(jobId)

			// Show notification that PDF generation started
			toast.info("PDF generation started. We'll notify you when it's ready.")
		} catch (error) {
			console.error('Error starting PDF generation:', error)
			toast.error('Failed to start PDF generation. Please try again.')
			setIsGenerating(false)
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
