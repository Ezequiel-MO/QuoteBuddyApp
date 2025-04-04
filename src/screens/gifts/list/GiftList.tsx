import { FC, ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { PriceFilter } from '../../../ui'
import { useGift } from '../context/GiftsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { GiftListTable } from './GiftListTable'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { ListTable } from '@components/molecules/table/ListTable'
import { GiftListRestoreItem } from './restore/GiftListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

export const GiftList: FC = () => {

	const { auth } = useAuth()

	const {
		state,
		dispatch,
		handleChange,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useGift()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentGift,
		context: 'gift'
	})
	const { changePage } = usePagination({ state, dispatch })

	const pricesList = [
		{ value: 15, name: 'Less than €15' },
		{ value: 20, name: 'Less than €20' },
		{ value: 30, name: 'Less than €30' }
	]

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Gifts' : 'Gifts Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Gift'
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
				<PriceFilter
					setPrice={handleChange}
					price={state.currentGift?.price || 0}
					otherPrices={pricesList}
				/>
				{/* 	
                <div className="absolute ml-[200px] ">
                    <LanguageFilter language={language} setLanguage={setLanguage} />
                </div> */}
			</ListHeader>
			{
				auth.role === 'admin' &&
				<div className='flex justify-end  mb-3 mr-2'>
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
			{!filterIsDeleted &&
				<GiftListTable
					items={state.gifts || []}
					isLoading={isLoading || state.gifts === undefined}
					searchTerm={state.searchTerm}
				/>
			}
			{
				filterIsDeleted &&
				<div className={filterIsDeleted ? 'mb-40' : ''} >
					<ListTable
						items={state.gifts || []}
						headers={'giftRestore'}
						ListItemComponent={GiftListRestoreItem}
						isLoading={isLoading || state.gifts === undefined}
						searchTerm={state.searchTerm}
					/>
				</div>
			}
		</>
	)
}
