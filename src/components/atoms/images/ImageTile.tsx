import React, { useState } from 'react'
import { Icon } from '@iconify/react'

interface ImageTileProps {
	imageSrc: string
	alt: string
	onClick: () => void
	isCaption?: boolean
	className?: string
}

export const ImageTile: React.FC<ImageTileProps> = ({
	imageSrc,
	alt,
	onClick,
	isCaption,
	className = ''
}) => {
	const [imageLoaded, setImageLoaded] = useState(false)
	const [imageError, setImageError] = useState(false)

	return (
		<div
			className={`relative w-full h-full cursor-pointer overflow-hidden ${className}`}
			onClick={onClick}
			role="button"
			aria-label={`View ${alt}`}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick()
				}
			}}
		>
			{/* Loading state */}
			{!imageLoaded && !imageError && (
				<div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
					<Icon
						icon="mdi:image-outline"
						className="text-gray-400 dark:text-gray-500"
						width={32}
						height={32}
					/>
				</div>
			)}

			{/* Error state */}
			{imageError && (
				<div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-2 text-center">
					<Icon
						icon="mdi:image-broken"
						className="text-gray-500 dark:text-gray-400 mb-2"
						width={32}
						height={32}
					/>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						Failed to load image
					</span>
				</div>
			)}

			{/* Image */}
			<img
				src={imageSrc}
				alt={alt}
				className={`w-full h-full object-cover transition-all duration-700 ${
					imageLoaded ? 'opacity-100' : 'opacity-0'
				}`}
				onLoad={() => setImageLoaded(true)}
				onError={(e) => {
					console.error('Failed to load image:', imageSrc)
					setImageError(true)
					setImageLoaded(true)
				}}
			/>

			{/* Caption indicator */}
			{isCaption && (
				<div className="absolute bottom-2 left-2 z-10">
					<span className="inline-flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full shadow-md transition-transform duration-300 hover:scale-110">
						<Icon
							icon="mdi:text"
							width={16}
							height={16}
							className="text-white"
						/>
					</span>
				</div>
			)}

			{/* Overlay effect on hover */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
		</div>
	)
}
