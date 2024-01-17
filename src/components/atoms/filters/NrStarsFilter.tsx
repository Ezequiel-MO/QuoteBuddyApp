import { filterStyles } from '../../../constants'

interface Props {
	setNumberStars: React.Dispatch<React.SetStateAction<number>>
	numberStars: number
}

export const NrStarsFilter = ({ setNumberStars, numberStars }: Props) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = Number(e.target.value) as 0 | 1 | 2 | 3 | 4 | 5
		setNumberStars(value)
	}
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="nrStars"
				className={filterStyles['select']}
				value={numberStars}
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
