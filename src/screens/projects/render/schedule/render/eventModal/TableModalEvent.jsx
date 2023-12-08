import React, { useState, useEffect } from 'react'
import { TableHeaders } from '../../../../../../ui'
import { InputEventTable } from './InputEventTable'

export const TableModalEvent = ({
	event,
	data,
	setData,
	isChecked,
	setIsChecked
}) => {
	const [type, setType] = useState('')
	const [editMode, setEditMode] = useState(false)

	const isEvent = Object.keys(event).includes('pricePerPerson')
	const isRestaurant = Object.keys(event).includes('isVenue')

	useEffect(() => {
		if (isEvent) {
			setType('eventModal')
			setData({
				...data,
				price: event?.price,
				pricePerPerson: event?.pricePerPerson
			})
			setIsChecked({
				...isChecked,
				price: false,
				pricePerPerson: false
			})
		}
		if (isRestaurant) {
			setType('restaurantModal')
			setData({
				...data,
				price: event?.price,
				isVenue: event?.isVenue
			})
			setIsChecked({
				...isChecked,
				price: false,
				isVenue: false
			})
		}
	}, [event])

	const handleEdit = () => {
		setEditMode(!editMode)
	}

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
				? parseFloat(e.target.value)
				: e.target.value
		})
		setIsChecked({
			...isChecked,
			[e.target.name]: event[e.target.name] !== e.target.value
		})
	}

	const handleCheckboxChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.checked
		})
		setIsChecked({
			...isChecked,
			[e.target.name]: event[e.target.name] !== e.target.checked
		})
	}

	return (
		<div className="overflow-auto">
			<table className="min-w-full table-auto border-collapse border-2 border-orange-500">
				<TableHeaders headers={type} />
				<tbody>
					<tr>
						<td align="center">{event?.city}</td>
						<td align="center">{event?.location?.coordinates[0]}</td>
						<td align="center">{event?.location?.coordinates[1]}</td>
						<td
							align="center"
							className="cursor-pointer"
							onDoubleClick={handleEdit}
						>
							{editMode ? (
								<InputEventTable
									data={data.price}
									nameInput="price"
									handleChange={handleChange}
									editMode={editMode}
									handleEdit={handleEdit}
								/>
							) : (
								data?.price
							)}
						</td>
						<td align="center">
							{type === 'eventModal' && (
								<input
									type="checkbox"
									className="cursor-pointer"
									name="pricePerPerson"
									checked={data.pricePerPerson}
									onChange={handleCheckboxChange}
								/>
							)}
							{type === 'restaurantModal' && (
								<input
									type="checkbox"
									className="cursor-pointer"
									name="isVenue"
									checked={data.isVenue}
									onChange={handleCheckboxChange}
								/>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
