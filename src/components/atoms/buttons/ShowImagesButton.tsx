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
				className="mr-2 cursor-pointer py-2 px-10 bg-gradient-to-r from-orange-800 to-orange-500 text-white-0 font-bold uppercase rounded-lg hover:from-green-500 hover:to-blue-600 active:from-green-600 active:to-blue-700"
				value={nameValue ? nameValue : 'Show images'}
			/>

			{children}
		</div>
	)
}
