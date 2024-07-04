import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IAccManager } from '@interfaces/accManager'
import { useAccManager } from '../context/AccManagersContext'
import { useNavigate } from 'react-router-dom'

interface AccManagerListItemProps {
	item: IAccManager
	canBeAddedToProject: boolean
}

const AccManagerListItem: React.FC<AccManagerListItemProps> = ({
	item: accManager,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useAccManager()
	const navigate = useNavigate()

	const handleNavigateToAccManagerSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_ACCMANAGER',
			payload: accManager
		})
		navigate('/app/accManager/specs')
	}
	return (
		<tbody>
			<tr className={listStyles.tr}>
				<td
					onClick={handleNavigateToAccManagerSpecs}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{accManager.firstName}
				</td>
				<td className={listStyles.td}>{accManager.familyName}</td>
				<td className={listStyles.td}>{accManager.email}</td>
				<td className={`${listStyles.td} cursor-pointer`}>
					<ButtonDeleteWithAuth
						endpoint={'accManagers'}
						ID={accManager._id}
						setter={(updatedAccManagers: IAccManager[]) =>
							dispatch({
								type: 'SET_ACCMANAGERS',
								payload: updatedAccManagers
							})
						}
						items={state.accManagers || []}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default AccManagerListItem
