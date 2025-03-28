import { useState, useEffect } from 'react'
import { useCurrentProject } from 'src/hooks'
import { categoryColors } from '../constants/CategoryColors'

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
					categoryColors['accommodation'].chartBackground,
					categoryColors['meeting'].chartBackground,
					categoryColors['transfer'].chartBackground,
					categoryColors['meal'].chartBackground,
					categoryColors['activity'].chartBackground,
					categoryColors['gift'].chartBackground,
					categoryColors['entertainment'].chartBackground
				],
				borderColor: [
					categoryColors['accommodation'].chartMain,
					categoryColors['meeting'].chartMain,
					categoryColors['transfer'].chartMain,
					categoryColors['meal'].chartMain,
					categoryColors['activity'].chartMain,
					categoryColors['gift'].chartMain,
					categoryColors['entertainment'].chartMain
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
			color: categoryColors['accommodation'].chartMain,
			bgColor: categoryColors['accommodation'].chartBackground
		},
		{
			icon: 'mdi:handshake-outline',
			title: 'MEETINGS',
			cost: meetingsCost,
			color: categoryColors['meeting'].chartMain,
			bgColor: categoryColors['meeting'].chartBackground
		},
		{
			icon: 'bx:bus',
			title: 'TRANSFERS',
			cost:
				transfersInCost +
				transfersOutCost +
				programTransfersCost +
				itineraryTransfersCost,
			color: categoryColors['transfer'].chartMain,
			bgColor: categoryColors['transfer'].chartBackground
		},
		{
			icon: 'carbon:restaurant',
			title: 'MEAL FUNCTIONS',
			cost: mealsCost,
			color: categoryColors['meal'].chartMain,
			bgColor: categoryColors['meal'].chartBackground
		},
		{
			icon: 'akar-icons:people-multiple',
			title: 'ACTIVITIES',
			cost: activitiesCost,
			color: categoryColors['activity'].chartMain,
			bgColor: categoryColors['activity'].chartBackground
		},
		{
			icon: 'mdi:gift-outline',
			title: 'GIFTS',
			cost: giftCost,
			color: categoryColors['gift'].chartMain,
			bgColor: categoryColors['gift'].chartBackground
		},
		{
			icon: 'codicon:mic',
			title: 'ENTERTAINMENT',
			cost: showsCost,
			color: categoryColors['entertainment'].chartMain,
			bgColor: categoryColors['entertainment'].chartBackground
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
