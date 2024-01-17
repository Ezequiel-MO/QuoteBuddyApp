import { filterStyles } from '../../../constants'

interface Props {
	setNumberRooms: React.Dispatch<React.SetStateAction<number>>
	numberRooms: number
}

export const NrHotelRoomsFilter = ({ setNumberRooms, numberRooms }: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setNumberRooms(Number(value))
	}
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="numberRooms"
				value={numberRooms}
				className={filterStyles['select']}
				onChange={handleChange}
			>
				<option value={0}>--- Filter by Nr.Rooms(All) ---</option>
				<option value={50}>--- up to 50 ---</option>
				<option value={100}>--- up to 100 ---</option>
				<option value={200}>--- up to 200 ---</option>
				<option value={600}>--- up to 600 ---</option>
			</select>
		</div>
	)
}
