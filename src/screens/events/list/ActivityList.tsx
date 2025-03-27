import { ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { CityFilter, PriceFilter } from '../../../ui'
import { ListHeader } from '../../../components/molecules'
import { ActivityListItem } from './ActivityListItem'
import { useActivity } from '../context/ActivitiesContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { ActivityListRestoreItem } from './restore/ActivityListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'


export const ActivityList = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading, setFilterIsDeleted, filterIsDeleted } = useActivity()

	const location = useLocation()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentActivity,
		context: 'activity'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Activities' : 'Activities Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Activity'
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<CityFilter
					city={state.currentActivity?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				<PriceFilter
					setPrice={handleChange}
					price={state.currentActivity?.price || 0}
					otherPrices={undefined}
				/>
				{/* <div className="">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div> */}
			</ListHeader>

			{
				auth.role === 'admin' &&
				<div className='flex justify-end -mt-8 mb-3 mr-2'>
					<Button
						icon='hugeicons:data-recovery'
						widthIcon={20}
						newClass={classButton}
						type='button'
						handleClick={() => setFilterIsDeleted(prev => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			}
			<hr />
			<div className={filterIsDeleted ? 'mb-40' : ''}>
				<ListTable
					items={state.activities || []}
					headers={!filterIsDeleted ? 'event' : 'eventRestore'}
					ListItemComponent={!filterIsDeleted ? ActivityListItem : ActivityListRestoreItem}
					isLoading={isLoading || state.activities === undefined}
					searchTerm={state.searchTerm}
					canBeAddedToProject={canBeAddedToProject}
				/>
			</div>
		</>
	)
}
