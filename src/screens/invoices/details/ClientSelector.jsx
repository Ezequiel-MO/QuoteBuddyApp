import Proptypes from 'prop-types'

export const ClientSelector = ({ isEditable }) => {
	return (
		<div
			className={
				isEditable
					? 'font-bold text-lg flex justify-between items-center bg-gray-200 p-4 rounded-md'
					: 'flex justify-between items-center border-b border-dashed'
			}
		>
			<div className={isEditable ? '' : 'font-medium text-lg'}>
				SEND INVOICE TO:
			</div>
			{isEditable ? (
				<>
					<input
						type="text"
						placeholder="Search Customer"
						className="ml-2 flex-1 rounded-md border border-gray-300 p-2"
					/>
					<select
						name="client"
						className="ml-2 w-1/2 rounded-md border border-gray-300 p-2"
					>
						<option value="client1">Client 1</option>
						<option value="client2">Client 2</option>
					</select>
				</>
			) : (
				<p className="ml-2 font-normal">client</p>
			)}
		</div>
	)
}

Proptypes.ClientSelector = {
	isEditable: Proptypes.bool.isRequired,
	handleChange: Proptypes.func.isRequired
}
