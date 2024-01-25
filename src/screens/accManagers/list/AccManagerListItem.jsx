import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'

const AccManagerListItem = ({ accManager, accManagers, setAccManagers }) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className={listStyles.tr}>
				<td
					onClick={() =>
						navigate(`/app/accManager/specs`, {
							state: { accManager }
						})
					}
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
