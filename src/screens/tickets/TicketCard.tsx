import { ITicket } from '@interfaces/ticket'
import { PriorityDisplay } from './PriorityDisplay'
import DeleteBlock from './DeleteBlock'
import { ProgressDisplay } from './ProgressDisplay'
import { StatusDisplay } from './StatusDisplay'

interface Props {
	ticket: ITicket
	onDelete: (id: string) => Promise<void>
}

export const TicketCard = ({ ticket, onDelete }: Props) => {
	function formatTimestamp(timestamp: number): string {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		}

		const date = new Date(timestamp)
		const formattedDate = date.toLocaleString('en-US', options)

		return formattedDate
	}
	const createdDateTime = formatTimestamp(ticket.createdAt)
	return (
		<div className="flex flex-col hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden border border-gray-200 m-2 sm:max-w-sm">
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<PriorityDisplay priority={ticket.priority} />
					<DeleteBlock id={ticket._id} onDelete={onDelete} />
				</div>
				<a
					href={`/app/tickets/${ticket._id}`}
					className="block hover:text-blue-600"
				>
					<h4 className="text-lg font-semibold mb-2">{ticket.title}</h4>
					<p className="text-sm text-gray-600 whitespace-pre-wrap mb-4">
						{ticket.description}
					</p>
				</a>
				<div className="flex justify-between items-end pt-4 border-t">
					<div>
						<p className="text-xs text-gray-500">{createdDateTime}</p>
						<p className="text-sm font-medium">
							<ProgressDisplay progress={ticket.progress} />
						</p>
					</div>
					<div>
						<p className="text-sm font-medium">
							<StatusDisplay status={ticket.status} />
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
