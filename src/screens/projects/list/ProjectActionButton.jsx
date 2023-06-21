import { Icon } from '@iconify/react'

export const ProjectActionButton = ({ action, handleClick }) => {
	const buttonStyles =
		'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-xl inline-flex items-center'
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
