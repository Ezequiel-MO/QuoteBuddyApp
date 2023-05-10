export const ShippingDataField = ({
	label,
	name,
	value,
	handleChange,
	isEditable
}) => (
	<div className="font-bold leading-none flex">
		{label}:
		{isEditable ? (
			<input
				type={`${name === 'date' ? 'date' : 'text'}`}
				name={name}
				className="ml-2 font-normal cursor-pointer w-[500px]"
				value={value}
				onChange={handleChange}
			/>
		) : (
			<p className="ml-2 font-normal">{value}</p>
		)}
	</div>
)
