import accounting from 'accounting'

export const TransferLine = ({ line }) => {
	return (
		<div className="w-[720px] bg-black-50 text-white-0 my-2 p-2 rounded-lg grid grid-cols-4">
			<div>{line.from}</div>
			<div>{`${line.units} UNITS`}</div>
			<div>{`${line.type}`}</div>
			<div>{accounting.formatMoney(line.total, '  €')}</div>
		</div>
	)
}
