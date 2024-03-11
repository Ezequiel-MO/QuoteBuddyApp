import { useCallback, useMemo, useState } from 'react'
import { ImageTile } from '@components/atoms/images/ImageTile'
import PhotosModal from '@components/atoms/modal/PhotosModal'

interface RenderPhotosProps {
	images: string[]
}

const RenderPhotos = ({ images }: RenderPhotosProps) => {
	const [currentImage, setCurrentImage] = useState<string | null>(null)
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)

	const handleImageClick = useCallback((image: string, index: number): void => {
		setCurrentImage(image)
		setCurrentIndex(index)
	}, [])

	const handleRotationRight = useCallback((): void => {
		if (currentIndex !== null) {
			const nextIndex = (currentIndex + 1) % images.length
			setCurrentImage(images[nextIndex])
			setCurrentIndex(nextIndex)
		}
	}, [currentIndex, images])

	const handleRotationLeft = useCallback(() => {
		if (currentIndex !== null) {
			const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
			setCurrentImage(images[prevIndex])
			setCurrentIndex(prevIndex)
		}
	}, [currentIndex, images])

	const imageTiles = useMemo(() => {
		return images.map((image, index) => (
			<ImageTile
				key={`${image}-${index}`}
				imageSrc={image}
				alt={`${image}-${index}`}
				onClick={() => handleImageClick(image, index)}
			/>
		))
	}, [images, handleImageClick])

	return (
		<div className="flex justify-center w-full">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-10">
				{imageTiles}
			</div>

			{currentImage && (
				<PhotosModal
					clickedImg={currentImage}
					setClickedImg={setCurrentImage}
					handleRotationLeft={handleRotationLeft}
					handleRotationRight={handleRotationRight}
				/>
			)}
		</div>
	)
}

export default RenderPhotos
