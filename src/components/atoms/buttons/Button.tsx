import { Icon } from '@iconify/react'

type ButtonProps = {
	handleClick?: () => void
	icon: string
	type?: 'button' | 'submit' | 'reset'
	children: React.ReactNode
}

export const Button = ({ handleClick, icon, type, children }: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={handleClick}
			className="focus:scale-110 hover:animate-pulse bg-black-50 hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
		>
			<Icon icon={icon} width={50} />
			<span>{children}</span>
		</button>
	)
}
