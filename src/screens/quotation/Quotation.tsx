import React from 'react'
import BudgetVisualizer from './BudgetVisualizer'
import ScheduleEditor from './ScheduleEditor'

const Quotation: React.FC = () => {
	return (
		<div className="flex h-screen relative">
			<ScheduleEditor />
			<BudgetVisualizer />
		</div>
	)
}

export default Quotation
