// src/screens/budget/components/ActionIcon.tsx
import { Icon } from '@iconify/react'

interface ActionIconProps {
	entityName: string
	entityId: string
	className?: string
}

export const ActionIcon: React.FC<ActionIconProps> = ({
	entityName,
	entityId,
	className = ''
}) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		console.log(`${entityName}`, `_id: ${entityId}`)
	}

	return (
		<div
			className={`opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${className}`}
			onClick={handleClick}
		>
			<Icon
				icon="mdi:dots-vertical"
				width={20}
				height={20}
				className="text-gray-400 hover:text-gray-200"
			/>
		</div>
	)
}
