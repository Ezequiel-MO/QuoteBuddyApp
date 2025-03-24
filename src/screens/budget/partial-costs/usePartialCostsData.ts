import { useState, useEffect } from 'react'
import { useCurrentProject } from 'src/hooks'

export interface ICostItem {
	icon: string
	title: string
	cost?: number
	color?: string
	bgColor?: string
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
	costItems: ICostItem[]
	totalCostOfItems: number
}

export const usePartialCostsData = (): PartialCostsDataReturn => {
	const [totalCostOfItems, setTotalCostOfItems] = useState<number>(0)

	const {
		currentProject: { hotels = [] },
		budget: {
			selectedHotelCost = 0,
			transfersInCost = 0,
			transfersOutCost = 0,
			activitiesCost = 0,
			programTransfersCost = 0,
			meetingsCost = 0,
			mealsCost = 0,
			giftCost = 0,
			showsCost = 0,
			overnightCost = 0,
			itineraryTransfersCost = 0
		}
	} = useCurrentProject()

	const data: IData = {
		labels: [
			'Accommodation',
			'Meetings',
			'Transfers',
			'Meals',
			'Activities',
			'Gifts',
			'Entertainment'
		],
		datasets: [
			{
				label: 'Budget Breakdown',
				data: [
					selectedHotelCost + overnightCost,
					meetingsCost,
					transfersInCost +
						transfersOutCost +
						programTransfersCost +
						itineraryTransfersCost,
					mealsCost,
					activitiesCost,
					giftCost,
					showsCost
				],
				backgroundColor: [
					'rgba(255, 87, 34, 0.2)',
					'rgba(33, 150, 243, 0.2)',
					'rgba(139, 195, 74, 0.2)',
					'rgba(233, 30, 99, 0.2)',
					'rgba(255, 193, 7, 0.2)',
					'rgba(3, 169, 244, 0.2)',
					'rgba(121, 85, 72, 0.2)'
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
				borderWidth: 2
			}
		]
	}

	const costItems: ICostItem[] = [
		{
			icon: 'bx:hotel',
			title: 'ACCOMMODATION',
			cost: hotels.length > 0 ? selectedHotelCost + overnightCost : 0,
			color: 'rgba(255, 87, 34, 1)',
			bgColor: 'rgba(255, 87, 34, 0.2)'
		},
		{
			icon: 'mdi:handshake-outline',
			title: 'MEETINGS',
			cost: meetingsCost,
			color: 'rgba(33, 150, 243, 1)',
			bgColor: 'rgba(33, 150, 243, 0.2)'
		},
		{
			icon: 'bx:bus',
			title: 'TRANSFERS',
			cost:
				transfersInCost +
				transfersOutCost +
				programTransfersCost +
				itineraryTransfersCost,
			color: 'rgba(139, 195, 74, 1)',
			bgColor: 'rgba(139, 195, 74, 0.2)'
		},
		{
			icon: 'carbon:restaurant',
			title: 'MEAL FUNCTIONS',
			cost: mealsCost,
			color: 'rgba(233, 30, 99, 1)',
			bgColor: 'rgba(233, 30, 99, 0.2)'
		},
		{
			icon: 'akar-icons:people-multiple',
			title: 'ACTIVITIES',
			cost: activitiesCost,
			color: 'rgba(255, 193, 7, 1)',
			bgColor: 'rgba(255, 193, 7, 0.2)'
		},
		{
			icon: 'mdi:gift-outline',
			title: 'GIFTS',
			cost: giftCost,
			color: 'rgba(3, 169, 244, 1)',
			bgColor: 'rgba(3, 169, 244, 0.2)'
		},
		{
			icon: 'codicon:mic',
			title: 'ENTERTAINMENT',
			cost: showsCost,
			color: 'rgba(121, 85, 72, 1)',
			bgColor: 'rgba(121, 85, 72, 0.2)'
		}
	]

	useEffect(() => {
		const total = costItems.reduce((acc, item) => acc + (item.cost || 0), 0)
		setTotalCostOfItems(total)
	}, [
		hotels,
		selectedHotelCost,
		overnightCost,
		meetingsCost,
		mealsCost,
		activitiesCost,
		transfersInCost,
		transfersOutCost,
		itineraryTransfersCost,
		programTransfersCost,
		showsCost,
		giftCost
	])

	return {
		data,
		costItems,
		totalCostOfItems
	}
}
