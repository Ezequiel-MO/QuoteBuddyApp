import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TransferLinesRender } from "./renderTransfers/TransferLinesRender"

export const TransferInSchedule = () => {
	const { removeTransferFromSchedule, currentProject } = useCurrentProject()

	const handleDeleteTransfer = (typeOfTransfer) => {
		removeTransferFromSchedule(typeOfTransfer)
		toast.success('Transfer Removed', toastOptions)
	}

	// console.log(currentProject.schedule[0].transfer_in)

	const transferIn = currentProject.schedule[0].transfer_in

	if (currentProject['schedule'][0]?.transfer_in.length === 0) return
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
