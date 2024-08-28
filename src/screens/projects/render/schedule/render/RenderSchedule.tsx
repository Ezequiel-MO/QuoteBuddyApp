import React, { useMemo, Suspense, lazy, useTransition } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { useProject } from '@screens/projects/context/ProjectContext'
import BudgetVisualizer from '../../preview/BudgetVisualizer'
import ErrorBoundary from '../../common/ErrorBoundary'
import { ScheduleHeader } from './ScheduleHeader'
import { AddFullProgramToDataBase } from '@screens/projects/add'
import ScheduleMenu from './ScheduleMenu'

// Lazy loading components
const TransfersInContent = lazy(() => import('./content/TransfersInContent'))
const HotelsContent = lazy(() => import('./content/HotelsContent'))
const MeetingsContent = lazy(() => import('./content/MeetingsContent'))
const ScheduleContent = lazy(() => import('./content/ScheduleContent'))
const ItineraryContent = lazy(() => import('./content/ItineraryContent'))
const TransfersOutContent = lazy(() => import('./content/TransfersOutContent'))

// Map tab names to their respective content components
const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC>> = {
	'Transfers IN': TransfersInContent,
	Hotels: HotelsContent,
	Meetings: MeetingsContent,
	Schedule: ScheduleContent,
	Itinerary: ItineraryContent,
	'Transfers OUT': TransfersOutContent
}

type Tab =
	| 'Intro Text/Gifts'
	| 'Transfers IN'
	| 'Hotels'
	| 'Meetings'
	| 'Schedule'
	| 'Transfers OUT'
	| 'Itinerary'
	| 'Preview'

export const RenderSchedule: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const { state, dispatch } = useProject()
	const { selectedTab } = state

	const [isPending, startTransition] = useTransition()

	const SelectedTabComponent = useMemo(
		() => TAB_COMPONENTS[selectedTab],
		[selectedTab]
	)

	const handleTabChange = (tab: string) => {
		startTransition(() => {
			dispatch({ type: 'SET_SELECTED_TAB', payload: tab as Tab })
		})
	}

	return (
		<div className="flex flex-col text-gray-100">
			<ScheduleHeader />
			<ScheduleMenu
				multiDestination={currentProject.multiDestination}
				onPreviewClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
				onTabChange={handleTabChange}
			/>
			<AddFullProgramToDataBase project={currentProject} />
			<div className="my-4" />
			<ErrorBoundary
				fallbackUI={<div>Oops! There was a problem loading the content.</div>}
			>
				<Suspense fallback={<div>Loading...</div>}>
					{isPending ? (
						<div>Loading content...</div>
					) : (
						SelectedTabComponent && <SelectedTabComponent />
					)}
				</Suspense>
			</ErrorBoundary>
			<BudgetVisualizer />
		</div>
	)
}
