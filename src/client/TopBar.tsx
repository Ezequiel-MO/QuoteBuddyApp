import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '@components/organisms/Modal'
import OverviewTable from '@screens/clientMainPage/overview/OverviewTable'
import { MapWrapper } from '@screens/vendor_map/Wrapper'

const TopBar: React.FC = () => {
	const [modalContent, setModalContent] = useState<React.ReactNode>(null)
	const [modalType, setModalType] = useState<'closed' | 'overview' | 'map'>(
		'closed'
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModalWithContent = (
		content: React.ReactNode,
		modal: 'closed' | 'overview' | 'map'
	) => {
		setModalType(modal)
		setIsModalOpen(true)
		setModalContent(content)
	}

	return (
		<div className="flex justify-between items-center dark:text-white-0 p-4">
			<div className="flex space-x-4">
				<div
					className="flex flex-col items-center cursor-pointer"
					onClick={() =>
						openModalWithContent(<div>Destination Content</div>, 'closed')
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
					onClick={() => openModalWithContent(<OverviewTable />, 'overview')}
				>
					<Icon icon="bi:calendar-check" width="30" color="#ea5933" />
					<span>Overview</span>
				</div>
				<div className="flex flex-col items-center cursor-pointer">
					<Icon icon="ant-design:printer-twotone" width="30" color="#ea5933" />
					<span>PDF</span>
				</div>
			</div>
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
