// ModalCancelButton.tsx
import { Icon } from '@iconify/react'
import { FC } from 'react'

interface ModalCancelButtonProps {
	handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ModalCancelButton: FC<ModalCancelButtonProps> = ({
	handleClose
}) => {
	return (
		<button
			className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white transition-transform transform hover:scale-110"
			onClick={handleClose}
			aria-label="Cancel"
		>
			<Icon icon="material-symbols:cancel" width="24" color="currentColor" />
		</button>
	)
}
