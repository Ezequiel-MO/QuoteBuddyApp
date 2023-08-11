import { TransferAssistanceVendorFilter } from '../../../../../../components/atoms'
import { TypeOfTransfersAssistanceFilter } from '../../../../../../components/atoms/filters/TypeofTransferAssistanceFilter'
import { useTransfers } from './context'
import {ADD_SERVICE_IN , ADD_SERVICE_OUT} from "./actionTypes"

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
		console.log(typeTransfer)
		setSelectedSection('service')
		if (!freelancer || !typeOfAssistance) return
		if(typeTransfer === "in"){
			dispatch({
				type: ADD_SERVICE_IN,
				payload: { freelancer, typeOfAssistance }
			})
		}
		if(typeTransfer === "out"){
			dispatch({
				type:ADD_SERVICE_OUT,
				payload:{freelancer , typeOfAssistance}
			})
		}
	}
	return (
		<div>
			<TransferAssistanceVendorFilter />
			<TypeOfTransfersAssistanceFilter
				typeOfAssistance={typeOfAssistance}
				setTypeOfAssistance={setTypeOfAssistance}
			/>
			<button
				className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
				onClick={handleAddService}
			>
				ADD SERVICE
			</button>
		</div>
	)
}
