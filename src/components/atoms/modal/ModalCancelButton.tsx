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
			className="absolute top-3 right-3 cursor-pointer text-white-0 bg-[#ea5933] hover:bg-red-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2 shadow-lg z-50"
			onClick={handleClose}
			aria-label="Cancel"
		>
			<Icon
				icon="material-symbols:close"
				width="12"
				height="12"
				className="drop-shadow-md"
			/>
		</button>
	)
}
