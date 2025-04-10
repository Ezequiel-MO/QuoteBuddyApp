import { useEffect } from 'react'
import { useTransfers } from '../../toProject/transfers/render/context'
import { TransferAssistanceVendorFilter } from '../../toProject/transfers/filters'

export const TransferAsssistanceSelection = () => {
	const { freelancer, setTypeOfAssistance, typeOfAssistance, dispatch } =
		useTransfers()
	const isFreelancer = !freelancer ? true : false

	useEffect(() => {
		setTypeOfAssistance('guideOnBoard')
	}, [freelancer])

	const handleAddService = () => {
		dispatch({
			type: 'ADD_SERVICE_EVENT',
			payload: { freelancer, typeOfAssistance }
		})
	}

	return (
		<div>
			<TransferAssistanceVendorFilter />
			<button
				className="bg-orange-500 text-white-0 px-4 py-2 rounded my-2 mx-4 hover:bg-orange-600"
				type="button"
				onClick={() => handleAddService()}
				style={!freelancer ? { cursor: 'not-allowed' } : {}}
				disabled={isFreelancer}
			>
				ADD SERVICE
			</button>
		</div>
	)
}
