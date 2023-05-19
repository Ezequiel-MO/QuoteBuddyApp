import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TransferLinesRender } from './renderTransfers/TransferLinesRender'
import { CardAdd } from '../../../../../components/atoms'

export const TransferOutSchedule = () => {
	const { currentProject, removeTransferFromSchedule } = useCurrentProject()

	const handleDeleteTransfer = (typeOfTransfer) => {
		removeTransferFromSchedule(typeOfTransfer)
		toast.success('Transfer Removed', toastOptions)
	}

	const transferOut =
		currentProject['schedule'][currentProject['schedule'].length - 1]
			?.transfer_out

	if (
		currentProject['schedule'][currentProject['schedule'].length - 1]
			?.transfer_out.length === 0
	) {
		return (
			<CardAdd
				name="Transfers Out"
				route="project/schedule/transfers_out"
				timeOfEvent="transfer_out"
				dayOfEvent={currentProject['schedule'].length - 1}
			/>
		)
	}

	return (
		<>
			<TransferLinesRender
				transfersType={transferOut}
				handleDeleteTransfer={handleDeleteTransfer}
				type="transfer_out"
			/>
		</>
	)
}
