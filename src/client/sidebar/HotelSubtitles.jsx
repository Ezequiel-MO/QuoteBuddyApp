import { Link } from 'react-scroll'
import { useContextBudget } from '../../budget/context/BudgetContext'
import { SET_SELECTED_HOTEL } from '../../budget/context/budgetReducer'

export const HotelSubtitles = ({
	title,
	menuOpen,
	setMenuOpen,
	hotels,
	activeTab,
	handleChange
}) => {
	const { dispatch } = useContextBudget()
	if (!hotels?.length) return null

	const handleSelectedHotel = (index, hotel) => {
		dispatch({
			type: SET_SELECTED_HOTEL,
			payload: {
				selectedHotel: hotel
			}
		})
		handleChange(index + 1)
	}

	return (
		<div
			id={title}
			className={`transition-all ease-in-out duration-300 ${
				menuOpen ? 'block' : 'hidden'
			}`}
		>
			{title === 'hotels' && (
				<div
					className="flex flex-col space-y-4 p-4 ml-4 transition-all ease-in-out duration-300"
					onMouseEnter={() => setMenuOpen(true)}
					onMouseLeave={() => setMenuOpen(false)}
				>
					{hotels.map((hotel, index) => (
						<Link
							key={index}
							to={`${hotel._id}`}
							spy={true}
							smooth={true}
							duration={700}
							offset={-100}
						>
							<p
								onClick={() => handleSelectedHotel(index, hotel)}
								className={`font-body ${
									activeTab === index + 1
										? 'text-gray-700 dark:text-slate-50'
										: 'text-gray-50'
								} hover:text-orange-50 cursor-pointer text-sm`}
							>
								{hotel.name.replace(/^\w/, (c) => c.toUpperCase())}
							</p>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
