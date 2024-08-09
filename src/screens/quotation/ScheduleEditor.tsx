import React from 'react'
import { Button } from '@components/atoms'
import { useQuotation } from './context/QuotationContext'
import styles from './ScheduleEditor.module.css'
import DayAccordion from './DayAccordion'

const ScheduleEditor: React.FC = () => {
	const { state, dispatch } = useQuotation()

	const days = Object.keys(state.openDrawerSections)

	return (
		<div
			className={`flex-1 ${
				state.isBudgetVisualizerOpen ? 'lg:mr-80' : ''
			} transition-all duration-300`}
		>
			<div className="p-4">
				<div className="flex flex-row justify-start items-center">
					{!state.isBudgetVisualizerOpen && (
						<Button
							icon="mdi:show"
							widthIcon={24}
							handleClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
							type="button"
							newClass="flex items-center uppercase px-3 py-1 text-white-0 bg-gray-50 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-50/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 active:bg-gray-50/90 active:scale-95"
						>
							Budget Visualizer
						</Button>
					)}
					<h1 className="text-2xl font-bold text-white-0 ml-5">
						Schedule Editor
					</h1>
				</div>
				<div className="mt-4">
					<ul className={styles.treeList}>
						<li className={styles.treeItem}>Introduction</li>
						<li className={styles.treeItem}>Accommodation</li>
						{days.map((day) => (
							<DayAccordion key={day} day={day} />
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ScheduleEditor
