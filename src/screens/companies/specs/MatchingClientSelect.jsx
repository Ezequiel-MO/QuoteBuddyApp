export const MatchingClientSelect = ({
	searchTerm,
	handleChange,
	filteredOptions
}) => {
	return (
		<div className="relative inline-flex w-full mt-6">
			<svg
				className="w-4 h-4 absolute top-4 right-2 pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 412 232"
			>
				<path
					d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.763-9.763 25.592 0 35.355l181 181c9.763 9.763 25.592 9.763 35.355 0l181-181c9.762-9.763 9.762-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
					fill="#648299"
					fillRule="nonzero"
				/>
			</svg>
			<select
				id="country"
				className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white-0 hover:border-gray-400 focus:outline-none appearance-none w-full"
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
		</div>
	)
}
