import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Icon } from '@iconify/react'

interface PhotosModalProps {
	images: string[]
	currentIndex: number
	setCurrentIndex: (index: number) => void
	onClose: () => void
}

const PhotosModal: React.FC<PhotosModalProps> = ({
	images,
	currentIndex,
	setCurrentIndex,
	onClose
}) => {
	const totalImages = images.length
	const imageSrc = images[currentIndex]

	const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

	const handleNext = () => {
		setCurrentIndex((currentIndex + 1) % totalImages)
	}

	const handlePrev = () => {
		setCurrentIndex((currentIndex - 1 + totalImages) % totalImages)
	}

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') handleNext()
			if (e.key === 'ArrowLeft') handlePrev()
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleNext, handlePrev, onClose])

	// Swipe navigation
	const handlers = useSwipeable({
		onSwipedLeft: handleNext,
		onSwipedRight: handlePrev,
		preventScrollOnSwipe: true,
		trackTouch: true
	})

	// Copy Image to Clipboard
	// Copy Image to Clipboard
	const handleCopy = async () => {
		// Check if Clipboard API is supported
		const canWriteImage =
			!!navigator.clipboard &&
			!!navigator.clipboard.write &&
			!!window.ClipboardItem
		const canWriteText =
			!!navigator.clipboard && !!navigator.clipboard.writeText

		if (canWriteImage) {
			try {
				const response = await fetch(imageSrc, { mode: 'cors' })
				if (!response.ok) throw new Error('Network response was not ok')
				const blob = await response.blob()

				// Check if the image is same-origin or has proper CORS headers
				if (blob.type.startsWith('image/')) {
					await navigator.clipboard.write([
						new ClipboardItem({
							[blob.type]: blob
						})
					])
					// Show feedback message
					setFeedbackMessage('Image copied to clipboard')
				} else {
					throw new Error('Fetched file is not an image.')
				}
			} catch (error) {
				console.error('Failed to copy image:', error)
				// Fallback to copying image URL
				if (canWriteText) {
					try {
						await navigator.clipboard.writeText(imageSrc)
						setFeedbackMessage('Image URL copied to clipboard')
					} catch (err) {
						console.error('Failed to copy image URL:', err)
						setFeedbackMessage('Copy failed')
					}
				} else {
					setFeedbackMessage('Copy not supported')
				}
			}
		} else if (canWriteText) {
			// Clipboard API doesn't support images, fallback to copying image URL
			try {
				await navigator.clipboard.writeText(imageSrc)
				setFeedbackMessage('Image URL copied to clipboard')
			} catch (error) {
				console.error('Failed to copy image URL:', error)
				setFeedbackMessage('Copy not supported')
			}
		} else {
			// Clipboard API not supported
			setFeedbackMessage('Copy not supported in this browser')
		}

		// Hide feedback after 2 seconds
		setTimeout(() => {
			setFeedbackMessage(null)
		}, 2000)
	}

	// Download Image
	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = imageSrc
		link.download = imageSrc.substring(imageSrc.lastIndexOf('/') + 1)
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		// Show feedback message
		setFeedbackMessage('Downloaded')
		// Hide feedback after 2 seconds
		setTimeout(() => {
			setFeedbackMessage(null)
		}, 2000)
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-50 bg-black-50 bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
			onClick={(e) => e.target === e.currentTarget && onClose()}
			{...handlers}
		>
			{/* Close Button */}
			<button
				className="absolute top-4 right-4 bg-black-50 bg-opacity-50 text-white-0 rounded-full p-2 hover:bg-opacity-70 focus:outline-none z-10"
				onClick={onClose}
				aria-label="Close"
			>
				<Icon icon="mdi:close" width={32} height={32} />
			</button>

			{/* Copy and Download Buttons */}
			<div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
				<button
					onClick={handleCopy}
					className="bg-black-50 bg-opacity-50 text-white-0 p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
					title="Copy Image"
					aria-label="Copy Image"
				>
					<Icon icon="mdi:content-copy" width={24} height={24} />
				</button>
				<button
					onClick={handleDownload}
					className="bg-black-50 bg-opacity-50 text-white-0 p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
					title="Download Image"
					aria-label="Download Image"
				>
					<Icon icon="mdi:download" width={24} height={24} />
				</button>
			</div>

			{/* Main Content */}
			<div className="flex items-center justify-center max-w-5xl w-full h-[80vh] relative">
				{/* Feedback Overlay */}
				{feedbackMessage && (
					<div className="absolute inset-0 bg-green-500 bg-opacity-60 flex items-center justify-center">
						<span className="text-white-0 text-3xl font-bold">
							{feedbackMessage}
						</span>
					</div>
				)}

				{/* Left Arrow */}
				<button
					className="text-white-0 focus:outline-none p-2 bg-black-50 bg-opacity-50 rounded-full hover:bg-opacity-70 mx-2 z-10"
					onClick={handlePrev}
					aria-label="Previous Image"
				>
					<Icon icon="mdi:chevron-left" width={48} height={48} />
				</button>

				{/* Main Image */}
				<div className="flex-grow h-full flex items-center justify-center">
					<img
						src={imageSrc}
						alt={`Image ${currentIndex + 1} of ${totalImages}`}
						className="max-h-full object-contain"
					/>
				</div>

				{/* Right Arrow */}
				<button
					className="text-white-0 focus:outline-none p-2 bg-black-50 bg-opacity-50 rounded-full hover:bg-opacity-70 mx-2 z-10"
					onClick={handleNext}
					aria-label="Next Image"
				>
					<Icon icon="mdi:chevron-right" width={48} height={48} />
				</button>
			</div>

			{/* Image Counter */}
			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black-50 bg-opacity-70 text-white-0 px-6 py-2 rounded-full text-lg font-semibold">
				{`Image ${currentIndex + 1} of ${totalImages}`}
			</div>
		</div>
	)
}

export default PhotosModal
