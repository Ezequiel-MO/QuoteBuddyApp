import { FC, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '../../../../../../components/atoms'

interface EyeIconDetailProps {
	handleClick: (e: MouseEvent<HTMLSpanElement>) => void
	eye?: boolean
	isDragging?: boolean
}

export const EyeIconDetail: FC<EyeIconDetailProps> = ({
	handleClick,
	eye = true,
	isDragging
}) => {
	if (isDragging) return null

	return (
		<Button
			icon=""
			newClass="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-600/50 text-cyan-400 hover:text-cyan-300 transition-all duration-200 ease-in-out"
			type="button"
			handleClick={(e) => {
				e.stopPropagation()
				handleClick(e)
			}}
			title="View details"
		>
			{eye ? (
				<Icon icon="mdi:eye-outline" className="w-5 h-5" />
			) : (
				<span className="text-sm font-medium">Edit Details</span>
			)}
		</Button>
	)
}
