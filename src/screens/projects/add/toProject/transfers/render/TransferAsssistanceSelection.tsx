import { TransferAssistanceVendorFilter } from '../../../../../../components/atoms'
import { TypeOfTransfersAssistanceFilter } from '../../../../../../components/atoms/filters/TypeofTransferAssistanceFilter'
import { useTransfers } from './context'

export const TransferAsssistanceSelection = () => {
	const { typeOfAssistance, setTypeOfAssistance } = useTransfers()
	return (
		<div>
			<TransferAssistanceVendorFilter />
			<TypeOfTransfersAssistanceFilter
				typeOfAssistance={typeOfAssistance}
				setTypeOfAssistance={setTypeOfAssistance}
			/>
			<div>
				<p>ADD SERVICE</p>
			</div>
		</div>
	)
}
