import { Icon } from '@iconify/react'
import { useTransfers } from './context'
import { Button } from '@mui/material'
import {REMOVE_TRANSFER_IN , REMOVE_TRANSFER_OUT} from "./actionTypes"

export const TransferSection = () => {
	const { state, dispatch , typeTransfer } = useTransfers()
	const { transfersIn , transfersOut } = state
	const transfersRender = typeTransfer === "in" ? transfersIn : transfersOut

	const handleDeletedTransfer = (index:number) =>{
		if(typeTransfer === "in"){
			dispatch({
				type: REMOVE_TRANSFER_IN,
				payload: index
			})
		}
		if(typeTransfer === "out"){
			dispatch({
				type: REMOVE_TRANSFER_OUT,
				payload: index
			})
		}
	}

	return (
		<div className="my-2 bg-slate-400 text-white-0 p-6 rounded-lg shadow-md">
			<ul className="space-y-4">
				{transfersRender.map(({ company, vehicleCapacity }, index) => (
					<li className="flex justify-between border-b-2 pb-2" key={index}>
						<div className="flex-1 flex justify-start">
							<span className="font-medium text-gray-600">VENDOR:</span>
							<span className="text-gray-800 ml-2">{company}</span>
						</div>
						<div className="flex-1 flex justify-start">
							<span className="font-medium text-gray-600">VEHICLE SIZE:</span>
							<span className="text-gray-800 ml-2">{vehicleCapacity}</span>
						</div>
						<div className="flex-1 flex justify-start">
							<span className="font-medium text-gray-600">
								TYPE OF SERVICE:
							</span>
							<span className="text-gray-800 ml-2">Transfer {typeTransfer}</span>
						</div>
						<Button
							onClick={() =>  handleDeletedTransfer(index)
								// dispatch({
								// 	type: REMOVE_TRANSFER_IN,
								// 	payload: index
								// })
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
