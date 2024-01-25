import { useState } from 'react'
import { AddToProjectButton, ButtonDeleteWithAuth } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { formatYearMonthDate } from 'src/helper'
import { ModalPriceEntertainment } from './modalPrice/ModalPriceEntertainment'
import { IEntertainment } from 'src/interfaces/entertainment'
import { listStyles } from 'src/constants/listStyles'

interface Props {
	entertainmentShow: IEntertainment
	entertainmentShows: IEntertainment[]
	setEntertainmentShows: React.Dispatch<React.SetStateAction<IEntertainment[]>>
	canBeAddedToProject: boolean
}

export const EntertainmentListItem = ({
	entertainmentShow,
	entertainmentShows,
	setEntertainmentShows,
	canBeAddedToProject
}: Props) => {
	const navigate = useNavigate()
	const [open, setOpen] = useState<boolean>(false)
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
						onClick={() =>
							navigate(`/app/entertainment/specs`, {
								state: { entertainmentShow }
							})
						}
						className="hover:text-blue-600 hover:underline cursor-pointer"
					>
						{entertainmentShow.name}
					</td>
					<td className={listStyles.td}>{entertainmentShow.city}</td>
					<td>{entertainmentShow.vendor}</td>
					<td>{entertainmentShow.category}</td>

					<td></td>
					<td className="cursor-pointer">
						<ButtonDeleteWithAuth
							endpoint={'entertainments'}
							ID={entertainmentShow._id}
							setter={setEntertainmentShows}
							items={entertainmentShows}
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
