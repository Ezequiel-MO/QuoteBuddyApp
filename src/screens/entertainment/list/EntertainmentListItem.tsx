import { useState } from 'react'
import { AddToProjectButton, ButtonDeleted } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { formatYearMonthDate } from 'src/helper'
import { ModalPriceEntertainment } from "./modalPrice/ModalPriceEntertainment"
import { IEntertainment } from 'src/interfaces/entertainment'

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
			<ModalPriceEntertainment open={open} setOpen={setOpen} />
			<tbody>
				<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
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
					<td>{entertainmentShow.city}</td>
					<td>{entertainmentShow.vendor}</td>
					<td>{entertainmentShow.category}</td>

					<td></td>
					<td className="cursor-pointer">
						<ButtonDeleted
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
