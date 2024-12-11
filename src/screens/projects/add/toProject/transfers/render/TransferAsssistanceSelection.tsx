import { TransferAssistanceVendorFilter } from '../../../../../../components/atoms'
import { TypeOfTransfersAssistanceFilter } from '../../../../../../components/atoms/filters/TypeofTransferAssistanceFilter'
import { useTransfers } from './context'
import { ADD_SERVICE_IN, ADD_SERVICE_OUT } from './actionTypes'

export const TransferAsssistanceSelection = () => {
	const {
		typeOfAssistance,
		setTypeOfAssistance,
		setSelectedSection,
		freelancer,
		dispatch,
		typeTransfer
	} = useTransfers()

	const handleAddService = () => {
		setSelectedSection('service')
		if (!freelancer || !typeOfAssistance) return
		if (typeTransfer === 'in') {
			dispatch({
				type: ADD_SERVICE_IN,
				payload: { freelancer, typeOfAssistance }
			})
		}
		if (typeTransfer === 'out') {
			dispatch({
				type: ADD_SERVICE_OUT,
				payload: { freelancer, typeOfAssistance }
			})
		}
	}

	return (
		<div className="flex flex-col space-y-2">
			<div className="w-full">
				<TransferAssistanceVendorFilter />
			</div>
			<div className="w-full">
				<TypeOfTransfersAssistanceFilter
					typeOfAssistance={typeOfAssistance}
					setTypeOfAssistance={setTypeOfAssistance}
					typeTransfer={typeTransfer}
				/>
			</div>
			<div className="w-full">
				<button
					className="bg-orange-500 text-white px-4 py-2 ml-4 rounded hover:bg-orange-600"
					onClick={handleAddService}
				>
					ADD SERVICE
				</button>
			</div>
		</div>
	)
}
