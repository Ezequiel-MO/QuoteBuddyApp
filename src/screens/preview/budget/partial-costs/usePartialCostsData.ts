import { useState, useEffect, useMemo } from 'react'
import { IGift } from '../../../interfaces'
import { useContextBudget } from '../context/BudgetContext'

export interface ICostItem {
	icon: string
	title: string
	cost?: number
}

interface IData {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		backgroundColor: string[]
		borderColor: string[]
		borderWidth: number
	}[]
}

interface PartialCostsDataReturn {
	data: IData
	costItems: any[]
	totalCostOfItems: number
}

export const usePartialCostsData = (): PartialCostsDataReturn => {
	const { state } = useContextBudget()
	const [totalCostOfItems, setTotalCostOfItems] = useState<number>(0)

	const data: IData = {
		labels: [
			'Accommodation',
			'Meetings',
			'Transfers',
			'Meals',
			'Activities',
			'Gifts',
			'Show Costs'
		],
		datasets: [
			{
				label: 'Budget Breakdown',
				data: [
					state.selectedHotelCost + state.overnightCost,
					state.meetingsCost,
					state.transfersInCost +
						state.transfersOutCost +
						state.programTransfersCost +
						state.itineraryTransfersCost,
					state.mealsCost,
					state.activitiesCost,
					0, //gift costs
					state.showsCost
				],
				backgroundColor: [
					'rgba(255, 87, 34, 0.2)',
					'rgba(33, 150, 243, 0.2)',
					'rgba(139, 195, 74, 0.2)',
					'rgba(233, 30, 99, 0.2)',
					'rgba(255, 193, 7, 0.2)',
					'rgba(3, 169, 244, 0.2)',
					'rgba(121, 85, 72, 0.2)',
					'rgba(96, 125, 139, 0.2)'
				],
				borderColor: [
					'rgba(255, 87, 34, 1)',
					'rgba(33, 150, 243, 1)',
					'rgba(139, 195, 74, 1)',
					'rgba(233, 30, 99, 1)',
					'rgba(255, 193, 7, 1)',
					'rgba(121, 85, 72, 1)',
					'rgba(96, 125, 139, 1)'
				],
				borderWidth: 1
			}
		]
	}

	const costItems: ICostItem[] = [
		{
			icon: 'bx:hotel',
			title: 'ACCOMMODATION',
			cost: state.selectedHotelCost + state.overnightCost
		},
		{
			icon: 'mdi:handshake-outline',
			title: 'MEETINGS',
			cost: state.meetingsCost
		},
		{
			icon: 'bx:bus',
			title: 'TRANSFERS',
			cost:
				state.transfersInCost +
				state.transfersOutCost +
				state.programTransfersCost +
				state.itineraryTransfersCost
		},
		{
			icon: 'carbon:restaurant',
			title: 'MEAL FUNCTIONS',
			cost: state.mealsCost
		},
		{
			icon: 'akar-icons:people-multiple',
			title: 'ACTIVITIES',
			cost: state.activitiesCost
		},
		{
			icon: 'mdi:gift-outline',
			title: 'GIFTS',
			cost: 0
		},
		{
			icon: 'codicon:mic',
			title: 'ENTERTAINMENT',
			cost: state.showsCost
		}
	]

	useEffect(() => {
		const total = costItems.reduce((acc, item) => acc + (item.cost || 0), 0)
		setTotalCostOfItems(total)
	}, [
		state.selectedHotelCost,
		state.overnightCost,
		state.meetingsCost,
		state.mealsCost,
		state.activitiesCost,
		state.transfersInCost,
		state.transfersOutCost,
		state.itineraryTransfersCost,
		state.programTransfersCost,
		state.showsCost
	])

	return {
		data,
		costItems,
		totalCostOfItems
	}
}
