import { FC, MouseEvent, useState } from 'react'
import { Icon } from '@iconify/react'

interface EyeIconDetailProps {
	handleClick: (e: MouseEvent<HTMLElement>) => void
	eye?: boolean
	isDragging?: boolean
}

export const EyeIconDetail: FC<EyeIconDetailProps> = ({
	handleClick,
	eye = true,
	isDragging
}) => {
	const [isHovered, setIsHovered] = useState(false)

	if (isDragging) return null

	return (
		<button
			className={`
				inline-flex items-center justify-center p-1.5 rounded-full
				${
					isHovered
						? 'bg-cyan-600 text-white-0 scale-110'
						: 'bg-gray-700/40 text-cyan-400 hover:bg-cyan-600/70 hover:text-white-0'
				}
				transition-all duration-200 ease-in-out
			`}
			type="button"
			onClick={(e) => {
				e.stopPropagation()
				handleClick(e)
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			aria-label="View details"
			title="View details"
		>
			{eye ? (
				<Icon icon="mdi:eye-outline" className="w-4 h-4" />
			) : (
				<span className="text-xs font-medium">Edit</span>
			)}
		</button>
	)
}
