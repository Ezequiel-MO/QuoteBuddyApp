import { Icon } from '@iconify/react'

type ButtonProps = {
	handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	icon: string
	type?: 'button' | 'submit' | 'reset'
	children: React.ReactNode
	newClass?: string
	widthIcon?: number
}

export const Button = ({
	handleClick,
	icon = '',
	type,
	children,
	newClass,
	widthIcon
}: ButtonProps) => {
	const classButton =
		'flex items-center uppercase mx-2 px-6 py-3 text-white-0 bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

	return (
		<button
			type={type}
			onClick={(e) => {
				if (handleClick) {
					handleClick(e)
				}
			}}
			className={!newClass ? classButton : newClass}
		>
			<Icon icon={icon} width={widthIcon || 50} />
			<span className="ml-2">{children}</span>
		</button>
	)
}
