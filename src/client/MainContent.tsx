import React, { useRef } from 'react'
import Schedule from '@screens/preview/main-section/Schedule'
import { useCurrentProject } from 'src/hooks'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import * as styles from '../constants/mainsectionStyles'
import { hasMeaningfulText } from 'src/helper/hasMeaningfulText'
import { Hotels } from '@screens/preview/main-section/cardswrappers/Hotels'
import { PartialCosts } from '@screens/budget/partial-costs'
import { Icon } from '@iconify/react'
import ReactToPrint from 'react-to-print'
import { exportTableToExcel } from '@screens/budget/MainTable/higherComponents/exportTableToExcel'
import PDFBudget from '@screens/budget/MainTable/higherComponents/PDFBudget'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'

const MainContent: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const pdfToPrintRef = useRef<HTMLDivElement | null>(null)

	return (
		<div className="flex-grow p-5">
			<h1 className={styles.quoteTitle}>
				{`Quotation Gr. ${currentProject.groupName}`}
			</h1>
			{hasMeaningfulText(currentProject.projectIntro[0]) && (
				<>
					<h1 className={styles.quoteTitle}>About this Offer</h1>
					<RichParagraph text={currentProject.projectIntro[0]} />
				</>
			)}
			{!currentProject.multiDestination && currentProject.hotels.length > 0 ? (
				<>
					<h1 className={styles.quoteTitle}>Hotels</h1>
					<Hotels hotels={currentProject.hotels} />
				</>
			) : null}
			<Schedule />
			<div className="flex items-center justify-start space-x-4 mb-4">
				{currentProject?.budget === 'budget' ? (
					<button
						onClick={exportTableToExcel}
						className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						<Icon icon="vscode-icons:file-type-excel" width="24px" />
						<span>Export to Excel</span>
					</button>
				) : null}
				{currentProject?.budget !== 'noBudget' ? (
					<ReactToPrint
						trigger={() => (
							<button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
								<Icon icon="ant-design:printer-twotone" width="24px" />
								<span>Print Budget</span>
							</button>
						)}
						content={() => pdfToPrintRef.current}
					/>
				) : null}
			</div>
			<div ref={pdfToPrintRef} id="budget-table">
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
	)
}

export default MainContent
