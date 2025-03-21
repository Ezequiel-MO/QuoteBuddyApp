import { useMemo, useEffect } from 'react'
import { ITransfer } from '../../../../interfaces'
import {
	MeetGreetRow,
	TransfersInAssistanceRow,
	TransfersInRow
} from '../rows/transfers_in'
import { useCurrentProject } from 'src/hooks'
import { SectionHeader } from './SectionHeader'

interface TransfersInSectionProps {
	transfers: ITransfer[]
	date: string
}

export const TransfersInSection = ({
	transfers,
	date
}: TransfersInSectionProps) => {
	const {
		currentProject: { schedule },
		updateBudgetTransfersInCost
	} = useCurrentProject()

	const groupedItems = useMemo(() => {
		const groups: { [key: string]: ITransfer[] } = {}
		transfers.forEach((item) => {
			const { _id } = item
			if (!groups[_id]) groups[_id] = []
			groups[_id].push(item)
		})
		return groups
	}, [transfers])

	useEffect(() => {
		updateBudgetTransfersInCost(schedule[0].transfer_in)
	}, [schedule[0].transfer_in])

	if (!transfers.length) return null

	return (
		<>
			{/* Section Header */}
			<SectionHeader title="Airport Arrival Transfers" type="transfer" />

			{/* Meet & Greet */}
			{transfers[0]?.meetGreet > 0 && (
				<MeetGreetRow firstItem={transfers[0]} date={date} />
			)}

			{/* Assistance */}
			{transfers[0]?.assistance > 0 && (
				<TransfersInAssistanceRow firstItem={transfers[0]} date={date} />
			)}

			{/* Transfers */}
			{Object.entries(groupedItems).map(([key, group]) => (
				<TransfersInRow items={group} key={key} date={date} />
			))}
		</>
	)
}
