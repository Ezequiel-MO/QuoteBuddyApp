// AccordionItem.tsx
import React from 'react'
import { useQuotation } from './context/QuotationContext'
import styles from './ScheduleEditor.module.css'

interface AccordionItemProps {
	day: string
	index: number
	label: string
	children: React.ReactNode
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	day,
	index,
	label,
	children
}) => {
	const { state, dispatch } = useQuotation()

	const isOpen = state.openDrawerSections[day]?.[index] || false

	const toggleAccordion = () => {
		dispatch({ type: 'TOGGLE_DRAWER_SECTION', day, index })
	}

	return (
		<li className={styles.accordionItem}>
			<button
				className={`${styles.accordionButton} ml-4`}
				onClick={toggleAccordion}
			>
				{label}
			</button>
			{isOpen && (
				<div className={styles.accordionContent}>
					<span className={styles.accordionContentText}>{children}</span>
				</div>
			)}
		</li>
	)
}

export default AccordionItem
