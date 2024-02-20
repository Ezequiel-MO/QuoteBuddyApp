import {
	IActivity,
	IDay,
	IItinerary,
	IMeal,
	IMeetingDetails,
	IOvernight
} from '@interfaces/project'
import { getItemType } from './helpers'
import { ScheduleDayActivities } from '../sections/ScheduleDayActivities'
import { ScheduleDayMeetings } from '../sections/ScheduleDayMeetings'
import { ScheduleDayMeals } from '../sections/ScheduleDayMeals'
import { ScheduleDayOvernight } from '../sections/ScheduleDayOvernight'
import { ScheduleDayItinerary } from '../sections/ScheduleDayItinerary'

export type RenderedItem = {
	id: string
	title: string
	events: IMeal | IActivity | IOvernight | IMeetingDetails | IItinerary
	timing?: 'Morning' | 'Afternoon' | 'Full Day'
}

export const renderItem = (
	item: RenderedItem,
	suplementaryText: boolean,
	day: IDay
) => {
	const itemType = getItemType(item.id)
	switch (itemType) {
		case 'MorningEvents':
		case 'AfternoonEvents':
			return (
				<ScheduleDayActivities
					key={item.id}
					id={item.id}
					title={item.title}
					events={(item.events as IActivity).events}
					introduction={(item.events as IActivity).intro}
					suplementaryText={suplementaryText}
				/>
			)
		case 'MorningMeetings':
		case 'AfternoonMeetings':
		case 'FullDayMeetings':
			return (
				<ScheduleDayMeetings
					key={item.id}
					id={item.id}
					title={item.title}
					meetings={(item.events as IMeetingDetails).meetings}
					suplementaryText={suplementaryText}
					timing={item.timing || ''}
				/>
			)
		case 'Lunch':
		case 'Dinner':
			return (
				<ScheduleDayMeals
					key={item.id}
					id={item.id}
					title={item.title}
					restaurants={(item.events as IMeal).restaurants}
					introduction={(item.events as IMeal).intro}
					suplementaryText={suplementaryText}
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
	}
}
