import {
	IActivity,
	IDay,
	IItinerary,
	IMeal,
	IMeetingDetails,
	IOvernight
} from '@interfaces/project'
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
	const renderItem = (item: RenderedItem, index: number) => {
		const itemType = getItemType(item.id)
		const commonProps = {
			key: item.id,
			id: item.id,
			title: item.title,
			suplementaryText
		}

		// Wrap each item in a div with appropriate spacing and animation
		const content = (() => {
			switch (itemType) {
				case 'MorningEvents':
				case 'AfternoonEvents':
					return (
						<ScheduleDayActivities
							key={item.id}
							{...{
								id: item.id,
								title: item.title,
								suplementaryText
							}}
							events={(item.events as IActivity).events}
							introduction={(item.events as IActivity).intro}
						/>
					)
				case 'MorningMeetings':
				case 'AfternoonMeetings':
				case 'FullDayMeetings':
					return (
						<ScheduleDayMeetings
							key={item.id}
							{...{
								id: item.id,
								title: item.title,
								suplementaryText
							}}
							meetings={(item.events as IMeetingDetails).meetings || []}
							timing={item.timing || ''}
						/>
					)
				case 'Lunch':
				case 'Dinner':
					return (
						<ScheduleDayMeals
							key={item.id}
							{...{
								id: item.id,
								title: item.title,
								suplementaryText
							}}
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
		})()

		// Return null if content is null
		if (!content) return null

		// Wrap the content in a section with consistent styling
		return (
			<div
				key={item.id}
				className={`transition-all duration-300 ${index > 0 ? 'mt-8' : ''}`}
			>
				{content}
				{index < items.length - 1 && (
					<div className="mt-8 border-b border-gray-100 dark:border-gray-700"></div>
				)}
			</div>
		)
	}

	return (
		<div className="space-y-0">
			{items.map((item, index) => renderItem(item, index))}
		</div>
	)
}

export default DayContentRenderer
