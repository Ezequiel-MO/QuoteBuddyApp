import { Icon } from '@iconify/react'

export const ModalCancelButton = ({ handleClose }) => {
	return (
		<button
			className="absolute, top-2 left-2 cursor-pointer hover:scale-110 "
			onClick={handleClose}
		>
			<Icon icon="material-symbols:cancel" width="30" color="#ea5933" />
		</button>
	)
}
