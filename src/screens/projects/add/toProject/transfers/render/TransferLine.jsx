import accounting from 'accounting'
import { Icon } from '@iconify/react'

export const TransferLinesRender = ({ transfersType, removeTransferLine }) => {
	return (
		<>
			{transfersType.map((line, index) => (
				<div key={index}>
					<div className="w-[800px] bg-black-50 text-white-0 my-2 p-2 rounded-lg grid grid-cols-7">
						<div>{line.from}</div>
						<div>{`${line.units} UNITS`}</div>
						<div>{`${line.type}`}</div>
						<div>{line.company}</div>
						<div>
							{line.type === 'Transfer Out' || line.type === "Transfer in"
								? `${line.vehicleCapacity} SEATER`
								: ''}
						</div>
						<div>{accounting.formatMoney(line.total, '  €')}</div>
						<div
							onClick={() =>
								removeTransferLine({ vehicleCapacity: line?.vehicleCapacity ,idCompany: line?.idCompany  })
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
