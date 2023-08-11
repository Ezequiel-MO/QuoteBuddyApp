import { filterStyles } from '../../../constants'

export const NrStarsFilter = ({ setNumberStars, numberStars }) => {
	const handleChange = (e) => {
		const value = e.target.value
		setNumberStars(value === 'none' ? undefined : value)
	}
	return (
		<div className={filterStyles['container']}>
			<form>
				<div className={filterStyles['innerContainer']}>
					<select
						id="nrStars"
						className={filterStyles['select']}
						value={numberStars}
						onChange={handleChange}
					>
						<option value="none">--- Filter by Category(All) ---</option>
						<option value={3}>--- 3-star ---</option>
						<option value={4}>--- 4-star ---</option>
						<option value={5}>--- 5-star ---</option>
					</select>
				</div>
			</form>
		</div>
	)
}
