import React from 'react'
import { Icon } from '@iconify/react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
}

const withModal = <P extends object>(
	WrappedComponent: React.ComponentType<P>
): React.FC<P & ModalProps> => {
	return ({ isOpen, onClose, title, ...props }: ModalProps) => {
		if (!isOpen) {
			return null
		}

		return (
			<div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-[999]">
				<div className="bg-slate-800 p-8 rounded-lg shadow-lg relative w-full max-w-2xl mx-4 z-50">
					<button
						onClick={onClose}
						className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
					>
						<Icon icon="gg:close-o" width="24" height="24" />
					</button>
					{title && <h2 className="text-2xl mb-4 text-center">{title}</h2>}
					<WrappedComponent {...(props as P)} />
				</div>
			</div>
		)
	}
}

export default withModal
