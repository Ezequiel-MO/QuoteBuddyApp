import { FC } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { TransfersAddCard, TransfersModal } from '../../../add'
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { ITransfer } from '../../../../../interfaces'
import { TransferOutLinesRender } from './renderTransfers/TransferOutLinesRender'

export const TransferOutSchedule: FC = () => {
	const { currentProject } = useCurrentProject()

	const transfersOut: ITransfer[] = currentProject?.schedule[0]?.transfer_out
	const isEmptyTransfersOut: boolean = transfersOut?.length === 0

	return (
		<>
			<h1 className="underline text-orange-200 mb-2">TRANSFERS OUT</h1>
			<TransfersProvider>
				{isEmptyTransfersOut ? (
					<>
						<TransfersModal />
						<TransfersAddCard />
					</>
				) : (
					<TransferOutLinesRender transfersOut={transfersOut} />
				)}
			</TransfersProvider>
		</>
	)
}
