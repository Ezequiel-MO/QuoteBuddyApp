import React from 'react'

interface LogoProps {
	imageUrl?: string | null
	hasExternalCorporateImage: boolean
}

export const Logo: React.FC<LogoProps> = ({
	imageUrl = null,
	hasExternalCorporateImage
}) => {
	const className = hasExternalCorporateImage
		? 'object-cover object-left w-full h-auto md:h-36 absolute -top-4 left-0 z-50'
		: 'object-cover h-6'

	return (
		<div className="z-50 w-full px-6 py-8 md:py-10 md:w-1/2">
			<img
				alt="front-end header"
				className={className}
				src={imageUrl || undefined}
			/>
		</div>
	)
}
