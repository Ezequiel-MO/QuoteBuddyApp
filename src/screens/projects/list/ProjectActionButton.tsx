import { Icon } from '@iconify/react'

interface Props {
	action: 'new' | 'clear'
	handleClick: () => void
}

export const ProjectActionButton = ({ action, handleClick }: Props) => {
	const buttonStyles =
		'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-md inline-flex items-center'
	const buttonText = action === 'new' ? 'NEW PROJECT' : 'CLEAR PROJECT'
	const buttonIcon =
		action === 'new' ? 'icons8:create-new' : 'mdi:clear-box-outline'

	return (
		<button onClick={handleClick} className={buttonStyles}>
			<Icon icon={buttonIcon} />
			<span>{buttonText}</span>
		</button>
	)
}
