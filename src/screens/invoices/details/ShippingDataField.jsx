export const ShippingDataField = ({
	label,
	name,
	value,
	handleChange,
	isEditable
}) => (
	<div className="my-1 w-[700px] font-bold text-lg flex justify-between items-center bg-gray-200 p-4 rounded-md">
		{label}:
		{isEditable ? (
			<input
				type={`${name === 'date' ? 'date' : 'text'}`}
				name={name}
				className="ml-2 font-normal text-gray-700 cursor-pointer w-full rounded-md border border-gray-300 p-2"
				value={value}
				onChange={handleChange}
			/>
		) : (
			<p className="ml-2 text-gray-700">{value}</p>
		)}
	</div>
)
