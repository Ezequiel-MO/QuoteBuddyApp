import { IProject } from '@interfaces/project'
import { useState } from 'react'
import { useCurrentProject } from 'src/hooks'
import { SidebarRow } from './SidebarRow'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'

const Sidebar = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
		const saved = localStorage.getItem('sidebarVisible')
		return saved ? JSON.parse(saved) : true
	})
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, budget, hotels, multiDestination, hideDates } =
		currentProject
	return (
		<div className="sticky top-28 w-64 bg-slate-400 dark:bg-slate-600 text-white-0 my-5 ml-2 p-5 rounded-lg">
			{hotels && hotels.length > 0 && !multiDestination && (
				<SidebarRow
					iconText="bx:hotel"
					title="hotels"
					isSidebarVisible={isSidebarVisible}
				/>
			)}
			{!hideDates ? (
				schedule?.map((day, index) => {
					const dayIsEmpty = checkDayIsEmpty(day)
					if (!dayIsEmpty || (dayIsEmpty && multiDestination)) {
						return (
							<SidebarRow
								key={index}
								iconText="bx:calendar"
								title={day.date}
								isSidebarVisible={isSidebarVisible}
							/>
						)
					}
					return null
				})
			) : (
				<SidebarRow
					iconText="bx:calendar"
					title="Offer"
					isSidebarVisible={isSidebarVisible}
				/>
			)}
			{currentProject.budget === 'budget' ||
			currentProject.budget === 'budgetAsPdf' ? (
				<SidebarRow
					iconText="ri:money-euro-circle-line"
					title="budget"
					isSidebarVisible={isSidebarVisible}
				/>
			) : null}
		</div>
	)
}

export default Sidebar
