import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	AddToProjectButton,
	AddToIteneraryButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import {
	formatMoney,
	formatYearMonthDate,
	getTailwindClassesForDate
} from '../../../helper'
import { ModalAddEvent } from '../../projects/add/toSchedule/addModalEvent/ModalAddEvent'
import { TransfersProvider } from '../../projects/add/toProject/transfers/render/context'
import { IEvent } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { useActivity } from '../context/ActivitiesContext'

interface Props {
	event: IEvent
	canBeAddedToProject: boolean
}

export const ActivityListItem = ({
	event,
	canBeAddedToProject = false
}: Props) => {
	const { state, dispatch } = useActivity()
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')
	const [open, setOpen] = useState(false)

	const handleNavigateToActivitySpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_ACTIVITY',
			payload: event
		})
		navigate('/app/event/specs')
	}

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(event.updatedAt as string)
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
				<tbody className={listStyles.tbody}>
					<tr className={listStyles.tr}>
						<td
							onClick={handleNavigateToActivitySpecs}
							className="hover:text-blue-600 hover:underline cursor-pointer"
						>
							{event.name}
						</td>
						<td className={listStyles.td}>{event.city}</td>
						<td className={priceStyle}>
							{formatYearMonthDate(event.updatedAt || '')}
						</td>
						<td className={priceStyle}>
							{formatMoney(event.price ? event.price : 0)}
						</td>
						<td>{event.pricePerPerson ? 'TRUE' : 'FALSE'}</td>
						<td>{event.regular ? 'TRUE' : 'FALSE'} </td>
						<td className="cursor-pointer">
							<ButtonDeleteWithAuth
								endpoint={'events'}
								ID={event._id}
								setter={(updatedActivities: IEvent[]) =>
									dispatch({
										type: 'SET_ACTIVITIES',
										payload: updatedActivities
									})
								}
								items={state.activities || []}
							/>
						</td>
						<AddToProjectButton
							canBeAddedToProject={canBeAddedToProject}
							onAdd={() => setOpen(true)}
						/>
						<AddToIteneraryButton eventOrRestaurant={event} />
					</tr>
				</tbody>
			</TransfersProvider>
		</>
	)
}
