import { FC } from 'react'
import {
	ModalCancelButton,
	ModalComponent
} from '../../../../../../components/atoms'
import { TransfersModalHeader } from './TransfersModalHeader'
import { TransfersModalBody } from './TransfersModalBody'
import { useTransfers } from './context'

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2
}

export const TransfersModal: FC = () => {
	const { open, setOpen } = useTransfers()
	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<ModalCancelButton handleClose={() => setOpen(false)} />
			<div className="bg-slate-200 mr-2 p-2">
				<TransfersModalHeader />
				<TransfersModalBody />
			</div>
		</ModalComponent>
	)
}
