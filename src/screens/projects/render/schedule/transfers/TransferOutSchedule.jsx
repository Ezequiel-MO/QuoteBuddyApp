import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TransferLinesRender } from "./renderTransfers/TransferLinesRender"

export const TransferOutSchedule = () => {
	const { currentProject, removeTransferFromSchedule } = useCurrentProject()

	const handleDeleteTransfer = (typeOfTransfer) => {
		removeTransferFromSchedule(typeOfTransfer)
		toast.success('Transfer Removed', toastOptions)
	}
	
	// console.log(currentProject['schedule'][currentProject['schedule'].length - 1]?.transfer_out)

	const transferOut = currentProject['schedule'][currentProject['schedule'].length - 1]?.transfer_out

	if (
		currentProject['schedule'][currentProject['schedule'].length - 1]
			?.transfer_out.length === 0
	)
		return
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
