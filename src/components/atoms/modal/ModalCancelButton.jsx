import { Icon } from '@iconify/react'

export const ModalCancelButton = ({ handleClose }) => {
	return (
		<button
			className="mb-3 top-2 right-2 cursor-pointer hover:scale-110 "
			onClick={typeof handleClose === 'function' ? handleClose : undefined}
		>
			<Icon icon="material-symbols:cancel" width="30" color="#ea5933" />
		</button>
	)
}
