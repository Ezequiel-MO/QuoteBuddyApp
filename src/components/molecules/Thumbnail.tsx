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
}

const Thumbnail: React.FC<ThumbnailProps> = ({
	imageSrc,
	onImageUpload,
	isLoading = false,
	isMultiple = false,
	maxFiles,
	onDelete
}) => {
	/* logger.info('Thumbnail', imageSrc) */

	const [isPDF, setIsPDF] = useState<boolean>(false)

	useEffect(() => {
		if (imageSrc) {
			if (imageSrc.endsWith('.pdf')) {
				setIsPDF(true)
			} else {
				setIsPDF(false)
			}
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

	const handleGoogleLens = () => {
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
		<div
			className={`relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center ${
				isPDF ? undefined : 'cursor-pointer'
			} hover:border-orange-500 transition-colors duration-200`}
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
							className="absolute top-1 right-1 text-white-0 bg-red-600 rounded-full p-1 no-drag"
							onClick={onDelete}
						>
							<Icon icon="mdi:delete" width={20} height={20} />
						</button>
					)}

					<div style={{ pointerEvents: 'auto' }}>
						<button
							type="button"
							className="absolute top-1 left-1 hover:bg-cyan-500 bg-opacity-60 text-white-0 text-sm rounded px-2 py-1 no-drag"
							onClick={(e) => {
								e.stopPropagation()
								handleGoogleLens()
							}}
						>
							<Icon icon="simple-icons:googlelens" width={20} height={20} />
						</button>
					</div>
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
	)
}

export default Thumbnail
