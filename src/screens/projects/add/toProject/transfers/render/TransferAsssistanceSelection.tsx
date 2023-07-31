import { TransferAssistanceVendorFilter } from '../../../../../../components/atoms'
import { TypeOfTransfersAssistanceFilter } from '../../../../../../components/atoms/filters/TypeofTransferAssistanceFilter'
import { useTransfers } from './context'

export const TransferAsssistanceSelection = () => {
	const { typeOfAssistance, setTypeOfAssistance, setSelectedSection } =
		useTransfers()
	return (
		<div>
			<TransferAssistanceVendorFilter />
			<TypeOfTransfersAssistanceFilter
				typeOfAssistance={typeOfAssistance}
				setTypeOfAssistance={setTypeOfAssistance}
			/>
			<button
				className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
				onClick={() => setSelectedSection('service')}
			>
				ADD SERVICE
			</button>
		</div>
	)
}
