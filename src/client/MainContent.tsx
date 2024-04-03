import Schedule from '@screens/preview/main-section/Schedule'
import React from 'react'
import { useCurrentProject } from 'src/hooks'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import * as styles from '../constants/mainsectionStyles'
import { hasMeaningfulText } from 'src/helper/hasMeaningfulText'
import { Hotels } from '@screens/preview/main-section/cardswrappers/Hotels'
import { Budget } from '@screens/budget/MainTable/higherComponents'
import { PartialCosts } from '@screens/budget/partial-costs'

const MainContent: React.FC = () => {
	const { currentProject } = useCurrentProject()

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
			{!currentProject.multiDestination ? (
				<>
					<h1 className={styles.quoteTitle}>Hotels</h1>
					<Hotels hotels={currentProject.hotels} />
				</>
			) : null}
			<Schedule />
			<Budget />
			<PartialCosts
				colorPalette={currentProject?.clientCompany[0]?.colorPalette}
			/>
		</div>
	)
}

export default MainContent
