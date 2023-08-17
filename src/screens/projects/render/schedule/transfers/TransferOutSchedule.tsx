import { FC } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { TransfersAddCard, TransfersModal } from '../../../add'
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { ITransfer } from '../../../../../interfaces'
import { TransferOutLinesRender } from './renderTransfers/TransferOutLinesRender'

export const TransferOutSchedule: FC = () => {
	const { currentProject } = useCurrentProject()
	const lastIndex = currentProject?.schedule.length - 1
	const transfersOut: ITransfer[] = currentProject?.schedule[lastIndex]?.transfer_out
	const isEmptyTransfersOut: boolean = transfersOut?.length === 0

	return (
		<>
			<h1 className="underline text-orange-200 mb-2">TRANSFERS OUT</h1>
			<TransfersProvider>
				{isEmptyTransfersOut ? (
					<>
						<TransfersModal newTypeTransfer='out' />
						<TransfersAddCard typeTransfer='out' />
					</>
				) : (
					<>
						<TransfersModal newTypeTransfer='out' />
						<TransferOutLinesRender transfersOut={transfersOut} />
					</>
				)}
			</TransfersProvider>
		</>
	)
}
