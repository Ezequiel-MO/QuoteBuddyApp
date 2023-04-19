export const MatchingClientSelect = ({
	searchTerm,
	handleChange,
	filteredOptions
}) => {
	return (
		<select
			id="country"
			className="flex-1 py-1 mt-6 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer "
			onChange={handleChange}
		>
			{!searchTerm && <option value="none">Select Client/s</option>}
			{filteredOptions.length === 0 && (
				<option value="none">no client exists</option>
			)}
			{filteredOptions?.map((el) => {
				return (
					<option
						key={el._id}
						value={`${el._id} ${el.firstName} ${el.familyName}`}
						onClick={handleChange}
					>
						{`${el.firstName} ${el.familyName}`}
					</option>
				)
			})}
		</select>
	)
}
