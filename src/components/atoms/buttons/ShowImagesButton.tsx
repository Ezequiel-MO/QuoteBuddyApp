import React from 'react'

interface ShowImagesButtonProps {
	name: boolean
	setOpen: (open: boolean) => void
	nameValue?: string
	children?: React.ReactNode
}

export const ShowImagesButton: React.FC<ShowImagesButtonProps> = ({
	name,
	setOpen,
	nameValue,
	children
}) => {
	if (!name) return null

	return (
		<div>
			<input
				onClick={() => setOpen(true)}
				type="button"
				className="m-2 cursor-pointer py-1 px-6 bg-gradient-to-r from-orange-800 to-orange-500 text-white font-bold uppercase rounded-lg hover:from-green-500 hover:to-blue-600"
				value={nameValue ? nameValue : 'Show images'}
			/>

			{children}
		</div>
	)
}
