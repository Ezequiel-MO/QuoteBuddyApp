import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListHeader } from '../../../components/molecules'
import { useCurrentProject } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { GiftListItem } from './GiftListItem'
import { PriceFilter } from '../../../ui'
import { useFetchGifts } from 'src/hooks/fetchData/useFetchGifts'

export const GiftList = () => {
	const navigate = useNavigate()
	const [gift] = useState({})
	const [foundGifts, setFoundGifts] = useState([])
	const [searchItem, setSearchItem] = useState('')
	const [price, setPrice] = useState(0)
	const { gifts, isLoading, setGifts } = useFetchGifts(price)
	const { currentProject, addGiftToProject } = useCurrentProject()

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const pricesList = [
		{ value: 10, name: 'Less than €10' },
		{ value: 15, name: 'Less than €15' },
		{ value: 25, name: 'Less than €25' }
	]

	useEffect(() => {
		setFoundGifts(gifts)
	}, [gifts])

	const filterListBySearch = (e) => {
		setSearchItem(e.target.value)
		const result = gifts.filter((el) =>
			el.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundGifts(result)
		if (searchItem === '') {
			setFoundGifts(gifts)
		}
	}

	const handleClick = () => {
		navigate('/app/gift/specs', { state: { gift } })
	}

	return (
		<>
			<div
				className="sticky top-0"
				style={{ backgroundColor: '#1c1917', paddingBottom: '1px' }}
			>
				<ListHeader
					title="Gifts"
					handleClick={handleClick}
					searchItem={searchItem}
					filterList={filterListBySearch}
				>
					<PriceFilter
						price={price}
						setPrice={setPrice}
						otherPrices={pricesList}
					/>
				</ListHeader>
			</div>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<GiftListItem
						gifts={foundGifts}
						setGifts={setGifts}
						canBeAddedToProject={currentProjectIsLive}
						addGiftToProject={addGiftToProject}
					/>
				</div>
			)}
		</>
	)
}
