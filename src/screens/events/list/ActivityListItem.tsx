import { useEffect, useState, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	AddToProjectButton,
	AddToItineraryButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import {
	formatMoney,
	formatYearMonthDate,
	getTailwindClassesForDate
} from '../../../helper'
import { TransfersProvider } from '../../projects/add/toProject/transfers/render/context'
import { IEvent } from 'src/interfaces'
import { listStyles } from '@constants/styles/listStyles'
import { useActivity } from '../context/ActivitiesContext'
import { useCurrentProject } from 'src/hooks'

interface ActivityListItemProps {
	item: IEvent
	canBeAddedToProject: boolean
}

export const ActivityListItem: FC<ActivityListItemProps> = ({
	item: event,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useActivity()
	const location = useLocation()
	const { addEventToSchedule } = useCurrentProject()
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')

	const handleNavigateToActivitySpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_ACTIVITY',
			payload: event
		})
		navigate('/app/activity/specs')
	}

	const addActivityToProject = () => {
		addEventToSchedule({
			event,
			dayOfEvent: location.state.dayOfEvent,
			timeOfEvent: location.state.timeOfEvent
		})
		navigate('/app/project/schedule')
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
		<TransfersProvider>
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
				<td>{event.regular ? 'TRUE' : 'FALSE'}</td>
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
				{canBeAddedToProject && (
					<AddToProjectButton onAddToProject={addActivityToProject} />
				)}

				<AddToItineraryButton eventOrRestaurant={event} />
			</tr>
		</TransfersProvider>
	)
}
