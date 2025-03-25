import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IImage } from '@interfaces/image'
import { Icon } from '@iconify/react'
import { PhotosCaptionsModal } from '@components/atoms/modal/PhotosCaptionsModal'

interface RenderPhotosCaptionsProps {
	images: IImage[]
	layout?: 'grid' | 'masonry'
	showCount?: boolean
}

export const RenderPhotosCaptions: React.FC<RenderPhotosCaptionsProps> = ({
	images,
	layout: initialLayout = 'grid',
	showCount = true
}) => {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)
	const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [activeLayout, setActiveLayout] = useState<'grid' | 'masonry'>(
		initialLayout
	)

	// Update internal state when prop changes
	useEffect(() => {
		setActiveLayout(initialLayout)
	}, [initialLayout])

	// Track loading state for each image
	useEffect(() => {
		setImagesLoaded(new Array(images.length).fill(false))
	}, [images])

	const handleImageLoad = (index: number) => {
		setImagesLoaded((prev) => {
			const newState = [...prev]
			newState[index] = true
			return newState
		})
	}

	const openModal = (index: number) => {
		// Preload next and previous images
		const preloadIndices = [
			(index + 1) % images.length,
			(index - 1 + images.length) % images.length
		]

		preloadIndices.forEach((i) => {
			const img = new Image()
			img.src = images[i].imageUrl
		})

		setCurrentIndex(index)
		document.body.style.overflow = 'hidden' // Prevent background scrolling
	}

	const closeModal = () => {
		setCurrentIndex(null)
		document.body.style.overflow = '' // Restore scrolling
	}

	const isModalOpen = currentIndex !== null

	// Handle layout change explicitly
	const handleLayoutChange = (newLayout: 'grid' | 'masonry') => {
		if (activeLayout !== newLayout) {
			setActiveLayout(newLayout)
		}
	}

	if (!images.length) {
		return (
			<motion.div
				className="py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Icon
					icon="mdi:image-off-outline"
					className="mx-auto mb-3 text-orange-500"
					width={48}
					height={48}
				/>
				<p className="text-sm font-medium">No images available</p>
				<p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
					Images will appear here when they are added
				</p>
			</motion.div>
		)
	}

	return (
		<div ref={containerRef}>
			{/* Gallery header with controls */}
			{showCount && (
				<div className="flex justify-between items-center mb-4">
					<p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
						{images.length} {images.length === 1 ? 'image' : 'images'}
					</p>
					<div className="flex gap-2">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={`p-1.5 rounded-md ${
								activeLayout === 'grid'
									? 'bg-orange-500 text-white-0'
									: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
							}`}
							onClick={() => handleLayoutChange('grid')}
							aria-label="Grid layout"
						>
							<Icon icon="mdi:grid" width={18} height={18} />
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className={`p-1.5 rounded-md ${
								activeLayout === 'masonry'
									? 'bg-orange-500 text-white-0'
									: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
							}`}
							onClick={() => handleLayoutChange('masonry')}
							aria-label="Masonry layout"
						>
							<Icon icon="mdi:view-quilt" width={18} height={18} />
						</motion.button>
					</div>
				</div>
			)}

			{/* Images container with transition effects based on layout */}
			<div
				className={
					isModalOpen
						? 'pointer-events-none opacity-50 transition-opacity duration-300'
						: ''
				}
			>
				{/* GRID LAYOUT */}
				{activeLayout === 'grid' && (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
						{images.map((image, index) => (
							<motion.div
								key={index}
								className="aspect-square relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{
									opacity: imagesLoaded[index] ? 1 : 0.7,
									scale: imagesLoaded[index] ? 1 : 0.97
								}}
								transition={{
									duration: 0.4,
									delay: index * 0.05,
									ease: 'easeOut'
								}}
								whileHover={{ scale: 1.03 }}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								{/* Placeholder while image loads */}
								<div
									className={`absolute inset-0
									)} transition-opacity duration-300 ${
										imagesLoaded[index] ? 'opacity-0' : 'opacity-100'
									}`}
								>
									<div className="flex items-center justify-center h-full">
										<Icon
											icon="mdi:image-outline"
											className="text-white-0 opacity-50"
											width={32}
											height={32}
										/>
									</div>
								</div>

								{/* Actual image */}
								<img
									src={image.imageUrl}
									alt={image.caption || `Image ${index + 1}`}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									onLoad={() => handleImageLoad(index)}
									loading="lazy"
								/>

								{/* Caption overlay */}
								{image.caption && (
									<motion.div
										className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white-0 p-2.5 text-sm"
										initial={{ y: 60 }}
										animate={{
											y:
												hoveredIndex === index
													? 0
													: image.caption.length > 0
													? 60
													: 0
										}}
										transition={{ duration: 0.3 }}
									>
										{image.caption}
									</motion.div>
								)}

								{/* Interaction overlay */}
								<motion.div
									className="absolute inset-0 flex items-center justify-center bg-black"
									initial={{ opacity: 0 }}
									animate={{ opacity: hoveredIndex === index ? 0.4 : 0 }}
									transition={{ duration: 0.3 }}
								>
									<motion.button
										onClick={() => openModal(index)}
										className="p-3 bg-orange-500 text-white-0 rounded-full shadow-lg transform transition-all duration-300"
										initial={{ scale: 0.7, opacity: 0 }}
										animate={{
											scale: hoveredIndex === index ? 1 : 0.7,
											opacity: hoveredIndex === index ? 1 : 0
										}}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										aria-label="View image"
									>
										<Icon icon="mdi:magnify-plus" width={24} height={24} />
									</motion.button>
								</motion.div>
							</motion.div>
						))}
					</div>
				)}

				{/* MASONRY LAYOUT - FIXED */}
				{activeLayout === 'masonry' && (
					<div className="masonry-container">
						<style>{`
							.masonry-container {
								column-count: 2;
								column-gap: 0.75rem;
							}

							@media (min-width: 640px) {
								.masonry-container {
									column-count: 3;
									column-gap: 1rem;
								}
							}

							@media (min-width: 768px) {
								.masonry-container {
									column-count: 4;
									column-gap: 1.25rem;
								}
							}

							.masonry-item {
								display: inline-block;
								width: 100%;
								margin-bottom: 0.75rem;
								break-inside: avoid;
							}
						`}</style>

						{images.map((image, index) => {
							// Generate heights that vary but still look good
							// We'll create a deterministic height factor based on the index
							const heightFactor = 0.8 + (index % 5) * 0.2 // Varies from 0.8 to 1.8

							return (
								<div key={index} className="masonry-item">
									<motion.div
										className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md"
										initial={{ opacity: 0, y: 20 }}
										animate={{
											opacity: imagesLoaded[index] ? 1 : 0.7,
											y: imagesLoaded[index] ? 0 : 10
										}}
										transition={{
											duration: 0.4,
											delay: index * 0.05
										}}
										whileHover={{ scale: 1.01 }}
										onMouseEnter={() => setHoveredIndex(index)}
										onMouseLeave={() => setHoveredIndex(null)}
									>
										{/* Image */}
										<div
											className="relative"
											style={{ paddingBottom: `${heightFactor * 100}%` }}
										>
											<img
												src={image.imageUrl}
												alt={image.caption || `Image ${index + 1}`}
												className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
												onLoad={() => handleImageLoad(index)}
												loading="lazy"
											/>
										</div>

										{/* Caption overlay */}
										{image.caption && (
											<motion.div
												className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white-0 p-2.5 text-sm"
												initial={{ y: 60 }}
												animate={{
													y:
														hoveredIndex === index
															? 0
															: image.caption.length > 0
															? 60
															: 0
												}}
												transition={{ duration: 0.3 }}
											>
												{image.caption}
											</motion.div>
										)}

										{/* Interaction overlay */}
										<motion.div
											className="absolute inset-0 flex items-center justify-center bg-black"
											initial={{ opacity: 0 }}
											animate={{ opacity: hoveredIndex === index ? 0.4 : 0 }}
											transition={{ duration: 0.3 }}
											onClick={() => openModal(index)}
										>
											<motion.button
												className="p-3 bg-orange-500 text-white-0 rounded-full shadow-lg transform transition-all duration-300"
												initial={{ scale: 0.7, opacity: 0 }}
												animate={{
													scale: hoveredIndex === index ? 1 : 0.7,
													opacity: hoveredIndex === index ? 1 : 0
												}}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												aria-label="View image"
											>
												<Icon icon="mdi:magnify-plus" width={24} height={24} />
											</motion.button>
										</motion.div>
									</motion.div>
								</div>
							)
						})}
					</div>
				)}
			</div>

			{/* Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<PhotosCaptionsModal
						images={images}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
						onClose={closeModal}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
