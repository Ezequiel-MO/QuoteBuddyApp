import { Button } from '@mui/material'
import { useTransfers } from './context'
import { Icon } from '@iconify/react'
import { REMOVE_SERVICE_IN, REMOVE_SERVICE_OUT } from "./actionTypes"

export const ServiceSection = () => {
	const { state, dispatch , typeTransfer } = useTransfers()
	const { servicesIn , servicesOut } = state

	const servicesRender = typeTransfer === "in" ? servicesIn : servicesOut

	const handleDeletedFreelancer = (index:number) =>{
		if(typeTransfer === "in"){
			dispatch({
				type: REMOVE_SERVICE_IN,
				payload: index
			})
		}
		if(typeTransfer === "out"){
			dispatch({
				type: REMOVE_SERVICE_OUT,
				payload: index
			})
		}
	}

	return (
		<div className="my-2 bg-slate-400 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				{servicesRender?.map(({ freelancer, typeOfAssistance }, index) => (
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
							onClick={() => handleDeletedFreelancer(index) }
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
