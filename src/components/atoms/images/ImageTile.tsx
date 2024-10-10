import React from 'react'

interface ImageTileProps {
	imageSrc: string
	alt: string
	onClick: () => void
}

export const ImageTile: React.FC<ImageTileProps> = ({
	imageSrc,
	alt,
	onClick
}) => (
	<div
		className="relative w-full pt-[100%] cursor-pointer overflow-hidden bg-gray-200"
		onClick={onClick}
	>
		<img
			src={imageSrc}
			alt={alt}
			className="absolute top-0 left-0 w-full h-full object-cover"
		/>
	</div>
)
