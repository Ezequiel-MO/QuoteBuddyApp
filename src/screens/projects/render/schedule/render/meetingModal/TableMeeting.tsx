import { useState, useEffect, FC } from 'react'
// import { InputMeetingTable } from './InputMeetingTable'
import { InputMeetingTable } from './InputMeetingTable'
import { Icon } from '@iconify/react'
import { IMeeting } from "@interfaces/meeting"

interface TableMeetingProps {
	meeting?: IMeeting
	timeOfEvent: "fullDayMeetings" | "morningMeetings" | "afternoonMeetings";
	data: Record<string, number>
	setData: React.Dispatch<React.SetStateAction<Record<string, number>>>
	isChecked: Record<string, boolean>
	setIsChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export const TableMeeting: FC<TableMeetingProps> = ({
	meeting,
	data,
	setData,
	isChecked,
	setIsChecked,
	timeOfEvent
}) => {
	const [editMode, setEditMode] = useState(false)
	const [typePrice, setTypePrice] = useState({
		roomCapacity: false,
		HDRate: false,
		HDDDR: false,
		FDRate: false,
		FDDDR: false,
		aavvPackage: false,
		coffeeBreakUnits: false,
		coffeeBreakPrice: false,
		workingLunchUnits: false,
		workingLunchPrice: false,
		hotelDinnerUnits: false,
		hotelDinnerPrice: false
	})

	useEffect(() => {
		setData({
			...data,
			roomCapacity: meeting?.roomCapacity ?? 0,
			HDRate: meeting?.HDRate ?? 0,
			HDDDR: meeting?.HDDDR ?? 0,
			FDRate: meeting?.FDRate ?? 0,
			FDDDR: meeting?.FDDDR ?? 0,
			aavvPackage: meeting?.aavvPackage ?? 0,
			coffeeBreakUnits: meeting?.coffeeBreakUnits ?? 0,
			coffeeBreakPrice: meeting?.coffeeBreakPrice ?? 0,
			workingLunchUnits: meeting?.workingLunchUnits ?? 0,
			workingLunchPrice: meeting?.workingLunchPrice ?? 0,
			hotelDinnerUnits: meeting?.hotelDinnerUnits ?? 0,
			hotelDinnerPrice: meeting?.hotelDinnerPrice ?? 0
		})
		setIsChecked({
			...isChecked,
			roomCapacity: false,
			HDRate: false,
			HDDDR: false,
			FDRate: false,
			FDDDR: false,
			aavvPackage: false,
			coffeeBreakUnits: false,
			coffeeBreakPrice: false,
			workingLunchUnits: false,
			workingLunchPrice: false,
			hotelDinnerUnits: false,
			hotelDinnerPrice: false
		})
	}, [meeting])

	const handleEdit = (editMode: boolean, type: keyof typeof typePrice) => {
		if (!editMode) {
			setTypePrice({
				...typePrice,
				[type]: true
			})
			setEditMode(true)
		} else {
			setTypePrice({
				...typePrice,
				[type]: false
			})
			setEditMode(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setData({
			...data,
			[name as keyof typeof data]: value ?  parseFloat(value) : value  as any
		})
		if (meeting && meeting[name as keyof IMeeting] !== value) {
			setIsChecked({
				...isChecked,
				[name]: true
			})
		} else {
			setIsChecked({
				...isChecked,
				[name]: false
			})
		}
	}

	// Get icon based on meeting time
	const getTimeAndIcon = () => {
		switch (timeOfEvent) {
			case 'morningMeetings':
				return { icon: 'mdi:weather-sunny', time: 'Morning' }
			case 'afternoonMeetings':
				return { icon: 'mdi:weather-sunset', time: 'Afternoon' }
			case 'fullDayMeetings':
				return { icon: 'mdi:calendar-clock', time: 'Full Day' }
			default:
				return { icon: 'mdi:clock-outline', time: '' }
		}
	}

	return (
		<tbody className="divide-y divide-gray-700 bg-gray-800" >
			<tr className="hover:bg-gray-700 transition-colors duration-150">
				<td className="px-4 py-4 whitespace-nowrap">
					<div className="flex items-center">
						<Icon
							icon={getTimeAndIcon().icon}
							className="mr-2 text-cyan-400"
							width="20"
							height="20"
						/>
						<span className="font-medium text-white-0">
							{getTimeAndIcon().time}
						</span>
					</div>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'roomCapacity')}
				>
					{editMode && typePrice.roomCapacity && (
						<InputMeetingTable
							data={data.roomCapacity}
							nameInptut="roomCapacity"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.roomCapacity && 'hidden'} inline-flex  items-center  w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.roomCapacity && data?.roomCapacity}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'coffeeBreakUnits')}
				>
					{editMode && typePrice.coffeeBreakUnits && (
						<InputMeetingTable
							data={data.coffeeBreakUnits}
							nameInptut="coffeeBreakUnits"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.coffeeBreakUnits && 'hidden'}  inline-flex items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.coffeeBreakUnits && data?.coffeeBreakUnits}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'coffeeBreakPrice')}
				>
					{editMode && typePrice.coffeeBreakPrice && (
						<InputMeetingTable
							data={data.coffeeBreakPrice}
							nameInptut="coffeeBreakPrice"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.coffeeBreakPrice && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.coffeeBreakPrice && data?.coffeeBreakPrice}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'aavvPackage')}
				>
					{editMode && typePrice.aavvPackage && (
						<InputMeetingTable
							data={data.aavvPackage}
							nameInptut="aavvPackage"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.aavvPackage && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.aavvPackage && data?.aavvPackage}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'HDDDR')}
				>
					{editMode && typePrice.HDDDR && (
						<InputMeetingTable
							data={data.HDDDR}
							nameInptut="HDDDR"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.HDDDR && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.HDDDR && data?.HDDDR}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'workingLunchUnits')}
				>
					{editMode && typePrice.workingLunchUnits && (
						<InputMeetingTable
							data={data.workingLunchUnits}
							nameInptut="workingLunchUnits"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.workingLunchUnits && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.workingLunchUnits && data?.workingLunchUnits}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'workingLunchPrice')}
				>
					{editMode && typePrice.workingLunchPrice && (
						<InputMeetingTable
							data={data.workingLunchPrice}
							nameInptut="workingLunchPrice"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.workingLunchPrice && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.workingLunchPrice && data?.workingLunchPrice}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'hotelDinnerUnits')}
				>
					{editMode && typePrice.hotelDinnerUnits && (
						<InputMeetingTable
							data={data.hotelDinnerUnits}
							nameInptut="hotelDinnerUnits"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.hotelDinnerUnits && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.hotelDinnerUnits && data?.hotelDinnerUnits}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'hotelDinnerPrice')}
				>
					{editMode && typePrice.hotelDinnerPrice && (
						<InputMeetingTable
							data={data.hotelDinnerPrice}
							nameInptut="hotelDinnerPrice"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.hotelDinnerPrice && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.hotelDinnerPrice && data?.hotelDinnerPrice}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'FDRate')}
				>
					{editMode && typePrice.FDRate && (
						<InputMeetingTable
							data={data.FDRate}
							nameInptut="FDRate"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.FDRate && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.FDRate && data?.FDRate}
					</span>
				</td>
				<td
					className="px-4 py-4 whitespace-nowrap"
					onDoubleClick={() => handleEdit(editMode, 'HDRate')}
				>
					{editMode && typePrice.HDRate && (
						<InputMeetingTable
							data={data.HDRate}
							nameInptut="HDRate"
							handleChange={handleChange}
							editMode={editMode}
							handleEdit={handleEdit}
						/>
					)}
					<span
						className={`${editMode && typePrice.HDRate && 'hidden'}  inline-flex  items-center w-24 h-8 px-2  bg-gray-700 border border-gray-600 rounded-md text-white-0 cursor-pointer`}
					>
						{!typePrice.HDRate && data?.HDRate}
					</span>
				</td>
			</tr>
		</tbody>
	)
}
