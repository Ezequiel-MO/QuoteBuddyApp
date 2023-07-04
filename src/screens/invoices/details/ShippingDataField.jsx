export const ShippingDataField = ({
	label,
	name,
	value,
	handleChange,
	isEditable
}) => (
	<div
		className={`
			${
				isEditable
					? 'mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 p-4 rounded-md'
					: 'flex justify-between items-center border-b border-dashed border-gray-300'
			}
				`}
	>
		<div className={isEditable ? '' : 'font-medium text-lg'}>{label}:</div>
		{isEditable ? (
			<input
				type={`${name === 'date' ? 'date' : 'text'}`}
				name={name}
				className="ml-2 font-normal text-gray-700 cursor-pointer w-full rounded-md border border-gray-300 p-2"
				value={value}
				onChange={handleChange}
			/>
		) : (
			<p
				className={
					isEditable
						? 'ml-2  text-gray-700'
						: 'ml-2 text-lg text-right text-black-0'
				}
			>
				{value}
			</p>
		)}
	</div>
)
