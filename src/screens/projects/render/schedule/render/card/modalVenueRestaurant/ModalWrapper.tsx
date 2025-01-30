// ModalComponent.tsx
import { FC, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface ModalWrapperProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: ReactNode
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
	open,
	setOpen,
	children
}) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false)
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [setOpen])

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	if (!open) return null

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="relative bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-6">
				<button
					onClick={() => setOpen(false)}
					className="absolute top-5 right-5 text-gray-400 hover:text-orange-500 transition-colors"
					aria-label="Close"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="overflow-y-auto max-h-[80vh]">{children}</div>
			</div>
		</div>,
		document.body
	)
}
