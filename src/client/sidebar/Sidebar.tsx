import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'
import { SidebarRow } from './SidebarRow'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'
import { useQuotation } from '@client/context/QuotationContext'

const Sidebar = () => {
	const { state } = useQuotation()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, hotels, multiDestination, hideDates } = currentProject
	return (
		<div
			className={`sticky top-28 w-48 lg:w-64 bg-white-0 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 text-gray-800 dark:text-gray-200 ${
				state.isSidebarOpen ? '' : 'hidden'
			}`}
		>
			{hotels && hotels.length > 0 && !multiDestination && (
				<SidebarRow iconText="bx:hotel" title="hotels" />
			)}
			{!hideDates ? (
				schedule?.map((day, index) => {
					const dayIsEmpty = checkDayIsEmpty(day)
					if (!dayIsEmpty || (dayIsEmpty && multiDestination)) {
						return (
							<SidebarRow key={index} iconText="bx:calendar" title={day.date} />
						)
					}
					return null
				})
			) : (
				<SidebarRow iconText="bx:calendar" title="Offer" />
			)}
			{currentProject.budget === 'budget' ||
			currentProject.budget === 'budgetAsPdf' ? (
				<SidebarRow iconText="ri:money-euro-circle-line" title="budget" />
			) : null}
		</div>
	)
}

export default Sidebar
