import { Icon } from '@iconify/react'
import React from 'react'

/**
 * Available button variants for consistent styling
 */
export type ButtonVariant =
	| 'primary' // Main action buttons
	| 'secondary' // Less important actions
	| 'danger' // Destructive actions (delete, remove)
	| 'success' // Positive actions (save, confirm)
	| 'create' // For creating new items
	| 'icon' // Icon-only buttons
	| 'ghost' // Minimal styling, often used in tables
	| 'itinerary' // Add to itinerary button style
	| 'project' // Add to project button style
	| 'custom' // For fully custom styling

/**
 * Props interface for the Button component
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Click handler function */
	handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	/** Icon name from Iconify */
	icon?: string
	/** Button text content */
	children?: React.ReactNode
	/** Custom class name to override default styling */
	className?: string
	/** Width of the icon in pixels */
	widthIcon?: number
	/** Button style variant */
	variant?: ButtonVariant
	/** Icon color (when using variant with icon) */
	iconColor?: string
	/** Additional props are automatically passed to the button element */
}

/**
 * Button component used throughout the application
 * Provides consistent styling with optional icon integration and variants
 */
export const Button: React.FC<ButtonProps> = ({
	handleClick,
	icon = '',
	type = 'button',
	children,
	className,
	widthIcon = 24,
	disabled = false,
	variant = 'primary',
	iconColor,
	...rest
}) => {
	// Get variant-specific styling
	const getVariantClasses = (): string => {
		switch (variant) {
			case 'primary':
				return 'flex items-center uppercase mx-2 px-6 py-3 text-white-0 bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'
			case 'secondary':
				return 'flex items-center uppercase px-4 py-2 text-gray-700 bg-gray-100 rounded-md shadow transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'
			case 'danger':
				return 'flex items-center px-3 py-2 text-white bg-red-600 rounded-md shadow transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
			case 'success':
				return 'flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
			case 'create':
				return 'flex items-center mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'
			case 'icon':
				return 'inline-flex justify-center items-center p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'
			case 'ghost':
				return 'inline-flex items-center text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200 focus:outline-none'
			case 'itinerary':
				return 'cursor-pointer flex flex-row items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors rounded-md'
			case 'project':
				return 'cursor-pointer flex flex-row items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors rounded-md'
			case 'custom':
				return ''
			default:
				return 'flex items-center mx-2 px-6 py-3 text-white bg-blue-600 rounded-md shadow transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
		}
	}

	// Default button styling based on variant
	const defaultClassName = getVariantClasses()

	// Maintain backward compatibility with newClass prop
	const newClass = (rest as any).newClass
	const finalClassName = className || newClass || defaultClassName

	// Remove newClass from rest props to avoid HTML validation warnings
	let cleanedRest = { ...rest }
	if ((rest as any).newClass) {
		const { newClass, ...cleanRest } = rest as any
		cleanedRest = cleanRest
	}

	// Special styling for icon-only buttons
	const isIconOnly = Boolean(icon && !children)

	return (
		<button
			type={type}
			onClick={handleClick}
			className={finalClassName}
			disabled={disabled}
			aria-disabled={disabled}
			{...cleanedRest}
		>
			{icon && (
				<Icon
					icon={icon}
					width={widthIcon}
					color={iconColor}
					aria-hidden="true"
				/>
			)}
			{children && (
				<span className={icon && !isIconOnly ? 'ml-2' : ''}>{children}</span>
			)}
		</button>
	)
}
