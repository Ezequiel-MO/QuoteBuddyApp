import { FC } from 'react'
import {
	ModalCancelButton,
	ModalComponent
} from '../../../../../../components/atoms'
import { TransfersModalHeader } from './TransfersModalHeader'
import { TransfersModalBody } from './TransfersModalBody'
import { useTransfers } from './context'
import '../TransfersModal.css'
import { useCurrentProject } from '../../../../../../hooks'

export const TransfersModal: FC = () => {
	const { open, setOpen, state } = useTransfers()
	const { transfers, services } = state
	const { addTransferInToSchedule } = useCurrentProject()

	const saveData = () => {
		let meetGreetCount = 0
		let assistanceCount = 0

		const isLastIteration = (index: number, length: number) => {
			return index === length - 1
		}

		services.forEach((service, index) => {
			const { typeOfAssistance, freelancer } = service
			const { halfDayRate } = freelancer
			if (service.typeOfAssistance === 'meetGreet') {
				meetGreetCount++
				transfers[0].meetGreetCost = halfDayRate
			}
			if (['hostessOnBoard', 'guideOnBoard'].includes(typeOfAssistance)) {
				assistanceCount++
				transfers[0].assistanceCost = halfDayRate
			}
			if (isLastIteration(index, services.length)) {
				if (meetGreetCount > 0) {
					transfers[0].meetGreet = meetGreetCount
				}
				if (assistanceCount > 0) {
					transfers[0].assistance = assistanceCount
				}
			}
		})

		addTransferInToSchedule(transfers)
	}

	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<ModalCancelButton handleClose={() => setOpen(false)} />
			<div className="custom-scrollbar bg-slate-200 rounded-lg shadow-lg overflow-y-auto max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-9/10">
				<TransfersModalHeader />
				<TransfersModalBody />
				<button
					className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
					onClick={saveData}
				>
					Save Data
				</button>
			</div>
		</ModalComponent>
	)
}

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	height: '90%',
	padding: '20px',
	backgroundColor: '#f4f4f4',
	borderRadius: '10px',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
}
