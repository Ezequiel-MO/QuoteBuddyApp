import { useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useItems } from '../../screens/projects/render/useItems'

export const useDragAndDrop = (initialItems, onMove) => {
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
	const { itemsState, setItems } = useItems(initialItems)

	const handleDragEnd = (event) => {
		const { active, over } = event
		if (over) {
			const oldIndex = itemsState.findIndex((el) => el.id === active.id)
			const newIndex = itemsState.findIndex((el) => el.id === over.id)
			if (oldIndex !== -1 && newIndex !== -1) {
				setItems(arrayMove(itemsState, oldIndex, newIndex))
				onMove({
					startHotelIndex: Number(oldIndex),
					endHotelIndex: Number(newIndex)
				})
			}
		}
	}

	return { handleDragEnd, sensors, itemsState, setItems }
}
