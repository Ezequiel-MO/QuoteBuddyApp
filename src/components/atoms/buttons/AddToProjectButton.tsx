import { FC, useState } from 'react'
import { Icon } from '@iconify/react'

interface AddToProjectButtonProps {
	onAddToProject: () => Promise<void> | void
}

export const AddToProjectButton: FC<AddToProjectButtonProps> = ({
	onAddToProject
}) => {
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		try {
			await onAddToProject()
		} finally {
			setLoading(false)
		}
	}

	return (
		<td
			data-testid="add-to-project-button"
			className="cursor-pointer flex items-center space-x-2 p-2 mt-1 rounded-sm bg-teal-900 text-white-0 hover:bg-green-600"
			onClick={handleClick}
		>
			<Icon icon="gg:insert-after-o" width="30" />
			<span>{loading ? 'Adding...' : 'Add to Project'}</span>
		</td>
	)
}
