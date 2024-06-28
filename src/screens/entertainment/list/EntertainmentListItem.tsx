import { useEffect, useState } from 'react'
import { AddToProjectButton, ButtonDeleteWithAuth } from '@components/atoms'
import { useNavigate } from 'react-router-dom'

import { ModalPriceEntertainment } from './modalPrice/ModalPriceEntertainment'
import { IEntertainment } from 'src/interfaces/entertainment'
import { listStyles } from 'src/constants/listStyles'
import { useEntertainment } from '../context/EntertainmentsContext'
import { formatYearMonthDate, getTailwindClassesForDate } from 'src/helper'

interface Props {
	entertainmentShow: IEntertainment
	canBeAddedToProject: boolean
}

export const EntertainmentListItem = ({
	entertainmentShow,
	canBeAddedToProject = false
}: Props) => {
	const { state, dispatch } = useEntertainment()
	const navigate = useNavigate()
	const [priceStyle, setPriceStyle] = useState('')
	const [open, setOpen] = useState(false)

	const handleNavigateToEntertainmentSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_ENTERTAINMENT',
			payload: entertainmentShow
		})
		navigate('/app/entertainment/specs')
	}

	useEffect(() => {
		let priceDueStatus = getTailwindClassesForDate(
			entertainmentShow.updatedAt as string
		)
		priceDueStatus === 'overdue'
			? setPriceStyle('text-red-500')
			: priceDueStatus === 'due-soon'
			? setPriceStyle('text-yellow-500')
			: setPriceStyle('text-green-500')
	}, [entertainmentShow])

	return (
		<>
			<ModalPriceEntertainment
				open={open}
				setOpen={setOpen}
				entertainmentShow={entertainmentShow}
			/>
			<tbody className={listStyles.tbody}>
				<tr className={listStyles.tr}>
					<td
						onClick={handleNavigateToEntertainmentSpecs}
						className="hover:text-blue-600 hover:underline cursor-pointer"
					>
						{entertainmentShow.name}
					</td>
					<td className={listStyles.td}>{entertainmentShow.city}</td>
					<td>{entertainmentShow.vendor}</td>
					<td>{entertainmentShow.category}</td>
					<td className={`${priceStyle} ${listStyles.td}`}>
						{formatYearMonthDate(entertainmentShow.updatedAt as string)}
					</td>
					<td></td>
					<td className="cursor-pointer">
						<ButtonDeleteWithAuth
							endpoint={'entertainments'}
							ID={entertainmentShow._id}
							setter={(updatedEntertainmentShows: IEntertainment[]) =>
								dispatch({
									type: 'SET_ENTERTAINMENTS',
									payload: updatedEntertainmentShows
								})
							}
							items={state.entertainments || []}
						/>
					</td>
					<AddToProjectButton
						canBeAddedToProject={canBeAddedToProject}
						onAdd={() => setOpen(true)}
					/>
				</tr>
			</tbody>
		</>
	)
}
