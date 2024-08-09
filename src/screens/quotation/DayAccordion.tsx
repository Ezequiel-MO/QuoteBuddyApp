// DayAccordion.tsx
import React from 'react'
import AccordionItem from './AccordionItem'
import { useQuotation } from './context/QuotationContext'
import styles from './ScheduleEditor.module.css'

interface DayAccordionProps {
	day: string
}

const DayAccordion: React.FC<DayAccordionProps> = ({ day }) => {
	const { state, dispatch } = useQuotation()

	const toggleDayAccordion = () => {
		dispatch({ type: 'TOGGLE_DRAWER_SECTION', day, index: -1 })
	}

	return (
		<li className={styles.treeItem}>
			<div className="flex items-center">
				<button className={styles.accordionButton} onClick={toggleDayAccordion}>
					{day}
				</button>
			</div>
			<ul className="ml-4">
				<AccordionItem day={day} index={0} label="Morning Activities">
					Details about morning activities...
				</AccordionItem>
				<AccordionItem day={day} index={1} label="Lunch">
					Details about lunch...
				</AccordionItem>
				<AccordionItem day={day} index={2} label="Afternoon Activities">
					Details about afternoon activities...
				</AccordionItem>
				<AccordionItem day={day} index={3} label="Dinner">
					Details about dinner...
				</AccordionItem>
			</ul>
		</li>
	)
}

export default DayAccordion
