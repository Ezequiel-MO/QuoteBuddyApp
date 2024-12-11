import { useState, useEffect } from 'react'
import { useContextBudget } from '../context/BudgetContext'
import { useCurrentProject } from 'src/hooks'

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
	const [totalCostOfItems, setTotalCostOfItems] = useState<number>(0)
	const {
		currentProject: { hotels = [] },
		budget: { selectedHotelCost = 0 }
	} = useCurrentProject()
	const { state } = useContextBudget()

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
					selectedHotelCost + state.overnightCost,
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
			cost: hotels.length > 0 ? selectedHotelCost + state.overnightCost : 0
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
			cost: state.giftCost
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
		hotels,
		selectedHotelCost,
		state.overnightCost,
		state.meetingsCost,
		state.mealsCost,
		state.activitiesCost,
		state.transfersInCost,
		state.transfersOutCost,
		state.itineraryTransfersCost,
		state.programTransfersCost,
		state.showsCost,
		state.giftCost
	])

	return {
		data,
		costItems,
		totalCostOfItems
	}
}
