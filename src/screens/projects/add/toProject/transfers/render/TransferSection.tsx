import { useEffect } from "react"
import { Icon } from '@iconify/react'
import { useTransfers, } from './context'
import { Button } from '@mui/material'
import { REMOVE_TRANSFER_IN, REMOVE_TRANSFER_OUT } from "./actionTypes"
import { useCurrentProject } from '../../../../../../hooks'
import { ITransfer } from '../../../../../../interfaces'

export const TransferSection = () => {
	const { state, dispatch, typeTransfer } = useTransfers()
	const { transfersIn, transfersOut } = state
	const { currentProject } = useCurrentProject()
	let transfersRender = typeTransfer === "in" ? transfersIn : transfersOut

	useEffect(() => {
		if (typeTransfer === "in" && transfersRender.length === 0) {
			const transfersInProject: ITransfer[] = currentProject?.schedule[0]?.transfer_in
			dispatch({
				type: "UPDATE_TRANSFER_IN",
				payload: { transferObject: transfersInProject }
			})
		}
		if (typeTransfer === "out" && transfersRender.length === 0) {
			const lastIndex = currentProject?.schedule.length - 1
			const transfersOutProject: ITransfer[] = currentProject?.schedule[lastIndex]?.transfer_out
			dispatch({
				type: "UPDATE_TRANSFER_OUT",
				payload: { transferObject: transfersOutProject }
			})
		}
	}, [typeTransfer])


	const handleDeletedTransfer = (index: number) => {
		if (typeTransfer === "in") {
			dispatch({
				type: REMOVE_TRANSFER_IN,
				payload: index
			})
		}
		if (typeTransfer === "out") {
			dispatch({
				type: REMOVE_TRANSFER_OUT,
				payload: index
			})
		}
	}

	if (transfersRender.length === 0) return null

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
							onClick={() => handleDeletedTransfer(index)}
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
