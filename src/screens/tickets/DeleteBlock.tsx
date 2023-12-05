import { Icon } from '@iconify/react'

interface Props {
	id: string
	onDelete: (id: string) => Promise<void>
}

const DeleteBlock = ({ id, onDelete }: Props) => {
	const handleClick = () => {
		onDelete(id)
	}

	return (
		<Icon
			icon="typcn:delete-outline"
			width={25}
			className="text-red-400 hover:cursor-pointer hover:text-red-200"
			onClick={handleClick}
		/>
	)
}

export default DeleteBlock
