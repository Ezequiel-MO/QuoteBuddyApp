import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface DestinationGalleryProps {
	images: string[] | []
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({
	images
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [imageIndex, setImageIndex] = useState<number>(0)

	// Open lightbox with selected image
	const openLightbox = (image: string, index: number) => {
		setSelectedImage(image)
		setImageIndex(index)
	}

	// Close lightbox
	const closeLightbox = () => {
		setSelectedImage(null)
	}

	// Navigate to next image
	const nextImage = () => {
		if (images.length <= 1) return
		setImageIndex((prevIndex) => (prevIndex + 1) % images.length)
		setSelectedImage(images[(imageIndex + 1) % images.length])
	}

	// Navigate to previous image
	const prevImage = () => {
		if (images.length <= 1) return
		setImageIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		)
		setSelectedImage(images[(imageIndex - 1 + images.length) % images.length])
	}

	// Handle keyboard navigation
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!selectedImage) return

			if (e.key === 'Escape') {
				closeLightbox()
			} else if (e.key === 'ArrowRight') {
				nextImage()
			} else if (e.key === 'ArrowLeft') {
				prevImage()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [selectedImage, imageIndex])

	return (
		<div className="w-full">
			{/* Section Header */}
			<div className="bg-gradient-to-r from-indigo-500 to-slate-600 text-white p-6">
				<div className="container mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold flex items-center">
						<Icon icon="mdi:image-multiple-outline" className="w-8 h-8 mr-3" />
						<span>Destination Gallery</span>
					</h2>
				</div>
			</div>

			{/* Gallery Content */}
			<div className="p-6 md:p-8">
				{images.length > 0 ? (
					<>
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							{images.map((image, index) => (
								<motion.div
									key={index}
									className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: index * 0.05 }}
									onClick={() => openLightbox(image, index)}
									whileHover={{ scale: 1.03 }}
								>
									<img
										src={image}
										alt={`destination gallery image ${index + 1}`}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
									<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="bg-white/80 dark:bg-black/60 rounded-full p-3">
											<Icon
												icon="mdi:magnify-plus"
												className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
											/>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>

						{/* Image count indicator */}
						<div className="mt-6 text-center text-gray-500 dark:text-gray-400">
							{images.length} {images.length === 1 ? 'image' : 'images'}{' '}
							available
						</div>
					</>
				) : (
					<div className="text-center py-10">
						<Icon
							icon="mdi:image-off"
							className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
						/>
						<p className="text-gray-500 dark:text-gray-400">
							No images available for this destination.
						</p>
					</div>
				)}
			</div>

			{/* Lightbox */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeLightbox}
					>
						{/* Close button */}
						<button
							className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10 transition-colors"
							onClick={(e) => {
								e.stopPropagation()
								closeLightbox()
							}}
							aria-label="Close lightbox"
						>
							<Icon icon="mdi:close" className="w-6 h-6" />
						</button>

						{/* Navigation buttons */}
						{images.length > 1 && (
							<>
								<button
									className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10 transition-colors"
									onClick={(e) => {
										e.stopPropagation()
										prevImage()
									}}
									aria-label="Previous image"
								>
									<Icon icon="mdi:chevron-left" className="w-8 h-8" />
								</button>

								<button
									className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10 transition-colors"
									onClick={(e) => {
										e.stopPropagation()
										nextImage()
									}}
									aria-label="Next image"
								>
									<Icon icon="mdi:chevron-right" className="w-8 h-8" />
								</button>
							</>
						)}

						{/* Image counter */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
							{imageIndex + 1} / {images.length}
						</div>

						{/* Image */}
						<motion.div
							className="relative max-w-full max-h-full"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={selectedImage}
								alt="destination"
								className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default DestinationGallery
