import { Button } from '@mui/material'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'

export const ServiceSection = () => {
	const { state, dispatch } = useTransfers()
	const { services } = state

	return (
		<div className="my-2 bg-slate-400 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				{services?.map(({ freelancer, typeOfAssistance }, index) => (
					<li className="flex justify-between border-b-2 pb-2" key={index}>
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
						<Button
							onClick={() =>
								dispatch({
									type: 'REMOVE_SERVICE',
									payload: index
								})
							}
						>
							<Icon
								icon="fluent:delete-24-regular"
								color="#ea5933"
								width={20}
							/>
						</Button>
					</li>
				))}
			</ul>
		</div>
	)
}
