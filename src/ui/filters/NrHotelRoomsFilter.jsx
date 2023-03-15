export const NrHotelRoomsFilter = ({ setNumberRooms, numberRooms }) => {
	const handleChange = (e) => {
		const value = e.target.value
		setNumberRooms(value === 'none' ? undefined : Number(value))
	}
	return (
		<div className="w-60 max-w-sm my-2 ml-0 mr-0">
			<form>
				<div className="flex items-center gap-2">
					<select
						id="numberRooms"
						value={numberRooms}
						className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
						onChange={handleChange}
					>
						<option value="none">--- Filter by Nr.Rooms(All) ---</option>
						<option value={50}>--- up to 50 ---</option>
						<option value={100}>--- up to 100 ---</option>
						<option value={200}>--- up to 200 ---</option>
						<option value={600}>--- up to 600 ---</option>
					</select>
				</div>
			</form>
		</div>
	)
}
