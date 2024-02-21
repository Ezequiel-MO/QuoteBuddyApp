import React from 'react'

interface PhotosModalProps {
	clickedImg: string
	setClickedImg: (img: string | null) => void
	handleRotationLeft: () => void
	handleRotationRight: () => void
}

const PhotosModal: React.FC<PhotosModalProps> = ({
	clickedImg,
	setClickedImg,
	handleRotationLeft,
	handleRotationRight
}) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (
			e.target instanceof HTMLElement &&
			e.target.classList.contains('dismiss')
		) {
			setClickedImg(null)
		}
	}

	return (
		<div
			className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4 dismiss"
			onClick={handleClick}
		>
			<div className="relative max-w-full max-h-full overflow-auto">
				<img
					src={clickedImg}
					alt="Enlarged pic"
					className="block max-w-full max-h-full mx-auto"
				/>
				<span className="absolute top-0 right-0 p-4 text-white cursor-pointer dismiss">
					X
				</span>
				<div
					className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
					onClick={handleRotationLeft}
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 cursor-pointer"
							viewBox="0 0 20 20"
							fill="#ea5933"
						>
							<path
								fillRule="evenodd"
								d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
				<div
					className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
					onClick={handleRotationRight}
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 cursor-pointer"
							viewBox="0 0 20 20"
							fill="#ea5933"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PhotosModal
