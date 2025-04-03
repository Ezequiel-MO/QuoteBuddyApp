import { FC, useRef, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypeOfTransfersAssistanceFilterProps {
	typeOfAssistance: 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
	setTypeOfAssistance: React.Dispatch<
		React.SetStateAction<'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'>
	>
	typeTransfer?: string
	className?: string
}

/**
 * TypeOfTransfersAssistanceFilter - Enhanced dropdown for selecting assistance types
 */
export const TypeOfTransfersAssistanceFilter: FC<
	TypeOfTransfersAssistanceFilterProps
> = ({
	typeOfAssistance,
	setTypeOfAssistance,
	typeTransfer = 'in',
	className = ''
}) => {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Define assistance options based on the transfer type
	const assistanceOptions = [
		{
			value: 'meetGreet',
			label:
				typeTransfer === 'in'
					? 'Meet and Greet at the airport'
					: 'Group Dispatch',
			icon: 'mdi:handshake'
		},
		{
			value: 'hostessOnBoard',
			label: 'Assistance On Board Vehicle',
			icon: 'mdi:human-greeting-variant'
		},
		{
			value: 'guideOnBoard',
			label: 'Airport Transfer with guide',
			icon: 'mdi:account-tie'
		}
	] as const

	// Handle option selection
	const handleOptionChange = (
		value: 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
	) => {
		setTypeOfAssistance(value)
		setIsDropdownVisible(false)
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsDropdownVisible(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropdownRef])

	// Get display text and icon for the selected option
	const getSelectedOption = () => {
		return (
			assistanceOptions.find((option) => option.value === typeOfAssistance) ||
			assistanceOptions[0]
		)
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{/* Selector Button */}
			<button
				type="button"
				className="w-full bg-gray-800 border border-gray-600 text-white-0 rounded-md py-2 px-3 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
				aria-haspopup="listbox"
				aria-expanded={isDropdownVisible}
			>
				<span className="flex items-center">
					<Icon
						icon={getSelectedOption().icon}
						className="mr-2 text-gray-400"
						width="18"
					/>
					<span className="truncate">{getSelectedOption().label}</span>
				</span>
				<Icon
					icon={
						isDropdownVisible
							? 'heroicons:chevron-up'
							: 'heroicons:chevron-down'
					}
					className="ml-2 text-gray-400"
					width="18"
				/>
			</button>

			{/* Dropdown Panel */}
			<AnimatePresence>
				{isDropdownVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.15 }}
						className="absolute z-50 mt-1 w-full min-w-[240px] rounded-md bg-gray-800 border border-gray-600 shadow-lg overflow-hidden"
					>
						{/* Options List */}
						<div className="max-h-60 overflow-y-auto custom-scrollbar">
							{assistanceOptions.map((option) => (
								<button
									key={option.value}
									type="button"
									className={`w-full text-left px-3 py-2 flex items-center ${
										typeOfAssistance === option.value
											? 'bg-orange-500 text-white-0'
											: 'text-white-0 hover:bg-gray-700'
									}`}
									onClick={() => handleOptionChange(option.value)}
								>
									<Icon icon={option.icon} className="mr-2" width="18" />
									<span>{option.label}</span>
									{typeOfAssistance === option.value && (
										<Icon
											icon="heroicons:check"
											className="ml-auto"
											width="18"
										/>
									)}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
