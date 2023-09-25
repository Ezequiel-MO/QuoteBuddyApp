import React, { ChangeEvent } from 'react'
import styles from '../FreeLancer.module.css'
import { IFreelancer } from '@interfaces/freelancer'

interface Props {
	typeFreeLancer: string[]
	type: string
	handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectTypeFreelancer: React.FC<Props> = ({
	typeFreeLancer,
	type,
	handleChange
}) => {
	return (
		<div>
			<select
				name="type"
				id="type"
				value={type}
				className={styles.selectType}
				onChange={handleChange}
			>
				<option value="">Select a type the freelancer </option>
				{typeFreeLancer.map((el, index) => {
					return (
						<option key={index} value={el}>
							{el}
						</option>
					)
				})}
			</select>
		</div>
	)
}
