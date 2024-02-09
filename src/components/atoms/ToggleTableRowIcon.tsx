import React from 'react'
import { Icon } from '@iconify/react'

interface Props {
	isOpen: boolean
	toggle: () => void
}

export const ToggleTableRowIcon: React.FC<Props> = ({ isOpen, toggle }) => {
	return (
		<td
			onClick={toggle}
			className="cursor-pointer flex justify-center items-center py-2 lg:py-4"
		>
			<Icon
				icon={isOpen ? 'typcn:minus' : 'typcn:plus'}
				width="25"
				height="25"
				className="text-gray-400 hover:text-gray-200"
			/>
		</td>
	)
}
