import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useCurrentProject } from 'src/hooks'
import { useDarkMode } from 'src/hooks'
import { IProject } from '@interfaces/project'
import { useQuotation } from '../../context/QuotationContext'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
	const { state, dispatch } = useQuotation()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject
	const [isDarkMode, toggleDarkMode] = useDarkMode()
	const navigate = useNavigate()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [scrollPosition, setScrollPosition] = useState(0)

	// For company branding
	const companyName = clientCompany[0]?.name || 'CUTT Events'

	// Get formatted arrival and departure dates
	const formatDate = (dateString: string) => {
		if (!dateString) return ''

		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
	}

	const arrivalDate = formatDate(currentProject.arrivalDay)
	const departureDate = formatDate(currentProject.departureDay)

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// PDF generation
	const handleGeneratePDF = async () => {
		navigate('/client/pdf', { state: { pdfUrl: '#' } })
	}

	// Toggle view mode
	const toggleViewMode = () => {
		dispatch({
			type: 'SET_VIEW_PREFERENCE',
			payload: state.preferredView === 'detailed' ? 'compact' : 'detailed'
		})
	}

	return (
		<header
			className={`
        sticky top-0 z-50 w-full bg-white-0 dark:bg-gray-800 shadow-sm
        transition-all duration-300
        ${scrollPosition > 20 ? 'shadow-md' : ''}
      `}
		>
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Logo & Group Name */}
					<div className="flex items-center">
						<Icon
							icon="mdi:company"
							className="text-cyan-500 mr-3"
							width="32"
							height="32"
						/>

						<div>
							<h1 className="text-lg font-bold text-gray-800 dark:text-white-0">
								{currentProject.groupName}
							</h1>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{arrivalDate} - {departureDate} · {currentProject.nrPax}{' '}
								participants
							</p>
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center space-x-2">
						{/* Dark Mode Toggle */}
						<button
							onClick={() => toggleDarkMode()}
							className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
							aria-label={
								isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
							}
						>
							<Icon
								icon={isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'}
								className="text-gray-700 dark:text-gray-300"
								width="20"
								height="20"
							/>
						</button>

						{/* View Toggle */}
						<button
							onClick={toggleViewMode}
							className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
							aria-label={
								state.preferredView === 'detailed'
									? 'Switch to compact view'
									: 'Switch to detailed view'
							}
						>
							<Icon
								icon={
									state.preferredView === 'detailed'
										? 'mdi:view-compact'
										: 'mdi:view-agenda'
								}
								className="text-gray-700 dark:text-gray-300"
								width="20"
								height="20"
							/>
						</button>

						{/* PDF Button */}
						<button
							onClick={handleGeneratePDF}
							className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-white-0 px-3 py-1.5 rounded shadow transition duration-200 ease-in-out"
						>
							<Icon
								icon="ant-design:file-pdf-outlined"
								className="mr-1"
								width="16"
								height="16"
							/>
							<span className="text-sm">PDF</span>
						</button>

						{/* Menu (mobile) */}
						<div className="relative md:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
								aria-label="Open menu"
							>
								<Icon
									icon="mdi:dots-vertical"
									className="text-gray-700 dark:text-gray-300"
									width="20"
									height="20"
								/>
							</button>

							{isMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white-0 dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
									<div className="py-1" role="menu" aria-orientation="vertical">
										<button
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
											role="menuitem"
											onClick={() => {
												toggleDarkMode()
												setIsMenuOpen(false)
											}}
										>
											{isDarkMode ? 'Light Mode' : 'Dark Mode'}
										</button>

										<button
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
											role="menuitem"
											onClick={() => {
												toggleViewMode()
												setIsMenuOpen(false)
											}}
										>
											{state.preferredView === 'detailed'
												? 'Compact View'
												: 'Detailed View'}
										</button>

										<button
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
											role="menuitem"
											onClick={() => {
												handleGeneratePDF()
												setIsMenuOpen(false)
											}}
										>
											Download PDF
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
