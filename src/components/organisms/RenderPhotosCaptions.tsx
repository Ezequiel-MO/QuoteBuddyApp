import { ImageTile } from '@components/atoms/images/ImageTile'
import { PhotosCaptionsModal } from '@components/atoms/modal/PhotosCaptionsModal'
import React, { useState } from 'react'
import { IImage } from '@interfaces/image'
import { Icon } from '@iconify/react'

interface RenderPhotosCaptionsProps {
	images: IImage[]
}

export const RenderPhotosCaptions: React.FC<RenderPhotosCaptionsProps> = ({
	images
}) => {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)

	const openModal = (index: number) => {
		setCurrentIndex(index)
	}

	const closeModal = () => {
		setCurrentIndex(null)
	}

	const isModalOpen = currentIndex !== null

	if (!images.length) {
		return (
			<div className="py-4 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
				<Icon
					icon="mdi:image-off-outline"
					className="mx-auto mb-2 text-orange-500"
					width={24}
					height={24}
				/>
				<p className="text-sm font-medium">No images available</p>
			</div>
		)
	}

	return (
		<div>
			{/* Wrap the content in a way that doesn't cause layout shift when modal opens */}
			<div
				className={
					isModalOpen
						? 'pointer-events-none opacity-50 transition-opacity duration-300'
						: ''
				}
			>
				<div className="w-full">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
						{images.map((image, index) => (
							<div
								key={index}
								className="aspect-square relative group overflow-hidden rounded-lg hover:shadow-md transition-all duration-300"
							>
								<ImageTile
									imageSrc={image.imageUrl}
									alt={`Image ${index + 1}`}
									onClick={() => openModal(index)}
									isCaption={image.caption.length > 0}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{image.caption && (
									<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white-0 p-2 text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										{image.caption}
									</div>
								)}
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
									<button
										onClick={() => openModal(index)}
										className="p-2 bg-orange-500 text-white rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
										aria-label="View image"
									>
										<Icon icon="mdi:magnify-plus" width={20} height={20} />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{isModalOpen && (
				<PhotosCaptionsModal
					images={images}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					onClose={closeModal}
				/>
			)}
		</div>
	)
}
