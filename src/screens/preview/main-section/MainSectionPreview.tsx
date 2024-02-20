import { useEffect, useRef } from 'react'
import Schedule from './Schedule'
import { Icon } from '@iconify/react'

interface FormPreviewProps {
	isOpen: boolean
	onClose: () => void
}

export const MainSectionPreview: React.FC<FormPreviewProps> = ({
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

	const handleCloseClick = () => {
		onClose()
	}

	return (
		<div className="fixed inset-0 z-50 overflow-auto bg-indigo-800 bg-opacity-85 flex justify-center items-start pt-20">
			<div
				className="p-8 bg-slate-800 text-white-0 opacity-90 max-w-6xl w-5/6 flex-col flex rounded-lg absolute"
				ref={modalRef}
				style={{ top: '10%' }}
			>
				<span
					className="absolute top-0 right-0 p-4 cursor-pointer"
					onClick={handleCloseClick}
				>
					<button className="text-lg font-semibold">
						<Icon icon="material-symbols:tab-close" width={36} color="red" />
					</button>
				</span>
				<h2 className="text-xl font-bold">Program Preview</h2>
				<div className="mt-4 opacity-95">
					<Schedule />
				</div>
			</div>
		</div>
	)
}
