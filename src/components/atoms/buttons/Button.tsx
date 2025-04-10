import { Icon } from '@iconify/react'
import React from 'react'

/**
 * Props interface for the Button component
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Click handler function */
	handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	/** Icon name from Iconify */
	icon?: string
	/** Button text content */
	children: React.ReactNode
	/** Custom class name to override default styling */
	className?: string
	/** Width of the icon in pixels */
	widthIcon?: number
	/** Additional props are automatically passed to the button element */
}

/**
 * Button component used throughout the application
 * Provides consistent styling with optional icon integration
 */
export const Button: React.FC<ButtonProps> = ({
	handleClick,
	icon = '',
	type = 'button',
	children,
	className,
	widthIcon = 24,
	disabled = false,
	...rest
}) => {
	// Default button styling
	const defaultClassName =
		'flex items-center uppercase mx-2 px-6 py-3 text-white-0 bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

	// Maintain backward compatibility with newClass prop
	const newClass = (rest as any).newClass
	const finalClassName = className || newClass || defaultClassName

	// Remove newClass from rest props to avoid HTML validation warnings
	if ((rest as any).newClass) {
		const { newClass, ...cleanRest } = rest as any
		rest = cleanRest
	}

	return (
		<button
			type={type}
			onClick={handleClick}
			className={finalClassName}
			disabled={disabled}
			aria-disabled={disabled}
			{...rest}
		>
			{icon && <Icon icon={icon} width={widthIcon} aria-hidden="true" />}
			<span className={icon ? 'ml-2' : ''}>{children}</span>
		</button>
	)
}
