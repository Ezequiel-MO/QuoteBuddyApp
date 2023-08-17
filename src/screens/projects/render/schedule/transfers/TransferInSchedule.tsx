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
		<>
			<h1 className="underline text-orange-200 mb-2">TRANSFERS IN</h1>
			<TransfersProvider>
				{isEmptyTransfersIn ? (
					<>
						<TransfersAddCard typeTransfer='in' />
						<TransfersModal newTypeTransfer='in' />
					</>
				) : (
					<>
					    <TransfersModal newTypeTransfer='in' />
						<TransferInLinesRender transfersIn={transfersIn} />
					</>
				)}
			</TransfersProvider>
		</>
	)
}
