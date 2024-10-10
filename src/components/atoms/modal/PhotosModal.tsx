import React, { useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'

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
				className="absolute top-4 right-4 text-white text-4xl font-bold focus:outline-none z-10"
				onClick={onClose}
				aria-label="Close"
			>
				&times;
			</button>

			{/* Main Content */}
			<div className="flex items-center justify-center max-w-5xl w-full h-[80vh]">
				{/* Left Arrow */}
				<button
					className="text-white-0 focus:outline-none p-2 bg-black-50 bg-opacity-50 rounded-full hover:bg-opacity-70 mx-2"
					onClick={handlePrev}
					aria-label="Previous Image"
				>
					{/* SVG Left Arrow */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-12 w-12"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					</svg>
				</button>

				{/* Main Image */}
				<div className="flex-grow h-full flex items-center justify-center">
					<img
						src={images[currentIndex]}
						alt={`Image ${currentIndex + 1} of ${totalImages}`}
						className="max-h-full object-contain"
					/>
				</div>

				{/* Right Arrow */}
				<button
					className="text-white-0 focus:outline-none p-2 bg-black-50 bg-opacity-50 rounded-full hover:bg-opacity-70 mx-2"
					onClick={handleNext}
					aria-label="Next Image"
				>
					{/* SVG Right Arrow */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-12 w-12"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
					</svg>
				</button>
			</div>

			{/* Image Counter */}
			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black-50 text-white-0 bg-opacity-70 px-6 py-2 rounded-full text-white text-lg font-semibold">
				{`Image ${currentIndex + 1} of ${totalImages}`}
			</div>
		</div>
	)
}

export default PhotosModal
