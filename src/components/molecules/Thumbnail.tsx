import { Icon } from '@iconify/react'
import React, { ChangeEvent, useEffect } from 'react'
import { logger } from 'src/helper/debugging/logger'

interface ThumbnailProps {
	imageSrc?: string
	onImageUpload?: (file: File) => void
	isLoading?: boolean
	onDelete?: () => void
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	imageSrc,
	onImageUpload,
	isLoading = false,
	onDelete
}) => {
	logger.info('Thumbnail', imageSrc)

	const [isPDF, setIsPDF] = React.useState(false)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0] && onImageUpload) {
			onImageUpload(e.target.files[0])
		}
	}

	useEffect(() => {
		if (imageSrc) {
			if (imageSrc.endsWith('.pdf')) {
				setIsPDF(true)
			}
		}
	}, [imageSrc])

	return (
		<div
			className={`relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center ${
				isPDF ? undefined : 'cursor-pointer'
			} hover:border-orange-500 transition-colors duration-200`}
		>
			{isLoading ? (
				<Icon icon="line-md:loading-loop" width={24} height={24} />
			) : imageSrc ? (
				<div className="relative w-full h-full">
					{isPDF ? (
						<div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-lg">
							<Icon
								icon="mdi:file-pdf-box"
								color="#d32f2f"
								width={40}
								height={40}
							/>
							<span className="mt-1 text-sm font-semibold text-gray-700">
								BUDGET LOADED
							</span>
						</div>
					) : (
						<img
							src={imageSrc}
							alt="thumbnail"
							className="object-cover w-full h-full rounded-lg"
						/>
					)}
					{onDelete && (
						<button
							type="button"
							className="absolute top-1 right-1 text-white bg-red-600 rounded-full p-1 no-drag"
							onClick={onDelete}
						>
							<Icon icon="mdi:delete" width={20} height={20} />
						</button>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center text-gray-500">
					<label
						htmlFor="imageUpload"
						className="cursor-pointer flex flex-col items-center"
					>
						<svg
							className="w-12 h-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 16v4h16v-4M16 8l-4 4m0 0l-4-4m4 4V4"
							></path>
						</svg>
						<span className="mt-2 text-sm">Upload</span>
					</label>
					<input
						id="imageUpload"
						type="file"
						accept="image/*,application/pdf"
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>
			)}
		</div>
	)
}

export default Thumbnail
