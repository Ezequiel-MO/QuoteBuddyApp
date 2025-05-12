import { useHotel } from '@screens/hotels/context/HotelsContext'
import { filterStyles } from '../../../constants'

export const NrStarsFilter = () => {
	const { state, handleChange } = useHotel()

	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="nrStars"
				name="numberStars"
				className={filterStyles['select']}
				value={state.currentHotel?.numberStars || 0}
				onChange={handleChange}
			>
				<option value={0}>--- Filter by Category(All) ---</option>
				<option value={1}>--- 1-star ---</option>
				<option value={2}>--- 2-star ---</option>
				<option value={3}>--- 3-star ---</option>
				<option value={4}>--- 4-star ---</option>
				<option value={5}>--- 5-star ---</option>
			</select>
		</div>
	)
}
