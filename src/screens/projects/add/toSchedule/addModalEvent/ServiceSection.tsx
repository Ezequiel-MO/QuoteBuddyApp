import { useTransfers } from '../../toProject/transfers/render/context'
import { Icon } from '@iconify/react'

export const ServiceSection = () => {
	const { state, dispatch } = useTransfers()
	const { servicesEvent } = state

	const servicesRender = servicesEvent

	const handleDeletedFreelancer = (index: number) => {
		dispatch({
			type: 'REMOVE_SERVICE_EVENT',
			payload: index
		})
	}

	if (servicesRender.length === 0) return null

	return (
		<div className="my-4 bg-gray-750 p-4 rounded-lg shadow-md">
			<h3 className="text-sm font-medium text-gray-300 mb-2">Services</h3>
			<ul className="space-y-2">
				{servicesRender?.map(({ freelancer, typeOfAssistance }, index) => (
					<li
						key={index}
						className="flex justify-between items-center bg-gray-800 p-2 rounded"
					>
						<div className="text-sm text-white-0">
							<span>{freelancer?.type}</span> | <span>{typeOfAssistance}</span>{' '}
							| <span>€{freelancer?.halfDayRate}</span>
						</div>
						<button
							onClick={() => handleDeletedFreelancer(index)}
							className="text-red-500 hover:text-red-700 transition-colors duration-200"
						>
							<Icon icon="fluent:delete-24-regular" width={20} />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
