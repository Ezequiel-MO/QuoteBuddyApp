import { useState, useEffect } from 'react'
import { EditableCellVenue } from '../venue/EditableCellVenue'
import { getDayIndex, existMeeting } from '../../../helpers'
import accounting from 'accounting'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IMeeting } from 'src/interfaces'
import { useCurrentProject } from 'src/hooks'
import { UpdateMeetingPayload } from 'src/redux/features/currentProject/types'

// Define MeetingKey as the keys of IMeeting except for specified properties
type MeetingKey = keyof Omit<
	IMeeting,
	'hotel' | 'imageContentUrl' | 'introduction' | 'hotelName' | '_id'
>

// Define MeetingType as a union of specific string literals
type MeetingType = 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'

interface Props {
	units: number | 0
	title: string
	rate: number | 0
	keyMeetingUnit: string
	keyMeetingPrice:
		| 'HDDDR'
		| 'coffeeBreakPrice'
		| 'workingLunchPrice'
		| 'hotelDinnerPrice'
		| 'aavvPackage'
		| 'HDRate'
		| 'FDDDR'
		| 'FDRate'
	date: string
	idMeeting: string
	type: 'morning' | 'afternoon' | 'full_day'
}

export const MeetingBreakdownRow = ({
	units,
	title,
	rate,
	keyMeetingUnit,
	keyMeetingPrice,
	date,
	idMeeting,
	type
}: Props) => {
	const mySwal = withReactContent(Swal)
	const {
		budget: { selectedHotel },
		currentProject,
		updateMeeting
	} = useCurrentProject()

	const typeMeeting = {
		morning: 'morningMeetings',
		afternoon: 'afternoonMeetings',
		full_day: 'fullDayMeetings'
	}

	const [meeting, setMeeting] = useState({
		[keyMeetingUnit]: units,
		[keyMeetingPrice]: rate
	})

	// Important: useEffect must be called before any conditional returns
	useEffect(() => {
		setMeeting({
			[keyMeetingUnit]: units,
			[keyMeetingPrice]: rate
		})
	}, [selectedHotel, units, rate])

	// Skip rendering if rate is zero (moved after all hooks are called)
	if (rate === 0) return null

	const handleUpdate = async (value: number, keyMeeting: string) => {
		try {
			const hotelName = selectedHotel?.name
			const dayIndex = getDayIndex(date, currentProject.schedule.length)
			const isMeeting = existMeeting(
				dayIndex,
				currentProject,
				typeMeeting[type] as MeetingType,
				idMeeting,
				hotelName as string
			)
			if (!isMeeting) {
				throw Error('Meeting not found')
			}

			// Update local state for all cases
			setMeeting((prev) => ({
				...prev,
				[keyMeeting]: value
			}))

			// Ensure keyMeeting is a valid key of IMeeting before passing to the payload
			const payload: UpdateMeetingPayload = {
				value,
				dayIndex,
				idMeeting,
				typeMeeting: typeMeeting[type] as MeetingType,
				keyMeeting: keyMeeting as keyof IMeeting
			}
			updateMeeting(payload)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green',
				allowEnterKey: false
			})
		}
	}

	// Determine if units should be editable
	const isUnitEditable = keyMeetingUnit !== 'unit'

	// Calculate total cost
	const totalCost = meeting[keyMeetingPrice] * meeting[keyMeetingUnit]

	return (
		<tr className="border-b border-purple-700/20 hover:bg-purple-800/20 transition-colors duration-150 group">
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium text-gray-300 group-hover:text-purple-200">
				<span className="truncate w-48">{title}</span>
			</td>
			<td className="py-3 px-6 text-center">
				{isUnitEditable ? (
					<EditableCellVenue
						value={meeting[keyMeetingUnit]}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, keyMeetingUnit)}
					/>
				) : (
					<span className="bg-purple-800/40 text-purple-100 font-semibold py-1 px-3 rounded-full text-sm">
						{meeting[keyMeetingUnit]}
					</span>
				)}
			</td>
			<td className="py-3 px-6 text-center"></td>
			<td className="py-3 px-6 text-center">
				<EditableCellVenue
					value={meeting[keyMeetingPrice]}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, keyMeetingPrice)}
				/>
			</td>
			<td className="py-3 px-6 text-center text-gray-300 group-hover:text-green-200 transition-colors duration-200">
				{accounting.formatMoney(totalCost, '€')}
			</td>
		</tr>
	)
}
