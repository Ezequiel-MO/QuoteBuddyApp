import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from '@constants/styles/listStyles'
import { IOtherOperational } from '@interfaces/otherOperational'
import { useOtherOperational } from '../context/OtherOperationalsContext'

interface OtherOperationalItemProps {
	item: IOtherOperational
	canBeAddedToProject: boolean
}

export const OtherOperationalListItem: FC<OtherOperationalItemProps> = ({
	item: otherOperational,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useOtherOperational()
	const navigate = useNavigate()

	const handleTextContentChange = useCallback(
		(textContent: string) => {
			dispatch({
				type: 'UPDATE_OTHEROPERATIONAL_FIELD',
				payload: { name: 'textContent', value: textContent }
			})
		},
		[dispatch]
	)

	const handleNavigateToOtherOperationalSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_OTHEROPERATIONAL',
			payload: otherOperational
		})
		navigate('/app/other_operational/specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigateToOtherOperationalSpecs}
				className="hover:text-blue-600 hover:underline cursor-pointer"
			>
				{otherOperational.name}
			</td>
			<td className={listStyles.td}>{otherOperational.city}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint="OtherOperationals"
					ID={otherOperational._id}
					setter={(updatedOtherOperationals: IOtherOperational[]) =>
						dispatch({
							type: 'SET_OTHEROPERATIONALS',
							payload: updatedOtherOperationals
						})
					}
					items={state.otherOperationals || []}
				/>
			</td>
		</tr>
	)
}
