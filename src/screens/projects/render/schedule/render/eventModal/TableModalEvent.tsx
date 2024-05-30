import React, { useState, useEffect, FC } from 'react'
import { TableHeaders } from '../../../../../../ui'
import { InputEventTable } from './InputEventTable'
import { IRestaurant, IEvent } from "@interfaces/index"

type EventKey = keyof IEvent | keyof IRestaurant

interface IisCheckedActivity {
	price: boolean
	pricePerPerson: boolean
}

interface IisCheckedRestaurant {
	price: boolean
	isVenue: boolean
}

interface TableModalEventProps {
	event: IEvent & IRestaurant
	data: IEvent & IRestaurant
	setData: React.Dispatch<React.SetStateAction<IEvent & IRestaurant>>
	isChecked: IisCheckedActivity & IisCheckedRestaurant
	setIsChecked: React.Dispatch<React.SetStateAction<IisCheckedActivity & IisCheckedRestaurant>>
}

export const TableModalEvent: FC<TableModalEventProps> = ({
	event,
	data,
	setData,
	isChecked,
	setIsChecked
}) => {
	const [type, setType] = useState<"eventModal" | "restaurantModal">("eventModal")
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const eventKey = name as EventKey
		setData({
			...data,
			[name]: value
				? parseFloat(value)
				: value
		})
		setIsChecked({
			...isChecked,
			[name]: event[eventKey] !== value
		})
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target
		const eventKey = name as EventKey
		setData({
			...data,
			[name]: checked
		})
		setIsChecked({
			...isChecked,
			[e.target.name]: event[eventKey] !== checked
		})
	}

	return (
		<div className="overflow-auto">
			<table className="min-w-full table-auto border-collapse border-2 border-orange-500">
				<TableHeaders headers={type} />
				<tbody>
					<tr>
						<td align="left" className='px-6'>
							{event?.city}
						</td>
						<td align="left" className='px-6'>
							{event?.location?.coordinates[0]}
						</td>
						<td align="left" className='px-6'>
							{event?.location?.coordinates[1]}
						</td>
						<td
							align="left"
							className="cursor-pointer px-6"
							onDoubleClick={handleEdit}
						>
							{editMode ? (
								<InputEventTable
									data={data.price as number}
									nameInput="price"
									handleChange={handleChange}
									editMode={editMode}
									handleEdit={handleEdit}
								/>
							) : (
								data?.price
							)}
						</td>
						<td align="left" className='px-6'>
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
