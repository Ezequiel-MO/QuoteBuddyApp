import { FC, useEffect, useState } from 'react'
import {
	ModalCancelButton,
	ModalComponent
} from '../../../../../../components/atoms'
import { TransfersModalHeader } from './TransfersModalHeader'
import { TransfersModalBody } from './TransfersModalBody'
import { useTransfers } from './context'
import '../TransfersModal.css'
import { useCurrentProject } from '../../../../../../hooks'
import { couterMeetGreetAndAssistance } from "./helper"

interface TransfersModalProps {
	newTypeTransfer: 'in' | 'out'
}

export const TransfersModal: FC<TransfersModalProps> = ({ newTypeTransfer }) => {
	const { open, setOpen, state, typeTransfer, setTypeTransfer, dispatch } = useTransfers()
	const { transfersIn, servicesIn, servicesOut, transfersOut } = state
	const { addTransferToSchedule } = useCurrentProject()
	const [prevTransfers, setPrevTransfers] = useState<any>([])

	useEffect(() => {
		setTypeTransfer(newTypeTransfer)
		setPrevTransfers(typeTransfer === "in" ? transfersIn : transfersOut)
	}, [newTypeTransfer])

	const handleClose = () => {
		if(typeTransfer === "in"){
			dispatch({
				type: "UPDATE_TRANSFER_IN",
				payload: { transferObject: prevTransfers }
			})
			setOpen(false)
		}else{
			dispatch({
				type: "UPDATE_TRANSFER_OUT",
				payload: { transferObject: prevTransfers }
			})
			setOpen(false)
		}
	}


	const saveData = () => {
		const transfers = typeTransfer === "in" ? transfersIn : transfersOut
		const services = typeTransfer === "in" ? servicesIn : servicesOut
		const { assistanceCount, meetGreetCount } = couterMeetGreetAndAssistance(services)

		const isLastIteration = (index: number, length: number) => {
			return index === length - 1
		}

		const updatedTransfers = transfers.map((transfer) => {
			let updatedTransfer = { ...transfer }
			services.forEach((service, serviceIndex) => {
				const { typeOfAssistance, freelancer } = service
				const { halfDayRate } = freelancer
				if (service.typeOfAssistance === 'meetGreet') {
					updatedTransfer.meetGreetCost = halfDayRate
				}
				if (['hostessOnBoard', 'guideOnBoard'].includes(typeOfAssistance)) {
					updatedTransfer.assistanceCost = halfDayRate
				}
				if (isLastIteration(serviceIndex, services.length)) {
					if (meetGreetCount > 0) {
						updatedTransfer.meetGreet = meetGreetCount
					}
					if (assistanceCount > 0) {
						updatedTransfer.assistance = assistanceCount
					}
				}
			})
			return updatedTransfer
		})
		if (typeTransfer === "in") {
			addTransferToSchedule('transfer_in', updatedTransfers)
			setOpen(false)
		}
		if (typeTransfer === "out") {
			addTransferToSchedule("transfer_out", updatedTransfers)
			setOpen(false)
		}
	}


	return (
		<ModalComponent open={open} setOpen={()=>handleClose()} styleModal={styleModal}>
			<ModalCancelButton handleClose={() => handleClose()}
			/>
			<div className="custom-scrollbar bg-slate-200 rounded-lg shadow-lg overflow-y-auto max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-9/10">
				<TransfersModalHeader />
				<TransfersModalBody />
				<button
					className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
					type='button'
					onClick={() => saveData()}
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
