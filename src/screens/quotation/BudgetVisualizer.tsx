import { Button } from '@components/atoms'
import { useQuotation } from './context/QuotationContext'
import * as fakeData from './constants/fakeData'
import {
	AccommodationCard,
	TransferInCard,
	TransferOutCard,
	MeetingCard,
	ActivityCard,
	OvernightCard
} from './budget-cards'

const BudgetVisualizer = () => {
	const { state, dispatch } = useQuotation()

	return (
		<div
			className={`flex flex-col items-left justify-start fixed right-0 top-0 h-full bg-gray-800 border-l shadow-lg transition-transform duration-300 ${
				state.isBudgetVisualizerOpen ? 'translate-x-0' : 'translate-x-full'
			} w-2/4 z-50`}
		>
			<Button
				icon="mdi:hide"
				widthIcon={24}
				handleClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
				type="button"
				newClass="flex items-center uppercase px-3 py-1 text-white bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95"
			>
				Hide
			</Button>
			<div className="p-4 h-full overflow-y-auto hide-scrollbar">
				<h1 className="text-2xl font-bold text-white">Budget Visualizer</h1>

				<AccommodationCard />

				{/* Day Categories */}
				{fakeData.SCHEDULE.map((day, dayIndex) => (
					<div key={dayIndex} className="mt-6">
						<h2 className="text-xl font-semibold text-blue-400">
							{fakeData.DAYS[dayIndex]}
						</h2>

						<TransferInCard day={day} dayIndex={dayIndex} />
						<TransferOutCard day={day} dayIndex={dayIndex} />
						<MeetingCard day={day} />
						<ActivityCard day={day} />
						<OvernightCard day={day} />
					</div>
				))}
			</div>
		</div>
	)
}

export default BudgetVisualizer
