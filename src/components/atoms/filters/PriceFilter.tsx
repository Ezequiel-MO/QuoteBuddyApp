import React, { ChangeEvent } from 'react'
import { filterStyles } from '../../../constants'

type PriceFilterProps = {
	setPrice: (e: ChangeEvent<HTMLSelectElement>) => void
	price: number
	otherPrices?: { value: number; name: string }[]
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
	setPrice,
	price,
	otherPrices = []
}) => {
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="price"
				name="price"
				className={filterStyles['select']}
				value={price}
				onChange={setPrice}
			>
				<option value={0}>--- Filter by price ---</option>
				{otherPrices.length > 0 ? (
					otherPrices.map((el, index) => (
						<option value={el.value} key={index}>
							{el.name}
						</option>
					))
				) : (
					<>
						<option value={25}>Less than €25</option>
						<option value={40}>Less than €40</option>
						<option value={60}>Less than €60</option>
					</>
				)}
			</select>
		</div>
	)
}
