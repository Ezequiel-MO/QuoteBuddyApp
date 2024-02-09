import React, { FC, useEffect, useState } from 'react'
import { OptionSelect } from '.'
import accounting from 'accounting'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'

interface MultipleChoiceCellsProps {
	pax: number
	description: string
	options: IEvent[] | IRestaurant[]
	id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	date: string
	selectedEvent: IEvent | IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const MultipleChoiceCells: FC<MultipleChoiceCellsProps> = ({
	pax,
	description,
	options,
	selectedEvent,
	setSelectedEvent
}) => {
	const isVenue = 'isVenue' in selectedEvent && selectedEvent.isVenue === true
	const [nrPax, setNrPax] = useState(pax)

	useEffect(() => {
		if (selectedEvent && 'pricePerPerson' in selectedEvent) {
			setNrPax(selectedEvent.pricePerPerson ? pax : 1)
		}
	}, [selectedEvent, pax])

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			options && options.find((option) => option.name === newValue)
		if (newSelectedEvent) {
			setSelectedEvent(newSelectedEvent)
		}
	}

	return (
		<>
			<td>{`${description} options`}</td>
			<td>
				<OptionSelect
					options={options}
					value={selectedEvent?.name || ''}
					handleChange={handleSelectChange}
				/>
			</td>
			<td>{nrPax}</td>
			<td>
				{!isVenue
					? accounting.formatMoney(Number(selectedEvent?.price), '€')
					: null}
			</td>
			<td>
				{!isVenue
					? accounting.formatMoney(
							Number(nrPax * Number(selectedEvent?.price)),
							'€'
					  )
					: accounting.formatMoney(getVenuesCost(selectedEvent), '€')}
			</td>
		</>
	)
}
