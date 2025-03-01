import { ImageTile } from '@components/atoms/images/ImageTile'
import PhotosModal from '@components/atoms/modal/PhotosModal'
import React, { useState } from 'react'

interface RenderPhotosProps {
	images: string[]
}

const RenderPhotos: React.FC<RenderPhotosProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)
	console.log('P==>>', images)
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
								imageSrc={image}
								alt={`Image ${index + 1}`}
								onClick={() => openModal(index)}
							/>
						))}
					</div>
				</div>
			</div>

			{isModalOpen && (
				<PhotosModal
					images={images}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
					onClose={closeModal}
				/>
			)}
		</div>
	)
}

export default RenderPhotos
