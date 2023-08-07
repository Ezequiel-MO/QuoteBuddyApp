import { FC } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import { TransfersAddCard, TransfersModal } from '../../../add'
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'
import { TransferInLinesRender } from './renderTransfers/TransferInLinesRender'
import { ITransfer } from '../../../../../interfaces'

export const TransferInSchedule: FC = () => {
	const { currentProject } = useCurrentProject()

	const transfersIn: ITransfer[] = currentProject?.schedule[0]?.transfer_in
	const isEmptyTransfersIn: boolean = transfersIn?.length === 0

	return (
		<TransfersProvider>
			{isEmptyTransfersIn ? (
				<>
					<TransfersModal />
					<TransfersAddCard />
				</>
			) : (
				<TransferInLinesRender transfersIn={transfersIn} />
			)}
		</TransfersProvider>
	)
}
