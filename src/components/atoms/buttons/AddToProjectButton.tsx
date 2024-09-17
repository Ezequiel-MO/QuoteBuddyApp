import { Icon } from '@iconify/react'

interface AddToProjectButtonProps {
	canBeAddedToProject: boolean
	onAdd: () => void
}

export const AddToProjectButton: React.FC<AddToProjectButtonProps> = ({
	canBeAddedToProject,
	onAdd
}) => {
	if (!canBeAddedToProject) {
		return null
	}

	return (
		<td
			data-testid="add-to-project-button"
			className="cursor-pointer flex flex-row items-center"
			onClick={onAdd}
		>
			<Icon icon="gg:insert-after-o" color="#ea5933" width="30" />
			<span>Add to Project</span>
		</td>
	)
}
