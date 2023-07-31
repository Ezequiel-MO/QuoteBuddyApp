import { useTransfers } from './context'

export const TransfersModalBody = () => {
	const {
		company,
		vehicleCapacity,
		freelancer,
		service,
		typeOfAssistance,
		selectedSection
	} = useTransfers()

	if (!selectedSection) return null

	return (
		<div className="bg-white p-4 rounded shadow-lg">
			<ul className="list-inside space-y-2">
				<li className="flex justify-between border-b pb-2">
					<div className="flex-1 flex justify-between">
						<span className="font-semibold">Vendor:</span>
						<span>
							{selectedSection === 'transfer' ? company : freelancer?.type}
						</span>
					</div>
					<div className="flex-1 flex justify-between">
						<span className="font-semibold">
							{selectedSection === 'transfer'
								? 'Vehicle Size:'
								: 'Type of Assistance:'}
						</span>
						<span>
							{selectedSection === 'transfer'
								? vehicleCapacity
								: typeOfAssistance}
						</span>
					</div>
					<div className="flex-1 flex justify-between">
						<span className="font-semibold">
							{selectedSection === 'transfer' ? 'Type of Service:' : 'Cost:'}
						</span>
						<span>
							{selectedSection === 'transfer'
								? service
								: freelancer?.halfDayRate}
						</span>
					</div>
				</li>
			</ul>
		</div>
	)
}
