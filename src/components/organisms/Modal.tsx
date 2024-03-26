import React, { ReactNode, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface ModalProps {
	isOpen: boolean
	modalType: 'closed' | 'destination' | 'overview' | 'map'
	onClose: () => void
	children: ReactNode
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	modalType,
	onClose,
	children
}) => {
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

	// Correctly apply modalSizeClass based on the modalType
	const modalSizeClass = ['map', 'destination'].includes(modalType)
		? 'w-[90%] h-[80%]'
		: 'max-w-lg w-full'

	if (!isOpen) return null

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			onClick={onClose}
		>
			<div
				className={`relative p-4 bg-white-0 dark:bg-gray-800 rounded-lg shadow-xl overflow-y-auto ${modalSizeClass} ${
					modalType === 'destination' ? 'h-[90vh]' : ''
				} ${
					isOpen ? 'scale-100' : 'scale-95 opacity-0'
				} transition-all duration-300`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="absolute top-0 right-0 m-4" onClick={onClose}>
					<Icon icon="ei:close" width="36" color="#ea5933" />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
