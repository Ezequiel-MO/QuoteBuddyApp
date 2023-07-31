import { FC } from 'react'
import {
	ModalCancelButton,
	ModalComponent
} from '../../../../../../components/atoms'
import { TransfersModalHeader } from './TransfersModalHeader'
import { TransfersModalBody } from './TransfersModalBody'
import { useTransfers } from './context'
import '../TransfersModal.css'

export const TransfersModal: FC = () => {
	const { open, setOpen } = useTransfers()

	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<ModalCancelButton handleClose={() => setOpen(false)} />
			<div className="custom-scrollbar bg-slate-200 mr-2 p-2 rounded-lg shadow-lg overflow-y-auto max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-9/10">
				<TransfersModalHeader />
				<TransfersModalBody />
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
