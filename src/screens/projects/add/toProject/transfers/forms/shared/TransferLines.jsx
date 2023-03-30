import { TransferLinesRender } from '../../render/TransferLine'

export const TransferLines = ({ transfersType, removeTransferLine }) => {
	return (
		<div className="ml-5">
			<TransferLinesRender
				transfersType={transfersType}
				removeTransferLine={removeTransferLine}
			/>
		</div>
	)
}
