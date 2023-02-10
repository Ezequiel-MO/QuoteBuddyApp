import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { useTransfers } from '../../../../../../hooks'

export const TransferLinesRender = () => {
	const { transfersOut, removeTransferLine } = useTransfers()
	return (
		<>
			{transfersOut.map((line, index) => (
				<div key={index}>
					<div className="w-[720px] bg-black-50 text-white-0 my-2 p-2 rounded-lg grid grid-cols-6">
						<div>{line.from}</div>
						<div>{`${line.units} UNITS`}</div>
						<div>{`${line.type}`}</div>
						<div>
							{line.type === 'Transfer Out'
								? `${line.vehicleCapacity} SEATER`
								: ''}
						</div>
						<div>{accounting.formatMoney(line.total, '  €')}</div>
						<div
							onClick={() =>
								removeTransferLine({ vehicleCapacity: line?.vehicleCapacity })
							}
							className="cursor-pointer"
						>
							<Icon icon="mdi:delete" className="text-red-500" />
						</div>
					</div>
				</div>
			))}
		</>
	)
}
