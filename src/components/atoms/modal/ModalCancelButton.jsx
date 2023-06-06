import { Icon } from '@iconify/react'

export const ModalCancelButton = ({ handleClose }) => {
	return (
		<div style={{marginBottom:"10px"}}>
			<button
				className="absolute top-2 right-2 cursor-pointer hover:scale-110 "
				onClick={handleClose}
			>
				<Icon icon="material-symbols:cancel" width="30" color="#ea5933" />
			</button>
		</div>
	)
}
