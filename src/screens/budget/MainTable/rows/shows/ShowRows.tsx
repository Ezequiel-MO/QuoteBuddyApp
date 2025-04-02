import { useState, useEffect, useRef } from 'react'
import { EntertainmentSummaryRow } from './EntertainmentSummaryRow'
import { IEntertainment, IRestaurant } from '../../../../../interfaces'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'
import { useCurrentProject } from 'src/hooks'

interface Props {
	date: string
	entertainment: IEntertainment[]
	typeOfEvent: 'lunch' | 'dinner'
	selectedRestaurant: IRestaurant
}

export const ShowRows = ({
	date,
	entertainment,
	typeOfEvent,
	selectedRestaurant
}: Props) => {
	// Early return if no entertainment data
	if (!entertainment || entertainment.length === 0) return null

	// Get the budget update action
	const { updateBudgetProgramShowCost } = useCurrentProject()

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedEntertainment, setSelectedEntertainment] =
		useState<IEntertainment | null>(null)

	// Use a ref to track initial render
	const initialMount = useRef(true)
	// Use a ref to track if we need to update the budget
	const budgetNeedsUpdate = useRef(false)

	// Initialize selected entertainment on first render only
	useEffect(() => {
		if (entertainment && entertainment.length > 0 && !selectedEntertainment) {
			setSelectedEntertainment(JSON.parse(JSON.stringify(entertainment[0])))
			// Mark that we need to update the budget after setting initial entertainment
			budgetNeedsUpdate.current = true
		}
	}, [entertainment, selectedEntertainment])

	// Handle budget updates separately to prevent infinite loops
	useEffect(() => {
		// Only update budget if we have a selected entertainment and need to update
		if (selectedEntertainment && budgetNeedsUpdate.current) {
			updateBudgetProgramShowCost({
				date,
				show: selectedEntertainment,
				type: typeOfEvent
			})
			// Reset the flag to prevent unnecessary updates
			budgetNeedsUpdate.current = false
		}
	}, [selectedEntertainment, date, typeOfEvent, updateBudgetProgramShowCost])

	// Update selected entertainment when entertainment array changes
	useEffect(() => {
		// Skip on initial mount since we handle initialization in a separate effect
		if (initialMount.current) {
			initialMount.current = false
			return
		}

		if (entertainment && entertainment.length > 0 && selectedEntertainment) {
			// Try to find currently selected entertainment in new list
			const currentSelection = entertainment.find(
				(item) => item._id === selectedEntertainment._id
			)

			// If found, use it; otherwise default to first item
			if (currentSelection) {
				// Only update if the data has actually changed
				if (
					JSON.stringify(currentSelection) !==
					JSON.stringify(selectedEntertainment)
				) {
					setSelectedEntertainment(JSON.parse(JSON.stringify(currentSelection)))
					budgetNeedsUpdate.current = true
				}
			} else {
				setSelectedEntertainment(JSON.parse(JSON.stringify(entertainment[0])))
				budgetNeedsUpdate.current = true
			}
		}
	}, [entertainment])

	const handleEntertainmentChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		const selectedName = e.target.value
		const newSelection = entertainment.find(
			(item) => item.name === selectedName
		)

		if (newSelection) {
			// Create a deep copy to avoid reference issues
			setSelectedEntertainment(JSON.parse(JSON.stringify(newSelection)))
			// Mark that we need to update budget after selection change
			budgetNeedsUpdate.current = true
		}
	}

	// Don't render until we have a selected entertainment
	if (!selectedEntertainment) return null

	return (
		<>
			<EntertainmentSummaryRow
				date={date}
				entertainment={entertainment}
				selectedEntertainment={selectedEntertainment}
				handleChange={handleEntertainmentChange}
				typeOfEvent={typeOfEvent}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<EntertainmentBreakdownRows
				entertainment={selectedEntertainment}
				isOpen={isOpen}
				date={date}
				selectedRestaurant={selectedRestaurant}
				setEntertainment={(newEnt) => {
					setSelectedEntertainment(JSON.parse(JSON.stringify(newEnt)))
					budgetNeedsUpdate.current = true
				}}
				typeMeal={typeOfEvent}
			/>
		</>
	)
}
