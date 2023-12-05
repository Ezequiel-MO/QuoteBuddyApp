import { Spinner } from '@components/atoms'
import { useGetTickets } from './useGetTickets'
import { TicketCard } from './TicketCard'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions } from 'src/helper/toast'

export const TicketHome = () => {
	const { isLoading, tickets, getTickets: refetchTickets } = useGetTickets()

	const handleDeleteTicket = async (id: string) => {
		try {
			await baseAPI.delete(`tickets/${id}`)
			toast.success('Ticket removed')
			refetchTickets()
		} catch (error) {
			toast.error('Was not able to remove ticket', errorToastOptions)
		}
	}

	const uniqueCategories = [
		...new Set(tickets?.map(({ category }) => category))
	]
	return (
		<div className="p-5">
			<div>
				{isLoading ? (
					<Spinner />
				) : tickets ? (
					<div>
						{tickets &&
							uniqueCategories?.map((uniqueCategory, categoryIndex) => (
								<div key={categoryIndex} className="mb-4">
									<h2>{uniqueCategory}</h2>
									<div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
										{tickets
											.filter((ticket) => ticket.category === uniqueCategory)
											.map((filteredTicket, _index) => (
												<TicketCard
													key={_index}
													ticket={filteredTicket}
													onDelete={handleDeleteTicket}
												/>
											))}
									</div>
								</div>
							))}
					</div>
				) : null}
			</div>
		</div>
	)
}
