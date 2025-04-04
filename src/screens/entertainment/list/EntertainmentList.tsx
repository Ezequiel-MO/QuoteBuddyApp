import { ChangeEvent } from 'react'
import { ListHeader } from '@components/molecules'
import { CityFilter } from 'src/ui'
import { EntertainmentListItem } from './EntertainmentListItem'
import { useEntertainment } from '../context/EntertainmentsContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { useLocation } from 'react-router-dom'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { EntertaimentListRestoreItem } from './restore/EntertaimentListRestoreItem'


const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

export const EntertainmentList = () => {

	const {
		state,
		dispatch,
		handleChange,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useEntertainment()

	const { auth } = useAuth()

	const location = useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentEntertainment,
		context: 'entertainment'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false


	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Entertainment Shows' : 'Entertainment Shows Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Entertaiment Show'
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
					city={state.currentEntertainment?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				{/* <LanguageFilter language={language} setLanguage={setLanguage} /> */}
			</ListHeader>
			{auth.role === 'admin' && (
				<div className="flex justify-end  mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						newClass={classButton}
						type="button"
						handleClick={() => setFilterIsDeleted((prev) => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />
			<ListTable
				items={state.entertainments || []}
				headers={!filterIsDeleted ? 'entertainmentShow' : 'entertainmentShowRestore'}
				ListItemComponent={!filterIsDeleted ? EntertainmentListItem : EntertaimentListRestoreItem}
				isLoading={isLoading || state.entertainments === undefined}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
