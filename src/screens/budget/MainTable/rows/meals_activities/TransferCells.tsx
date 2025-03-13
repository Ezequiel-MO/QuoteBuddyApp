import { useEffect, useState } from 'react'
import accounting from 'accounting'
import { ITransfer, IEvent, IRestaurant } from '../../../../../interfaces'
import { EditableCell } from './EditableCell'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import {
	IProgramTransfersPayload,
	UpdateTransferActivityPayload,
	UpdateTransferRestaurantPayload
} from 'src/redux/features/currentProject/types'

interface Props {
	description: string
	date: string
	option: ITransfer
	count: number
	id:
		| 'transfer_morningEvents'
		| 'transfer_lunch'
		| 'transfer_afternoonEvents'
		| 'transfer_dinner'
		| 'transfer_morningItinerary'
		| 'transfer_afternoonItinerary'
	selectedEvent: IEvent | IRestaurant
}

const serviceDescriptions: { [key: string]: string } = {
	dispo_4h: '4 Hours at Disposal',
	dispo_4h_night: '4 Night Hours at Disposal',
	one_way_city_transfer: 'One Way City Transfer',
	one_way_city_transfer_night: 'One Way City Transfer Night',
	dispo_5h_out: '5 Hours at Disposal Out of Town',
	dispo_6h: '6 Hours at Disposal',
	dispo_6h_night: '6 Night Hours at Disposal',
	dispo_9h: '9 Hours at Disposal'
}

type ServiceKey =
	| 'dispo_4h'
	| 'dispo_4h_night'
	| 'dispo_5h_out'
	| 'one_way_city_transfer'
	| 'one_way_city_transfer_night'
	| 'dispo_6h'
	| 'dispo_6h_night'
	| 'dispo_9h'

export const TransferCells = ({
	description,
	date,
	option,
	count,
	id,
	selectedEvent
}: Props) => {
	const mySwal = withReactContent(Swal)

	const {
		currentProject: { schedule = [] },
		updateTransferRestaurant,
		updateTransferActivity,
		updateBudgetProgramTransfersCost
	} = useCurrentProject()
	const serviceKey = option.selectedService as keyof ITransfer
	const serviceCost = Number(option[serviceKey])
	const serviceDescription =
		serviceDescriptions[option.selectedService] || option.selectedService

	const [transferSelect, setTransferSelect] = useState({
		transfer: count,
		priceTransfer: serviceCost
	})
	const typesMeals = ['lunch', 'dinner']
	const typesActivities = ['morningEvents', 'afternoonEvents']

	const handleUpdate = async (
		value: number,
		type: 'transfer' | 'priceTransfer'
	) => {
		try {
			if (!selectedEvent._id) throw Error('activity or restaurant not found')
			let dayIndex: number | undefined
			let daySchedule = date.split(' ')
			switch (daySchedule[0]) {
				case 'Arrival':
					dayIndex = 0
					break
				case 'Day':
					dayIndex = parseInt(daySchedule[1]) - 1
					break
				case 'Departure':
					dayIndex = schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) throw Error('day not found')
			const typeEvent = id?.split('_')[1] as
				| 'morningEvents'
				| 'afternoonEvents'
				| 'lunch'
				| 'dinner'
			if (!typeEvent) throw Error('Error in the Type of Event')
			setTransferSelect((prev) => ({
				...prev,
				[type]: value
			}))
			if (typesMeals.includes(typeEvent)) {
				const payload: UpdateTransferRestaurantPayload = {
					value: value <= 0 ? 1 : value,
					dayIndex,
					idTransfer: option._id,
					typeEvent,
					serviceKey: serviceKey as ServiceKey,
					idRestaurant: selectedEvent._id,
					typeUpdate: type
				}
				updateTransferRestaurant(payload)
			}
			if (typesActivities.includes(typeEvent)) {
				const payload: UpdateTransferActivityPayload = {
					value: value <= 0 ? 1 : value,
					dayIndex,
					idTransfer: option._id,
					typeEvent,
					serviceKey: serviceKey as ServiceKey,
					idActivity: selectedEvent._id,
					typeUpdate: type
				}
				updateTransferActivity(payload)
			}
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	useEffect(() => {
		const transfer = { ...option }
		transfer[serviceKey] = transferSelect.priceTransfer
		const payload: IProgramTransfersPayload = {
			date,
			transfer,
			count: transferSelect.transfer,
			type: id
		}
		updateBudgetProgramTransfersCost(payload)
	}, [transferSelect])

	return (
		<>
			<td>{description}</td>
			<td>
				{`${option.vehicleCapacity} (${option.vehicleType}),  ${serviceDescription}`}
			</td>
			<td>
				<EditableCell
					value={transferSelect.transfer}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'transfer')}
					originalValue={count}
				/>
			</td>
			<td>
				<EditableCell
					value={transferSelect.priceTransfer}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'priceTransfer')}
					originalValue={serviceCost}
				/>
			</td>
			<td>
				{accounting.formatMoney(
					transferSelect.transfer * transferSelect.priceTransfer,
					'€'
				)}
			</td>
		</>
	)
}
