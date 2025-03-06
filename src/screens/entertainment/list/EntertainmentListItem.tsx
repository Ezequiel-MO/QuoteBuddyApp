import { useEffect, useState, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddToProjectButton, ButtonDeleteWithAuth } from '@components/atoms'
import { ModalPriceEntertainment } from './modalPrice/ModalPriceEntertainment'
import { IEntertainment } from 'src/interfaces/entertainment'
import { listStyles } from 'src/constants/listStyles'
import { useEntertainment } from '../context/EntertainmentsContext'
import { formatYearMonthDate, getTailwindClassesForDate } from 'src/helper'

interface EntertainmentListItemProps {
	item: IEntertainment
	canBeAddedToProject: boolean
}

export const EntertainmentListItem: FC<EntertainmentListItemProps> = ({
	item: entertainmentShow,
	canBeAddedToProject = false
}) => {
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
						endpoint="entertainments"
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
				{canBeAddedToProject && (
					<AddToProjectButton onAddToProject={() => setOpen(true)} />
				)}
			</tr>
		</>
	)
}
