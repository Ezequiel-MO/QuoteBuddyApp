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
	icon,
	type,
	children,
	newClass,
	widthIcon
}: ButtonProps) => {
	const classButton =
		'focus:scale-110 hover:animate-pulse bg-black-50 hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'

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
			<Icon icon={icon} width={widthIcon || 50}/>
			<span>{children}</span>
		</button>
	)
}
