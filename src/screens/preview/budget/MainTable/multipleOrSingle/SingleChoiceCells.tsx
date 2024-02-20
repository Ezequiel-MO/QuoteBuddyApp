import accounting from 'accounting'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface SingleChoiceCellsProps {
	pax: number
	date: string
	options: IEvent[] | IRestaurant[]
	description: string
	id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
}

export const SingleChoiceCells = ({
	pax,
	date,
	options,
	description,
	id
}: SingleChoiceCellsProps) => {
	const optionName = options[0]?.name ?? ''
	const optionPrice = options[0]?.price ?? 0
	return (
		<>
			<td>{description}</td>
			<td>
				<span>{optionName}</span>
			</td>
			<td>{pax}</td>
			<td>{accounting.formatMoney(optionPrice, '€')}</td>
			<td>{accounting.formatMoney(pax * optionPrice, '€')}</td>
		</>
	)
}
