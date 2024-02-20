import { TabList } from '@components/molecules/tabs/TabList'
import { IEvent } from '@interfaces/event'
import { useState, useMemo } from 'react'

interface Props {
	events: IEvent[]
}

export const Events = ({ events }: Props) => {
	const [openTab, setOpenTab] = useState(1)

	const eventListItems = useMemo(
		() =>
			events.map((event) => ({
				_id: event._id,
				name: event.name
			})),
		[events]
	)

	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full">
					<TabList
						tabListItems={eventListItems}
						type="event"
						activeTab={openTab}
						setActiveTab={setOpenTab}
						onTabClick={function (id: string): void {
							console.log('function not implemented')
						}}
					/>

					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
						<div className="py-5 flex-auto">
							<div className="tab-content tab-space">
								{events.map((event, index) => (
									<TabContent key={index} activeTab={openTab} index={index}>
										<EventCard event={event} />
									</TabContent>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
