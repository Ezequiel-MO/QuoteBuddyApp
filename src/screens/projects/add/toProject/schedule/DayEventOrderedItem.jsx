import { useNavigate } from 'react-router-dom'
export const DayEventOrderedItem = ({
	route,
	timeOfEvent,
	text,
	dayOfEvent
}) => {
	const navigate = useNavigate()
	return (
		<li
			className="text-black-50 hover:text-orange-50 cursor-pointer"
			onClick={() =>
				navigate(`/app/${route}`, {
					state: {
						timeOfEvent,
						dayOfEvent
					}
				})
			}
		>
			{`Add ${text}`}
		</li>
	)
}
