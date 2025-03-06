import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	onClick?: () => void
	className?: string
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}

export const BaseButton: React.FC<ButtonProps> = ({
	children,
	onClick,
	className = '',
	disabled = false,
	type = 'button',
	...rest
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`focus:outline-none ${className}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	)
}
