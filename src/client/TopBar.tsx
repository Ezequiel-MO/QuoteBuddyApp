import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '@components/organisms/Modal'
import OverviewTable from '@screens/clientMainPage/overview/OverviewTable'
import { MapWrapper } from '@screens/vendor_map/Wrapper'
import { Destination } from './destination/Destination'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@components/atoms'

const TopBar: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [modalContent, setModalContent] = useState<React.ReactNode>(null)
	const [modalType, setModalType] = useState<
		'closed' | 'destination' | 'overview' | 'map'
	>('closed')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModalWithContent = (
		content: React.ReactNode,
		modal: 'closed' | 'destination' | 'overview' | 'map'
	) => {
		setModalType(modal)
		setIsModalOpen(true)
		setModalContent(content)
	}

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
		<div className="flex justify-between items-center dark:text-white-0 p-4">
			{isLoading ? (
				<div style={{ textAlign: 'center' }}>
					<Spinner />
					<p>Bear with me, your PDF is being generated ...</p>
				</div>
			) : (
				<>
					<div className="flex space-x-4">
						<div
							className="flex flex-col items-center cursor-pointer"
							onClick={() =>
								openModalWithContent(<Destination />, 'destination')
							}
						>
							<Icon icon="bx:world" width="30" color="#ea5933" />
							<span>Destination</span>
						</div>
						<div
							className="flex flex-col items-center cursor-pointer"
							onClick={() => openModalWithContent(<MapWrapper />, 'map')}
						>
							<Icon icon="akar-icons:map" width="30" color="#ea5933" />
							<span>Map</span>
						</div>
						<div
							className="flex flex-col items-center cursor-pointer"
							onClick={() =>
								openModalWithContent(<OverviewTable />, 'overview')
							}
						>
							<Icon icon="bi:calendar-check" width="30" color="#ea5933" />
							<span>Overview</span>
						</div>
						<div
							onClick={handleGeneratePDF}
							className="flex flex-col items-center cursor-pointer"
						>
							<Icon
								icon="ant-design:printer-twotone"
								width="30"
								color="#ea5933"
							/>
							<span>PDF</span>
						</div>
					</div>
				</>
			)}

			<Modal
				isOpen={isModalOpen}
				modalType={modalType}
				onClose={() => setIsModalOpen(false)}
			>
				{modalContent}
			</Modal>
		</div>
	)
}

export default TopBar
