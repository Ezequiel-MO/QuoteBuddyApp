import React, { useRef, useState, useEffect } from 'react'
import Schedule from '@screens/preview/main-section/Schedule'
import { useCurrentProject } from 'src/hooks'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { hasMeaningfulText } from 'src/helper/hasMeaningfulText'
import { Hotels } from '@screens/preview/main-section/cardswrappers/Hotels'
import { PartialCosts } from '@screens/budget/partial-costs'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import { exportTableToExcel } from '@screens/budget/MainTable/higherComponents/exportTableToExcel'
import PDFBudget from '@screens/budget/MainTable/higherComponents/PDFBudget'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'
import OverviewTable from './components/overview/OverviewTable'
import { useProjectActions } from 'src/redux/features/currentProject/actions/projectActions'
import { motion, AnimatePresence } from 'framer-motion'
import ViewModeToggle from './components/ViewModeToggle'

const MainContent: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const { toggleSupplementaryText } = useProjectActions()
	const pdfToPrintRef = useRef<HTMLDivElement | null>(null)
	const [viewMode, setViewMode] = useState<'detailed' | 'compact'>(
		currentProject.suplementaryText ? 'detailed' : 'compact'
	)

	// Sync viewMode with Redux state on mount
	useEffect(() => {
		setViewMode(currentProject.suplementaryText ? 'detailed' : 'compact')
	}, [currentProject.suplementaryText])

	// Handle view mode change
	const handleViewModeChange = (mode: 'detailed' | 'compact') => {
		setViewMode(mode)
		// Update the Redux state using the existing action
		toggleSupplementaryText(mode === 'detailed')
	}

	// Variants for animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.05
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500
			}
		}
	}

	return (
		<motion.div
			className={`flex-grow ${
				viewMode === 'compact' ? 'space-y-4' : 'space-y-8'
			} max-w-7xl mx-auto`}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* Header with title and view mode toggle */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white-0 dark:bg-gray-800 p-4 rounded-xl shadow-md">
				<motion.h1
					className={`${
						viewMode === 'compact'
							? 'text-2xl md:text-3xl'
							: 'text-3xl md:text-4xl lg:text-5xl'
					} font-extrabold text-gray-800 dark:text-white-0 
					bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent
					transform transition-all duration-300 hover:scale-[1.02]`}
					variants={itemVariants}
				>
					{`Quotation ${currentProject.groupName}`}
				</motion.h1>

				<ViewModeToggle
					viewMode={viewMode}
					onViewModeChange={handleViewModeChange}
				/>
			</div>

			{/* Overview Table with hover effect */}
			<motion.div
				className={`transition-all duration-300 transform hover:shadow-lg rounded-xl overflow-hidden ${
					viewMode === 'compact' ? 'p-2' : 'p-4'
				}`}
				variants={itemVariants}
			>
				<OverviewTable />
			</motion.div>

			{/* About this Offer Section - conditionally rendered based on viewMode and content */}
			<AnimatePresence>
				{(viewMode === 'detailed' ||
					hasMeaningfulText(currentProject.projectIntro[0])) && (
					<motion.div
						className={`bg-white-0 dark:bg-gray-800 rounded-xl ${
							viewMode === 'compact' ? 'p-4' : 'p-6'
						} shadow-md hover:shadow-lg transition-shadow duration-300`}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
					>
						<h2
							className={`${
								viewMode === 'compact'
									? 'text-xl md:text-2xl'
									: 'text-2xl md:text-3xl'
							} font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center`}
						>
							<Icon
								icon="carbon:document"
								className="mr-3 text-orange-500"
								width={viewMode === 'compact' ? '24' : '28'}
								height={viewMode === 'compact' ? '24' : '28'}
							/>
							About this Offer
						</h2>
						<div
							className={`prose ${
								viewMode === 'compact' ? 'prose-sm' : 'prose-lg'
							} dark:prose-invert max-w-none`}
						>
							{hasMeaningfulText(currentProject.projectIntro[0]) ? (
								<RichParagraph text={currentProject.projectIntro[0]} />
							) : viewMode === 'detailed' ? (
								<p className="text-gray-500 dark:text-gray-400 italic">
									No additional information provided for this quotation. Please
									contact your account manager for more details.
								</p>
							) : null}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Hotels Section - conditionally rendered based on data and viewMode */}
			<AnimatePresence>
				{!currentProject.multiDestination &&
					currentProject.hotels.length > 0 && (
						<motion.div
							className={`bg-white-0 dark:bg-gray-800 rounded-xl ${
								viewMode === 'compact' ? 'p-4' : 'p-6'
							} shadow-md hover:shadow-lg transition-shadow duration-300`}
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
						>
							<h2
								className={`${
									viewMode === 'compact'
										? 'text-xl md:text-2xl'
										: 'text-2xl md:text-3xl'
								} font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center`}
							>
								<Icon
									icon="mdi:hotel"
									className="mr-3 text-orange-500"
									width={viewMode === 'compact' ? '24' : '28'}
									height={viewMode === 'compact' ? '24' : '28'}
								/>
								Accommodation Options
							</h2>
							<Hotels hotels={currentProject.hotels} />
						</motion.div>
					)}
			</AnimatePresence>

			{/* Schedule Section - The main component */}
			<motion.div
				className={`bg-white-0 dark:bg-gray-800 rounded-xl ${
					viewMode === 'compact' ? 'p-4' : 'p-6'
				} shadow-md hover:shadow-lg transition-shadow duration-300`}
				variants={itemVariants}
			>
				<Schedule />
			</motion.div>

			{/* Budget Controls and Display */}
			<AnimatePresence>
				{(currentProject?.budget === 'budget' ||
					currentProject?.budget === 'budgetAsPdf') && (
					<motion.div
						className={`bg-white-0 dark:bg-gray-800 rounded-xl ${
							viewMode === 'compact' ? 'p-4' : 'p-6'
						} shadow-md hover:shadow-lg transition-shadow duration-300`}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
					>
						<h2
							className={`${
								viewMode === 'compact'
									? 'text-xl md:text-2xl'
									: 'text-2xl md:text-3xl'
							} font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center`}
						>
							<Icon
								icon="mdi:calculator"
								className="mr-3 text-orange-500"
								width={viewMode === 'compact' ? '24' : '28'}
								height={viewMode === 'compact' ? '24' : '28'}
							/>
							Budget
						</h2>

						<div
							className={`flex flex-wrap gap-4 ${
								viewMode === 'compact' ? 'mb-4' : 'mb-6'
							}`}
						>
							{currentProject?.budget === 'budget' ? (
								<motion.button
									onClick={exportTableToExcel}
									className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white-0 font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Icon
										icon="vscode-icons:file-type-excel"
										width="20"
										className="mr-2"
									/>
									<span>Export to Excel</span>
								</motion.button>
							) : null}

							{currentProject?.budget ? (
								<ReactToPrint
									trigger={() => (
										<motion.button
											className="flex items-center bg-rose-600 hover:bg-rose-700 text-white-0 font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Icon
												icon="ant-design:printer-twotone"
												width="20"
												className="mr-2"
											/>
											<span>Print Budget</span>
										</motion.button>
									)}
									content={() => pdfToPrintRef.current}
								/>
							) : null}
						</div>

						{/* Budget Display with a nice container */}
						<div
							ref={pdfToPrintRef}
							id="budget-table"
							className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
						>
							{currentProject?.budget === 'budget' ? (
								<>
									<BudgetTable />
									<PartialCosts
										colorPalette={
											currentProject?.clientCompany[0]?.colorPalette
										}
									/>
								</>
							) : currentProject.budget === 'budgetAsPdf' ? (
								<PDFBudget />
							) : null}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default MainContent
