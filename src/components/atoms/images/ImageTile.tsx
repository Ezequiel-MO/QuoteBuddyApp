import React from 'react'
import { Icon } from '@iconify/react'

interface ImageTileProps {
	imageSrc: string
	alt: string
	onClick: () => void
	isCaption?: boolean
}

export const ImageTile: React.FC<ImageTileProps> = ({
	imageSrc,
	alt,
	onClick,
	isCaption
}) => (
	<div
		className="relative w-full pt-[100%] cursor-pointer overflow-hidden"
		onClick={onClick}
	>
		<img
			src={imageSrc}
			alt={alt}
			className="absolute top-0 left-0 w-full h-full object-cover"
		/>
		{
			isCaption &&
			<span className="absolute bottom-2 left-2 inline-flex  px-2 py-1 text-white-0  rounded bg-opacity-80 hover:bg-cyan-500 transition">
				<Icon icon="famicons:text-sharp" width={20} height={20} className="text-white" />
			</span>
		}
	</div>
)
