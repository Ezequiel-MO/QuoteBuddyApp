import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

interface PDFData {
	id: number
	projectCode: string
	projectName: string
	pdfUrl: string
	timestamp: string
}

const PDFNotificationCenter = () => {
	const [pdfList, setPdfList] = useState<PDFData[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const loadPdfList = () => {
			const rawData = localStorage.getItem('generatedPdfs')
			const parsedList = JSON.parse(rawData || '[]')
			setPdfList(parsedList)
		}

		loadPdfList()
		window.addEventListener('pdfListUpdated', loadPdfList)
		return () => window.removeEventListener('pdfListUpdated', loadPdfList)
	}, [])

	const handleViewPdf = (pdfUrl: string) => {
		navigate('/client/pdf', { state: { pdfUrl } })
		setIsOpen(false)
	}

	const handleClearAll = () => {
		localStorage.setItem('generatedPdfs', '[]')
		setPdfList([])
	}

	const handleRefresh = () => {
		window.dispatchEvent(new CustomEvent('pdfListUpdated'))
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
				aria-label="PDF Notifications"
			>
				<Icon icon="mdi:bell-outline" className="w-6 h-6" />
				{pdfList.length > 0 && (
					<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
						{pdfList.length}
					</span>
				)}
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden">
					<div className="p-3 border-b dark:border-gray-700 flex justify-between items-center">
						<h3 className="text-sm font-medium">Generated PDFs</h3>
						<div className="flex items-center">
							<button
								onClick={handleRefresh}
								className="text-xs text-blue-500 hover:text-blue-700 mr-2"
								aria-label="Refresh PDF list"
							>
								<Icon icon="mdi:refresh" className="w-4 h-4" />
							</button>
							{pdfList.length > 0 && (
								<button
									onClick={handleClearAll}
									className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
								>
									Clear All
								</button>
							)}
						</div>
					</div>

					<div className="max-h-64 overflow-y-auto">
						{pdfList.length === 0 ? (
							<div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
								No PDFs generated yet
							</div>
						) : (
							pdfList.map((pdf) => (
								<div
									key={pdf.id}
									className="p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
									onClick={() => handleViewPdf(pdf.pdfUrl)}
								>
									<div className="flex items-center">
										<Icon
											icon="mdi:file-pdf-box"
											className="w-5 h-5 text-red-500 mr-2"
										/>
										<div>
											<p className="text-sm font-medium">{pdf.projectName}</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												{pdf.projectCode} •{' '}
												{new Date(pdf.timestamp).toLocaleString()}
											</p>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default PDFNotificationCenter
