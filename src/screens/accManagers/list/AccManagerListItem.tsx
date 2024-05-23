import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IAccManager } from '@interfaces/accManager'

interface AccManagerListItemProps {
	accManager: IAccManager
	accManagers: IAccManager[]
	setAccManagers: React.Dispatch<React.SetStateAction<IAccManager[]>>
	handleNavigate: (accManager: IAccManager) => void
}

const AccManagerListItem: React.FC<AccManagerListItemProps> = ({
	accManager,
	accManagers,
	setAccManagers,
	handleNavigate
}) => {
	return (
		<tbody>
			<tr className={listStyles.tr}>
				<td
					onClick={() => handleNavigate(accManager)}
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
						setter={setAccManagers}
						items={accManagers}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default AccManagerListItem
