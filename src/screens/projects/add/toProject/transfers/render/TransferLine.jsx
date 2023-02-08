import accounting from 'accounting'
import { useTransfers } from '../../../../../../hooks'

export const TransferLinesRender = () => {
	const { transfersOut } = useTransfers()
	return (
		<>
			{transfersOut.map((line, index) => (
				<div key={index}>
					<div className="w-[720px] bg-black-50 text-white-0 my-2 p-2 rounded-lg grid grid-cols-4">
						<div>{line.from}</div>
						<div>{`${line.units} UNITS`}</div>
						<div>{`${line.type}`}</div>
						<div>{accounting.formatMoney(line.total, '  €')}</div>
					</div>
				</div>
			))}
		</>
	)
}
