import { useMemo, useEffect } from 'react'
import { ITransfer } from '../../../../interfaces'
import {
	DispatchRow,
	TransfersOutAssistanceRow,
	TransfersOutRow
} from '../rows/transfers_out'
import { useCurrentProject } from 'src/hooks'
import { SectionHeader } from './SectionHeader'

interface TransfersOutSectionProps {
	transfers: ITransfer[]
	date: string
}

export const TransfersOutSection = ({
	transfers,
	date
}: TransfersOutSectionProps) => {
	const {
		currentProject: { schedule },
		updateBudgetTransfersOutCost
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
		updateBudgetTransfersOutCost(schedule[schedule.length - 1].transfer_out)
	}, [schedule[schedule.length - 1].transfer_out])

	if (!transfers.length) return null

	return (
		<>
			{/* Section Header */}
			<SectionHeader title="Airport Departure Transfers" type="transfer" />

			{/* Dispatch */}
			{transfers[0]?.meetGreet > 0 && (
				<DispatchRow lastItem={transfers[0]} date={date} />
			)}

			{/* Assistance */}
			{transfers[0]?.assistance > 0 && (
				<TransfersOutAssistanceRow firstItem={transfers[0]} date={date} />
			)}

			{/* Transfers */}
			{Object.entries(groupedItems).map(([key, group]) => (
				<TransfersOutRow key={key} items={group} date={date} />
			))}
		</>
	)
}
