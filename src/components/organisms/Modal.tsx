import { Icon } from '@iconify/react'
import React, { ReactNode, useEffect } from 'react'

interface ModalProps {
	isOpen: boolean
	modalType: 'closed' | 'overview' | 'map'
	onClose: () => void
	children: ReactNode
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	modalType,
	onClose,
	children
}) => {
	const overviewStyles = ''
	const mapStyles = `bg-opacity-75 ${!isOpen ? 'hidden' : ''}`

	const modalSizeClass = ['map'].includes(modalType)
		? 'w-[90%] h-[80%]'
		: 'max-w-lg w-full'

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', handleEsc)

		return () => {
			window.removeEventListener('keydown', handleEsc)
		}
	}, [onClose])

	if (!isOpen) return null

	return (
		<div
			className={`flex justify-center items-center fixed inset-0 z-[300] backdrop-blur-sm ${
				modalType === 'map' ? mapStyles : overviewStyles
			}`}
			onClick={onClose}
		>
			<div
				className={`${modalSizeClass} p-4 bg-transparent rounded-lg shadow-xl overflow-auto`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="absolute top-0 right-0 m-4" onClick={onClose}>
					<Icon icon="ei:close" width="36" />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
