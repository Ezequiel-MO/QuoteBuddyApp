import React, { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

const DemoRequestModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children
}) => {
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

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			// Prevent scrolling of background content when modal is open
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.body.style.overflow = 'auto'
		}
	}, [isOpen, onClose])

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscKey)
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey)
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
					<motion.div
						initial={{ opacity: 0, y: -50, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 50, scale: 0.95 }}
						transition={{ type: 'spring', damping: 25, stiffness: 500 }}
						className="relative w-full max-w-md mx-auto"
						ref={modalRef}
					>
						<div className="bg-white-0 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
							<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
								<h2 className="text-xl font-semibold text-gray-800 dark:text-white">
									{title}
								</h2>
								<button
									onClick={onClose}
									className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									aria-label="Close"
								>
									<Icon icon="mdi:close" className="w-6 h-6" />
								</button>
							</div>
							<div className="p-6">{children}</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}

export default DemoRequestModal
