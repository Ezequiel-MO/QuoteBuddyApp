import { FC } from 'react'

interface ModalConfirmButtonProps {
	handleConfirm: () => void
	text?: string
}

export const ModalConfirmButton: FC<ModalConfirmButtonProps> = ({
	handleConfirm,
	text = 'Save Venue'
}) => {
	return (
		<button
			className="cursor-pointer py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase rounded-lg transition-colors duration-200"
			onClick={handleConfirm}
		>
			{text}
		</button>
	)
}
