import {
	IActivity,
	IDay,
	IItinerary,
	IMeal,
	IMeetingDetails,
	IOvernight
} from '../../../interfaces'
import { ScheduleDayActivities } from './sections/ScheduleDayActivities'
import { ScheduleDayItinerary } from './sections/ScheduleDayItinerary'
import { ScheduleDayMeals } from './sections/ScheduleDayMeals'
import { ScheduleDayMeetings } from './sections/ScheduleDayMeetings'
import { ScheduleDayOvernight } from './sections/ScheduleDayOvernight'
import { getItemType } from './utils/helpers'

export type RenderedItem = {
	id: string
	title: string
	events: IMeal | IActivity | IOvernight | IMeetingDetails | IItinerary
	timing?: 'Morning' | 'Afternoon' | 'Full Day'
}

interface Props {
	items: RenderedItem[]
	day: IDay
	suplementaryText: boolean
}

const DayContentRenderer = ({ items, day, suplementaryText }: Props) => {
	const renderItem = (item: RenderedItem) => {
		const itemType = getItemType(item.id)
		const commonProps = {
			key: item.id,
			id: item.id,
			title: item.title,
			suplementaryText
		}
		switch (itemType) {
			case 'MorningEvents':
			case 'AfternoonEvents':
				return (
					<ScheduleDayActivities
						{...commonProps}
						events={(item.events as IActivity).events}
						introduction={(item.events as IActivity).intro}
					/>
				)
			case 'MorningMeetings':
			case 'AfternoonMeetings':
			case 'FullDayMeetings':
				return (
					<ScheduleDayMeetings
						{...commonProps}
						meetings={(item.events as IMeetingDetails).meetings}
						timing={item.timing || ''}
					/>
				)
			case 'Lunch':
			case 'Dinner':
				return (
					<ScheduleDayMeals
						{...commonProps}
						restaurants={(item.events as IMeal).restaurants}
						introduction={(item.events as IMeal).intro}
					/>
				)
			case 'Overnight':
				return (
					<ScheduleDayOvernight
						key={item.id}
						id={item.id}
						overnight={(item.events as IOvernight).hotels}
						introduction={(item.events as IOvernight).intro}
					/>
				)
			case 'Itinerary':
				return (
					<ScheduleDayItinerary
						key={item.id}
						id={item.id}
						introduction={day.itinerary.intro}
					/>
				)
			default:
				return null
		}
	}
	return <>{items.map(renderItem)}</>
}

export default DayContentRenderer
