import { useState, useEffect } from 'react'
import { EditableCellVenue } from '../venue/EditableCellVenue'
import { getDayIndex, existMeeting } from '../../../helpers'
import accounting from 'accounting'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IMeeting } from 'src/interfaces'
import { useCurrentProject } from 'src/hooks'
import { UpdateMeetingPayload } from 'src/redux/features/currentProject/types'

type MeetingKey = keyof Omit<
	IMeeting,
	'hotel' | 'imageContentUrl' | 'introduction' | 'hotelName' | '_id'
>

type MeetingType = 'afternoonMeetings' | 'afternoonMeetings' | 'fullDayMeetings'

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

	useEffect(() => {
		setMeeting({
			[keyMeetingUnit]: units,
			[keyMeetingPrice]: rate
		})
	}, [selectedHotel])

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
			const payload: UpdateMeetingPayload = {
				value,
				dayIndex,
				idMeeting,
				typeMeeting: typeMeeting[type] as MeetingType,
				keyMeeting: keyMeeting as MeetingKey
			}
			updateMeeting(payload)
			setMeeting((prev) => ({
				...prev,
				[keyMeeting]: value
			}))
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

	if (rate === 0) return null

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]">
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium">
				<span className="truncate w-32">{title}</span>
			</td>
			<td className="py-3 px-6 text-center">
				{keyMeetingUnit !== 'unit' ? (
					<EditableCellVenue
						value={meeting[keyMeetingUnit]}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, keyMeetingUnit)}
					/>
				) : (
					<span className="bg-orange-50 text-[#fff] font-extrabold py-1 px-3 rounded-full text-sm">
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
			<td className="py-3 px-6 text-center">
				{accounting.formatMoney(
					meeting[keyMeetingPrice] * meeting[keyMeetingUnit],
					'€'
				)}
			</td>
		</tr>
	)
}
