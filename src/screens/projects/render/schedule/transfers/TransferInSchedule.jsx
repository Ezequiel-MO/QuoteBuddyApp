import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TransferLinesRender } from './renderTransfers/TransferLinesRender'
import { CardAdd } from '../../../../../components/atoms'

export const TransferInSchedule = () => {
	const { removeTransferFromSchedule, currentProject } = useCurrentProject()

	const handleDeleteTransfer = (typeOfTransfer) => {
		removeTransferFromSchedule(typeOfTransfer)
		toast.success('Transfer Removed', toastOptions)
	}

	const transferIn = currentProject.schedule[0]?.transfer_in

	if (currentProject['schedule'][0]?.transfer_in.length === 0) {
		return (
			<CardAdd
				name="Transfers In"
				route="project/schedule/transfers_in"
				timeOfEvent="transfer_in"
				dayOfEvent={0}
			/>
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
