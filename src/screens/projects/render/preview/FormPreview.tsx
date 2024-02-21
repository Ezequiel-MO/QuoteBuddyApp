import { useEffect, useRef } from 'react'
import { Budget } from '@screens/budget/MainTable/higherComponents'

interface FormPreviewProps {
	isOpen: boolean
	onClose: () => void
}

export const FormPreview: React.FC<FormPreviewProps> = ({
	isOpen,
	onClose
}) => {
	if (!isOpen) return null

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onClose])

	return (
		<div className="fixed inset-0 z-50 overflow-auto bg-indigo-800 bg-opacity-75 flex justify-center items-center">
			<div
				className="relative p-8 bg-white-0 bg-opacity-50 max-w-4xl w-4/5 m-auto flex-col flex rounded-lg"
				ref={modalRef}
			>
				<span
					className="absolute top-0 right-0 p-4 cursor-pointer"
					onClick={onClose}
				>
					<button>[Close]</button>
				</span>
				<h2 className="text-xl font-bold">Form Preview</h2>
				<div className="mt-4 opacity-95">
					<Budget />
				</div>
			</div>
		</div>
	)
}
