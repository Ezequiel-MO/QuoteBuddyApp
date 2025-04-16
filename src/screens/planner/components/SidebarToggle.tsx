import { Icon } from '@iconify/react'
import { usePlannerContext } from '../context/PlannerContext'

const SidebarToggle = () => {
	const { dispatch, state } = usePlannerContext()

	const toggleSidebar = () => {
		dispatch({ type: 'TOGGLE_SIDEBAR', payload: !state.sidebarVisible })
	}

	return (
		<button
			onClick={toggleSidebar}
			className={`fixed left-0 top-20 z-30 p-2 shadow-lg transition-all duration-300 rounded-r-lg ${
				state.sidebarVisible
					? 'bg-gray-800 text-white-0 hover:bg-gray-700'
					: 'bg-[#ea5933] text-white-0 hover:bg-[#ea5933]/90 pl-1 pr-3'
			}`}
			title={state.sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
		>
			<div className="flex items-center">
				<Icon
					icon={state.sidebarVisible ? 'mdi:chevron-left' : 'mdi:chevron-right'}
					className="h-5 w-5"
				/>
				{!state.sidebarVisible && (
					<span className="ml-1 text-sm font-medium">Menu</span>
				)}
			</div>
		</button>
	)
}

export default SidebarToggle
