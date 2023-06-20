import { useEffect, useState } from 'react'

export const useItems = (items) => {
	const [itemsState, setItems] = useState([])
	useEffect(() => {
		const itemsProject = items.map(({ _id, ...rest }) => ({
			...rest,
			id: _id,
			_id
		}))
		setItems(itemsProject)
	}, [items])
	return {itemsState , setItems}
}