import { filterStyles } from '../../../constants'

export const PriceFilter = ({ setPrice, price, otherPrices }) => {
	if (otherPrices) {
		return (
			<div className={filterStyles['container']}>
				<div className={filterStyles['innerContainer']}>
					<select
						id="price"
						className={filterStyles['select']}
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
					>
						<option value="none">--- Filter by price(all) ---</option>
						{otherPrices.map((el, index) => (
							<option value={el.value} key={index}>
								{el.name}
							</option>
						))}
					</select>
				</div>
			</div>
		)
	}

	return (
		<div className={filterStyles['container']}>
			<form>
				<div className={filterStyles['innerContainer']}>
					<select
						id="price"
						className={filterStyles['select']}
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
					>
						<option value="none">--- Filter by price ---</option>
						<option value={25}>Less than €25</option>
						<option value={40}>Less than €40</option>
						<option value={60}>Less than €60</option>
					</select>
				</div>
			</form>
		</div>
	)
}
