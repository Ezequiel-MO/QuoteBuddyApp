export const AddHotelButton = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="my-2 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
		>
			Add Hotel from DATABASE
		</button>
	)
}
