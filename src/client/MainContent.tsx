import React, { useRef } from 'react'
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

const MainContent: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const pdfToPrintRef = useRef<HTMLDivElement | null>(null)

	return (
		<div className="flex-grow p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
			{/* Main Title with subtle animation and gradient */}
			<h1
				className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-800 dark:text-white-0 
                     bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent
                     transform transition-all duration-300 hover:scale-[1.02]"
			>
				{`Quotation ${currentProject.groupName}`}
			</h1>

			{/* Overview Table with hover effect */}
			<div className="transition-all duration-300 transform hover:shadow-lg rounded-xl overflow-hidden">
				<OverviewTable />
			</div>

			{/* About this Offer Section */}
			{hasMeaningfulText(currentProject.projectIntro[0]) && (
				<div className="bg-white-0 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center">
						<Icon
							icon="carbon:document"
							className="mr-3 text-orange-500"
							width="28"
							height="28"
						/>
						About this Offer
					</h2>
					<div className="prose prose-lg dark:prose-invert max-w-none">
						<RichParagraph text={currentProject.projectIntro[0]} />
					</div>
				</div>
			)}

			{/* Hotels Section */}
			{!currentProject.multiDestination && currentProject.hotels.length > 0 ? (
				<div className="bg-white-0 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center">
						<Icon
							icon="mdi:hotel"
							className="mr-3 text-orange-500"
							width="28"
							height="28"
						/>
						Accommodation Options
					</h2>
					<Hotels hotels={currentProject.hotels} />
				</div>
			) : null}

			{/* Schedule Section - The main component we're redesigning */}
			<div className="bg-white-0 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
				<Schedule />
			</div>

			{/* Budget Controls and Display */}
			{(currentProject?.budget === 'budget' ||
				currentProject?.budget === 'budgetAsPdf') && (
				<div className="bg-white-0 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white-0 mb-4 flex items-center">
						<Icon
							icon="mdi:calculator"
							className="mr-3 text-orange-500"
							width="28"
							height="28"
						/>
						Budget
					</h2>

					<div className="flex flex-wrap gap-4 mb-6">
						{currentProject?.budget === 'budget' ? (
							<button
								onClick={exportTableToExcel}
								className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white-0 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
							>
								<Icon
									icon="vscode-icons:file-type-excel"
									width="24"
									className="mr-2"
								/>
								<span>Export to Excel</span>
							</button>
						) : null}

						{currentProject?.budget ? (
							<ReactToPrint
								trigger={() => (
									<button className="flex items-center bg-rose-600 hover:bg-rose-700 text-white-0 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm">
										<Icon
											icon="ant-design:printer-twotone"
											width="24"
											className="mr-2"
										/>
										<span>Print Budget</span>
									</button>
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
									colorPalette={currentProject?.clientCompany[0]?.colorPalette}
								/>
							</>
						) : currentProject.budget === 'budgetAsPdf' ? (
							<PDFBudget />
						) : null}
					</div>
				</div>
			)}
		</div>
	)
}

export default MainContent
