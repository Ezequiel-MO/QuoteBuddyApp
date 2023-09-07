import { useState } from 'react'
import { AddToProjectButton, ButtonDeleted } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { formatYearMonthDate } from 'src/helper'
import { IEntertainment } from 'src/interfaces/entertainment'

interface Props {
	entertertainmentShow: IEntertainment
	entertainmentShows: IEntertainment[]
	setEntertainmentShows: React.Dispatch<React.SetStateAction<IEntertainment[]>>
	canBeAddedToProject: boolean
}

export const EntertainmentListItem = ({
	entertertainmentShow,
	entertainmentShows,
	setEntertainmentShows,
	canBeAddedToProject
}: Props) => {
	const navigate = useNavigate()
	const [open, setOpen] = useState<boolean>(false)
	return (
		<>
			<tbody>
				<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
					<td
						onClick={() =>
							navigate(`/app/entertainment/specs`, {
								state: { entertertainmentShow }
							})
						}
						className="hover:text-blue-600 hover:underline cursor-pointer"
					>
						{entertertainmentShow.name}
					</td>
					<td>{entertertainmentShow.city}</td>
					<td>{entertertainmentShow.vendor}</td>
					<td>{entertertainmentShow.category}</td>

					<td></td>
					<td className="cursor-pointer">
						<ButtonDeleted
							endpoint={'entertainments'}
							ID={entertertainmentShow._id}
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
