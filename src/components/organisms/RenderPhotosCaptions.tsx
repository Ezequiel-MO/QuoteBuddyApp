import { ImageTile } from '@components/atoms/images/ImageTile'
// import PhotosModal from '@components/atoms/modal/PhotosModal'
import { PhotosCaptionsModal } from '@components/atoms/modal/PhotosCaptionsModal'
import React, { useState } from 'react'
import { IImage } from '@interfaces/image'

interface RenderPhotosCaptionsProps {
	images: IImage[]
}

export const RenderPhotosCaptions: React.FC<RenderPhotosCaptionsProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)

	const openModal = (index: number) => {
		setCurrentIndex(index)
	}

	const closeModal = () => {
		setCurrentIndex(null)
	}

	const isModalOpen = currentIndex !== null

	return (
		<div>
			{/* Wrap the content to apply blur when modal is open */}
			<div className={isModalOpen ? 'filter blur' : ''}>
				{/* Rest of your app content */}
				<div className="w-full px-4">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<ImageTile
								key={index}
								imageSrc={image.imageUrl}
								alt={`Image ${index + 1}`}
								onClick={() => openModal(index)}
								isCaption={image.caption.length > 0}
							/>
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
