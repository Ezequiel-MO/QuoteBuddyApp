import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

export const useDragAndDrop = (initialItems, dragAndDropHandler) => {
	const [items, setItems] = useState(initialItems)

	useEffect(() => {
		setItems(initialItems)
	}, [initialItems])

	const handleDragEnd = (event) => {
		const { active, over } = event

		const startItemIndex = items.findIndex((el) => el.id === active.id)
		const endItemIndex = items.findIndex((el) => el.id === over.id)

		setItems((prevItems) => arrayMove(prevItems, startItemIndex, endItemIndex))

		dragAndDropHandler({
			startItemIndex: Number(startItemIndex),
			endItemIndex: Number(endItemIndex)
		})
	}

	return { items, handleDragEnd }
}

export default useDragAndDrop
