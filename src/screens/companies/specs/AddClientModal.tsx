import React, { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import ClientMasterForm from '@screens/clients/specs/ClientMasterForm'

interface AddClientModalProps {
	isOpen: boolean
	onClose: () => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
	const modalRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			onClose()
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="relative bg-slate-800 p-6 rounded-md shadow-md w-full max-w-3xl mx-4 my-8 overflow-y-auto max-h-full"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 text-white-0"
				>
					<Icon icon="mdi:close" width="24" height="24" />
				</button>
				<h2 className="text-xl font-semibold mb-4">Add Client</h2>
				<ClientMasterForm />
			</div>
		</div>
	)
}

export default AddClientModal
