import { useTransfers } from './context'

export const ServiceSection = () => {
	const { freelancer, typeOfAssistance } = useTransfers()

	return (
		<div className="bg-white-100 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				<li className="flex justify-between border-b-2 pb-2">
					<div className="flex-1 flex justify-start">
						<span className="font-medium text-gray-600">VENDOR:</span>
						<span className="text-gray-800 ml-2">{freelancer?.type}</span>
					</div>
					<div className="flex-1 flex justify-start">
						<span className="font-medium text-gray-600">
							TYPE OF ASSISTANCE:
						</span>
						<span className="text-gray-800 ml-2">{typeOfAssistance}</span>
					</div>
					<div className="flex-1 flex justify-start">
						<span className="font-medium text-gray-600">COST:</span>
						<span className="text-gray-800 ml-2">
							{freelancer?.halfDayRate}
						</span>
					</div>
				</li>
			</ul>
		</div>
	)
}
