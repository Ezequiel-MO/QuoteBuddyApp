import { FC, ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { PriceFilter } from '../../../ui'
import { useGift } from '../context/GiftsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { GiftListTable } from './GiftListTable'

export const GiftList: FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useGift()
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
				title="Gifts"
				handleClick={createNewItem}
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

			<hr />
			<GiftListTable
				items={state.gifts || []}
				isLoading={isLoading || state.gifts === undefined}
				searchTerm={state.searchTerm}
			/>
		</>
	)
}
