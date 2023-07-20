import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TransferLinesRender } from './renderTransfers/TransferLinesRender'
import { TransfersAddCard, TransfersModal } from '../../../add'
import { TransfersProvider } from '../../../add/toProject/transfers/render/context'

export const TransferInSchedule = () => {
	const { removeTransferFromSchedule, currentProject } = useCurrentProject()

	const handleDeleteTransfer = (typeOfTransfer) => {
		removeTransferFromSchedule(typeOfTransfer)
		toast.success('Transfer Removed', toastOptions)
	}

	const transferIn = currentProject.schedule[0]?.transfer_in

	if (currentProject['schedule'][0]?.transfer_in.length === 0) {
		return (
			<TransfersProvider>
				<TransfersModal />
				<TransfersAddCard />
			</TransfersProvider>
		)
	}
	return (
		<>
			<TransferLinesRender
				transfersType={transferIn}
				handleDeleteTransfer={handleDeleteTransfer}
				type="transfer_in"
			/>
		</>
	)
}
