import { useEffect } from 'react'
import { EditTicketForm } from './EditTicketForm'
import { useGetTicketById } from './useGetTicketById'
import { ITicket } from '@interfaces/ticket'
import { useParams } from 'react-router-dom'

export const TicketPage = () => {
	const { ticketId } = useParams<{ ticketId: string }>()
	const { ticket, getTicketById } = useGetTicketById(ticketId!)

	useEffect(() => {
		if (ticketId !== 'new') {
			getTicketById(ticketId!)
		}
	}, [ticketId])

	const emptyTicket: ITicket = {
		_id: 'new',
		nr: 0,
		title: '',
		description: '',
		category: 'Software Problem',
		priority: 1,
		progress: 0,
		status: 'not started',
		active: false,
		createdAt: 0
	}

	const ticketToPass = ticket ?? emptyTicket

	return (
		<>
			<EditTicketForm ticket={ticketToPass as ITicket} />
		</>
	)
}
