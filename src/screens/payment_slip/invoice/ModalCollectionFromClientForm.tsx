import React, { FC } from 'react'
import { ModalComponent } from 'src/components/atoms/modal/Modal'
import { CollectionFromClientSpecs } from '../specs/CollectionFromClientSpecs'

interface ModalCollectionFromClientFormProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCollectionFromClientForm: FC<
	ModalCollectionFromClientFormProps
> = ({ open, setOpen }) => {
	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '45%',
		maxHeight: '90vh',
		bgcolor: 'background.paper',
		border: '1px solid #333',
		boxShadow: 24,
		overflow: 'auto',
		padding: 5
	}

	return (
		<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
			<div className="bg-gray-900 p-4 rounded-md text-gray-100">
				<CollectionFromClientSpecs openModal={open} setOpenModal={setOpen} />
			</div>
		</ModalComponent>
	)
}
