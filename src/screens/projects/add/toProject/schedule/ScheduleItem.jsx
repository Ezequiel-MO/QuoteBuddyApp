import { dayEventOrderedItemData } from '../../../../../helper/scheduleData'
import { DayEventOrderedItem } from './DayEventOrderedItem'
import { SvgIcon } from './SvgIcon'
import { TransferItem } from './TransferItem'

export const ScheduleItem = ({ day, index }) => {
	const { date } = day

	return (
		<li>
			<div className="md:flex flex-start">
				<SvgIcon />
				<div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
					<div className="flex justify-between mb-4">
						<h3 className="font-medium text-orange-50 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-lg">
							{date}
						</h3>
					</div>

					<ol>
						{dayEventOrderedItemData.map((item) => (
							<DayEventOrderedItem
								key={`${item.timeOfEvent}-${index}`}
								{...item}
								dayOfEvent={index}
							/>
						))}

						{date === 'Arrival Day' ? (
							<TransferItem
								route="project/schedule/transfers_in"
								dayOfEvent={0}
								timeOfEvent="transfer_in"
								text="transfer in"
							/>
						) : date === 'Departure Day' ? (
							<TransferItem
								route="project/schedule/transfers_out"
								dayOfEvent={index}
								timeOfEvent="transfer_out"
								text="transfer out"
							/>
						) : null}
					</ol>
				</div>
			</div>
		</li>
	)
}
