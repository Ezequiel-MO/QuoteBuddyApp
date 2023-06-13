export const InputHotelTable = ({
	style,
	type,
	data,
	handleChange,
	handleEdit,
	editMode
}) => {
	return (
		<div>
			<input
				style={style || { width: '70px' }}
				className="cursor-pointer"
				type="number"
				name={type}
				value={data ?? undefined}
				onChange={(e) => {
					handleChange(e)
				}}
				onBlur={() => {
					handleEdit(editMode, type)
				}}
				autoFocus
			/>
		</div>
	)
}
