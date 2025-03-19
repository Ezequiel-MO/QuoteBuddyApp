import { IEvent } from '@interfaces/event'
import { IHotel } from '@interfaces/hotel'
import { IMeeting } from '@interfaces/meeting'
import { IDay } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'
import { Link } from 'react-scroll'
import { useCurrentProject } from 'src/hooks'

interface Props {
	day: IDay
	menuOpen: boolean
	setMenuOpen: (value: boolean) => void
}

const LINK_OFFSET = -100

const SectionLink = ({
	date,
	section,
	children
}: {
	date: string
	section: string
	children: React.ReactNode
}) => (
	<Link
		className="text-gray-700 dark:text-slate-50 font-medium hover:text-orange-50 dark:hover:text-orange-50 cursor-pointer text-sm"
		to={`${date}-${section}`}
		smooth={true}
		offset={LINK_OFFSET}
	>
		{children}
	</Link>
)

export const ScheduleDaySubtitles = ({ day, menuOpen, setMenuOpen }: Props) => {
	const { currentProject } = useCurrentProject()
	const { multiDestination } = currentProject

	// Debug the day object
	console.log('ScheduleDaySubtitles - day:', day)

	const hasEvents = (
		events: IEvent[] | IRestaurant[] | IMeeting[] | IHotel[]
	): boolean => events && events.length > 0

	if (
		!hasEvents(day.morningEvents.events) &&
		!hasEvents(day.morningMeetings.meetings) &&
		!hasEvents(day.lunch.restaurants) &&
		!hasEvents(day.afternoonEvents.events) &&
		!hasEvents(day.afternoonMeetings.meetings) &&
		!hasEvents(day.dinner.restaurants) &&
		!hasEvents(day.fullDayMeetings.meetings) &&
		!hasEvents(day.overnight.hotels)
	) {
		return null
	}

	return (
		<div
			key={day._id}
			className={`${
				menuOpen ? 'flex flex-col' : 'hidden'
			}  overflow-hidden transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 `}
			onMouseEnter={() => setMenuOpen(true)}
			onMouseLeave={() => setMenuOpen(false)}
		>
			{hasEvents(day.morningEvents.events) && (
				<SectionLink date={day.date} section="morning-events">
					Morning Events
				</SectionLink>
			)}
			{hasEvents(day.morningMeetings.meetings) && (
				<SectionLink date={day.date} section="morning-meetings">
					Morning Meetings
				</SectionLink>
			)}
			{hasEvents(day.lunch.restaurants) && (
				<SectionLink date={day.date} section="lunch">
					Lunch
				</SectionLink>
			)}
			{hasEvents(day.afternoonEvents.events) && (
				<SectionLink date={day.date} section="afternoon-events">
					Afternoon Events
				</SectionLink>
			)}
			{hasEvents(day.afternoonMeetings.meetings) && (
				<SectionLink date={day.date} section="afternoon-meetings">
					Afternoon Meetings
				</SectionLink>
			)}
			{hasEvents(day.dinner.restaurants) && (
				<SectionLink date={day.date} section="dinner">
					Dinner
				</SectionLink>
			)}
			{hasEvents(day.fullDayMeetings.meetings) && (
				<SectionLink date={day.date} section="fullday-meetings">
					Full Day Meetings
				</SectionLink>
			)}
			{multiDestination && hasEvents(day.overnight.hotels) && (
				<SectionLink date={day.date} section="overnight">
					Overnight Accommodation
				</SectionLink>
			)}
		</div>
	)
}
