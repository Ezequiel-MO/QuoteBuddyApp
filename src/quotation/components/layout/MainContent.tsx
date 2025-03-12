import React, { useRef } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { useCurrentProject } from 'src/hooks'
import { IProject } from '@interfaces/project'
import Schedule from '@screens/preview/main-section/Schedule'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { Hotels } from '@screens/preview/main-section/cardswrappers/Hotels'
import { PartialCosts } from '@screens/budget/partial-costs'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'
import PDFBudget from '@screens/budget/MainTable/higherComponents/PDFBudget'
import { exportTableToExcel } from '@screens/budget/MainTable/higherComponents/exportTableToExcel'
import { hasMeaningfulText } from 'src/helper/hasMeaningfulText'
import * as styles from 'src/constants/mainsectionStyles'
import { Destination } from 'src/client/destination/Destination'

const MainContent: React.FC = () => {
	const { state } = useQuotation()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const pdfToPrintRef = useRef<HTMLDivElement | null>(null)
	const { animationsEnabled } = state

	// Check if sections are visible
	const showIntro = hasMeaningfulText(currentProject.projectIntro[0])
	const showHotels =
		!currentProject.multiDestination && currentProject.hotels.length > 0
	const showBudget = currentProject.budget !== 'noBudget'

	return (
		<div
			className={`
        flex-grow max-w-5xl mx-auto px-4 py-6 lg:px-8 lg:py-8
        ${animationsEnabled ? 'animate-fadeIn' : ''}
      `}
		>
			{/* Project Title */}
			<h1
				id="project_title_id"
				className={`
          ${styles.quoteTitle}
          ${animationsEnabled ? 'animate-slideDown' : ''}
        `}
			>
				Quotation Gr. {currentProject.groupName}
			</h1>

			{/* Introduction Section */}
			{showIntro && (
				<section
					id="introduction_id"
					className={`
            mb-12 p-6 bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm
            ${animationsEnabled ? 'animate-slideUp delay-150' : ''}
          `}
				>
					<h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white-0">
						About this Offer
					</h2>
					<div className="prose dark:prose-invert max-w-none">
						<RichParagraph text={currentProject.projectIntro[0]} />
					</div>
				</section>
			)}

			{/* Hotels Section */}
			{showHotels && (
				<section
					id="hotels_id"
					className={`
            mb-12 bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden
            ${animationsEnabled ? 'animate-slideUp delay-300' : ''}
          `}
				>
					<div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
						<Icon
							icon="bx:hotel"
							className="text-cyan-500 mr-3"
							width="24"
							height="24"
						/>
						<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0">
							Hotels
						</h2>
					</div>
					<div className="p-6">
						<Hotels hotels={currentProject.hotels} />
					</div>
				</section>
			)}

			{/* Schedule Section */}
			<section
				id="schedule_id"
				className={`
          mb-12 bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden
          ${animationsEnabled ? 'animate-slideUp delay-450' : ''}
        `}
			>
				<div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
					<Icon
						icon="bx:calendar"
						className="text-cyan-500 mr-3"
						width="24"
						height="24"
					/>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0">
						Schedule
					</h2>
				</div>
				<div className="overflow-hidden">
					<Schedule />
				</div>
			</section>

			{/* Budget Section */}
			{showBudget && (
				<section
					id="budget_id"
					className={`
            mb-12 bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden
            ${animationsEnabled ? 'animate-slideUp delay-600' : ''}
          `}
				>
					<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center">
							<Icon
								icon="ri:money-euro-circle-line"
								className="text-cyan-500 mr-3"
								width="24"
								height="24"
							/>
							<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0">
								Budget
							</h2>
						</div>

						<div className="flex space-x-2">
							{currentProject.budget === 'budget' && (
								<button
									onClick={exportTableToExcel}
									className="flex items-center bg-green-500 hover:bg-green-600 text-white-0 font-medium py-2 px-4 rounded transition duration-200 ease-in-out"
								>
									<Icon
										icon="vscode-icons:file-type-excel"
										className="mr-2"
										width="20"
									/>
									<span className="text-sm">Export to Excel</span>
								</button>
							)}

							<button
								onClick={() => {
									if (pdfToPrintRef.current) {
										const printWindow = window.open('', '_blank')
										if (printWindow) {
											printWindow.document.write(`
                        <html>
                          <head>
                            <title>Print Budget</title>
                            <style>
                              body { font-family: Arial, sans-serif; }
                              table { border-collapse: collapse; width: 100%; }
                              th, td { border: 1px solid #ddd; padding: 8px; }
                              th { background-color: #f2f2f2; }
                            </style>
                          </head>
                          <body>
                            ${pdfToPrintRef.current.innerHTML}
                          </body>
                        </html>
                      `)
											printWindow.document.close()
											printWindow.print()
										}
									}
								}}
								className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-white-0 font-medium py-2 px-4 rounded transition duration-200 ease-in-out"
							>
								<Icon
									icon="ant-design:printer-twotone"
									className="mr-2"
									width="20"
								/>
								<span className="text-sm">Print Budget</span>
							</button>
						</div>
					</div>

					<div className="p-6" ref={pdfToPrintRef}>
						{currentProject.budget === 'budget' ? (
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
				</section>
			)}

			{/* Destination Section */}
			<section
				id="destination_id"
				className={`
          mb-12 bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden
          ${animationsEnabled ? 'animate-slideUp delay-750' : ''}
        `}
			>
				<div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
					<Icon
						icon="mdi:map-marker"
						className="text-cyan-500 mr-3"
						width="24"
						height="24"
					/>
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0">
						Destination
					</h2>
				</div>
				<div className="overflow-hidden">
					<Destination />
				</div>
			</section>
		</div>
	)
}

export default MainContent
