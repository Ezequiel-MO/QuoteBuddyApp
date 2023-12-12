import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddToProjectButton, ButtonDeleted } from '../../../components/atoms'
import {
	formatMoney,
	formatYearMonthDate,
	getTailwindClassesForDate
} from '../../../helper'
import { ModalAddEvent } from '../../projects/add/toSchedule/addModalEvent/ModalAddEvent'
import { TransfersProvider } from '../../projects/add/toProject/transfers/render/context'
import { IEvent } from 'src/interfaces'

interface Props {
	event: IEvent
	canBeAddedToProject: boolean
	setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
	events: IEvent[]
}

export const ActivityListItem = ({
	event,
	canBeAddedToProject,
	setEvents,
	events
}: Props) => {
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')
	const [open, setOpen] = useState(false)

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(event.updatedAt || '')
		priceDueStatus === 'overdue'
			? setPriceStyle('text-red-500')
			: priceDueStatus === 'due-soon'
			? setPriceStyle('text-yellow-500')
			: setPriceStyle('text-green-500')
	}, [event])

	return (
		<>
			<TransfersProvider>
				<ModalAddEvent open={open} setOpen={setOpen} event={event} />
				<tbody>
					<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
						<td
							onClick={() =>
								navigate(`/app/event/specs`, {
									state: { event }
								})
							}
							className="hover:text-blue-600 hover:underline cursor-pointer"
						>
							{event.name}
						</td>
						<td>{event.city}</td>
						<td className={priceStyle}>
							{formatYearMonthDate(event.updatedAt || '')}
						</td>
						<td className={priceStyle}>{formatMoney(event.price)}</td>
						<td>{event.pricePerPerson ? 'TRUE' : 'FALSE'}</td>
						<td className="cursor-pointer">
							<ButtonDeleted
								endpoint={'events'}
								ID={event._id}
								setter={setEvents}
								items={events}
							/>
						</td>
						<AddToProjectButton
							canBeAddedToProject={canBeAddedToProject}
							onAdd={() => setOpen(true)}
						/>
					</tr>
				</tbody>
			</TransfersProvider>
		</>
	)
}
