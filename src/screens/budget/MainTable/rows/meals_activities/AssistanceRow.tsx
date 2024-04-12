import { useState, useEffect } from "react"
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from "./EditableCell"
import { useContextBudget } from '../../../context/BudgetContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


interface Props {
	firstItem: ITransfer
	date: string
	description: 'On Board Assistance' | 'En Route Assistance'
	id?: string
	idRestaunrantOrActivity?: string
}

export const AssistanceRow = ({ firstItem, date, description, id, idRestaunrantOrActivity }: Props) => {

	const mySwal = withReactContent(Swal)

	const { dispatch, state } = useContextBudget()

	const [assistance, setAssistance] = useState(firstItem.assistance ? firstItem.assistance : 0)
	const [assistanceCost, setAssistanceCost] = useState(firstItem.assistanceCost ? firstItem.assistanceCost : 0)
	useEffect(() => {
		setAssistance(firstItem.assistance || 0)
		setAssistanceCost(firstItem.assistanceCost ? firstItem.assistanceCost : 0)
	}, [firstItem])

	const handleUpdate = async (value: number, type: "assistance" | "assistanceCost") => {
		try {
			if (!idRestaunrantOrActivity) throw Error("activity or restaurant not found")
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
					dayIndex = state.schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) throw Error("day not found")
			const typeEvent = id?.split("_")[1] as "morningEvents" | "afternoonEvents" | "lunch" | "dinner"
			if (!typeEvent) throw Error("Error in the Type of Event")
			// console.log({ dayIndex, value, type, idRestaunrantOrActivity, typeEvent })
			type === "assistance" ? setAssistance(value <= 0 ? 1 : value) : setAssistanceCost(value <= 0 ? 1 : value)
			dispatch({
				type: "UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT",
				payload: {
					value: value <= 0 ? 1 : value,
					dayIndex,
					id: idRestaunrantOrActivity,
					key: type,
					typeEvent: typeEvent
				}
			})
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


	if (!firstItem) {
		return null
	}

	if (assistance === 0) {
		return null
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>{description}</td>
			<td>
				<EditableCell
					value={assistance}
					typeValue='unit'
					onSave={(newValue) => handleUpdate(newValue, "assistance")}
				/>
			</td>
			{/* <td>{accounting.formatMoney(assistanceCost, '€')}</td> */}
			<td>
				<EditableCell
					value={assistanceCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, "assistanceCost")}
				/>
			</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
