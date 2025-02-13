import { Icon } from '@iconify/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { logger } from 'src/helper/debugging/logger'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'

interface ThumbnailProps {
	imageSrc?: string
	onImageUpload?: (file: File) => void
	isLoading?: boolean
	onDelete?: () => void
	isMultiple?: boolean
	maxFiles?: number
	isExpanded?: boolean
	onToggleExpand?: () => void
	isCaption?: boolean
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	imageSrc,
	onImageUpload,
	isLoading = false,
	onDelete,
	isMultiple = false,
	maxFiles,
	isExpanded,
	onToggleExpand,
	isCaption = false
}) => {
	const [isPDF, setIsPDF] = useState<boolean>(false)

	useEffect(() => {
		if (imageSrc) {
			setIsPDF(imageSrc.endsWith('.pdf'))
		}
	}, [imageSrc])

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (maxFiles && e.target.files && maxFiles < e.target.files.length) {
			return errorSweetalert(
				'Error',
				`You exceeded the maximum number of images allowed!`
			)
		}
		if (e.target.files && e.target.files.length > 0 && onImageUpload) {
			for (let i = 0; i < e.target.files.length; i++) {
				onImageUpload(e.target.files[i])
			}
		}
	}

	const handleGoogleLens = (e: React.MouseEvent) => {
		e.stopPropagation() // Prevent interference with drag-and-drop
		logger.info('Google Lens button clicked')
		if (imageSrc) {
			const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(
				imageSrc
			)}`
			const newWindow = window.open(
				lensUrl,
				'googleLensWindow',
				'width=600,height=600'
			)

			if (newWindow) {
				const x = window.screen.width - 600
				const y = 0
				newWindow.moveTo(x, y)
			} else {
				alert('Please allow popups for this site to use Google Lens.')
			}
		}
	}

	return (
		<>
			{isExpanded ? (
				<div
					className="fixed inset-0 bg-gray-900 bg-opacity-75 z-[999] flex justify-center items-center transition-all duration-300"
					onClick={onToggleExpand}
				>
					<div
						className="relative max-w-full max-h-full flex justify-center items-center"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the image
					>
						<img
							src={imageSrc}
							alt="Expanded thumbnail"
							className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg transition-transform duration-300 scale-100"
						/>
						<button
							type="button"
							className="no-drag absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 z-[1000] hover:bg-red-700"
							onClick={(e) => {
								e.stopPropagation()
								onToggleExpand && onToggleExpand()
							}}
						>
							<Icon icon="mdi:close" width={24} height={24} />
						</button>
					</div>
				</div>
			) : (
				<div
					className={`relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center ${isPDF ? '' : imageSrc ? 'cursor-pointer' : ''
						} hover:border-orange-500 transition-colors duration-200`}
					onClick={(e) => {
						// Only prevent default and toggle expand if an image exists
						if (imageSrc) {
							e.preventDefault()
							onToggleExpand && onToggleExpand()
						}
						// If no image, do not prevent default. The click will allow the label to trigger file input.
					}}
				>
					{isLoading ? (
						<Icon icon="line-md:loading-loop" width={24} height={24} />
					) : imageSrc ? (
						<div className="relative w-full h-full">
							<img
								src={imageSrc}
								alt="thumbnail"
								className="object-cover w-full h-full rounded-lg"
							/>
							{onDelete && (
								<button
									type="button"
									className="absolute top-1 right-1 text-white bg-red-600 rounded-full p-1 no-drag"
									onClick={(e) => {
										e.stopPropagation() // Prevent triggering expansion
										onDelete()
									}}
								>
									<Icon icon="mdi:delete" width={20} height={20} />
								</button>
							)}
							<div style={{ pointerEvents: 'auto' }}>
								<button
									type="button"
									className="absolute top-1 left-1 hover:bg-cyan-500 bg-opacity-60 text-white text-sm rounded px-2 py-1 no-drag"
									onClick={handleGoogleLens}
								>
									<Icon icon="simple-icons:googlelens" width={20} height={20} />
								</button>
							</div>
							{
								isCaption && 
								<span className="absolute bottom-1 left-1 hover:bg-cyan-500 hover:bg-opacity-80 text-white-0 rounded px-1 py-1 no-drag">
									<Icon icon="famicons:text-sharp" width={20} height={20} />
								</span>
							}
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
								multiple={isMultiple}
								className="hidden"
								onChange={handleImageChange}
							/>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Thumbnail
