import { useState, useEffect } from 'react'
import { InputMeetingTable } from './InputMeetingTable'

export const TableMeeting = ({
	meeting,
	data,
	setData,
	isChecked,
	setIsChecked
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
			roomCapacity: meeting.roomCapacity,
			HDRate: meeting.HDRate,
			HDDDR: meeting.HDDDR,
			FDRate: meeting.FDRate,
			FDDDR: meeting.FDDDR,
			aavvPackage: meeting.aavvPackage,
			coffeeBreakUnits: meeting.coffeeBreakUnits,
			coffeeBreakPrice: meeting.coffeeBreakPrice,
			workingLunchUnits: meeting.workingLunchUnits,
			workingLunchPrice: meeting.workingLunchPrice,
			hotelDinnerUnits: meeting.hotelDinnerUnits,
			hotelDinnerPrice: meeting.hotelDinnerPrice
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

	const handleEdit = (editMode, type) => {
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

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
				? parseFloat(e.target.value)
				: e.target.value
		})
		if (meeting[e.target.name] != e.target.value) {
			setIsChecked({
				...isChecked,
				[e.target.name]: true
			})
		} else {
			setIsChecked({
				...isChecked,
				[e.target.name]: false
			})
		}
	}

	return (
		<tbody>
			<tr>
				<td
					className="border px-2 py-1 cursor-pointer text-right"
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
					{!typePrice.roomCapacity && data?.roomCapacity}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer "
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
					{!typePrice.coffeeBreakUnits && data?.coffeeBreakUnits}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.coffeeBreakPrice && data?.coffeeBreakPrice}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.aavvPackage && data?.aavvPackage}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.HDDDR && data?.HDDDR}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.workingLunchUnits && data?.workingLunchUnits}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.workingLunchPrice && data?.workingLunchPrice}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.hotelDinnerUnits && data?.hotelDinnerUnits}
				</td>
				<td
					className="border px-2 py-1 text-right cursor-pointer"
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
					{!typePrice.hotelDinnerPrice && data?.hotelDinnerPrice}
				</td>
			</tr>
		</tbody>
	)
}
