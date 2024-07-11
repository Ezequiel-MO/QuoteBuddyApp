import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IClientCompany } from '@interfaces/clientCompany'
import { useCompany } from '../context/CompanyContext'

interface CompanyListItemProps {
	item: IClientCompany
	canBeAddedToProject: boolean
}

const CompanyListItem = ({
	item: company,
	canBeAddedToProject = false
}: CompanyListItemProps) => {
	const { state, dispatch } = useCompany()
	const navigate = useNavigate()

	const handleNavigateToCompanySpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_COMPANY',
			payload: company
		})
		navigate('/app/marketing/company/specs')
	}

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					className="hover:text-blue-600 hover:underline cursor-pointer"
					onClick={handleNavigateToCompanySpecs}
				>
					{company.name}
				</td>
				<td className={listStyles.td}>{company.address}</td>
				<td>{company.country}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'client_companies'}
						ID={company._id}
						setter={(updatedCompanies: IClientCompany[]) =>
							dispatch({
								type: 'SET_COMPANIES',
								payload: updatedCompanies
							})
						}
						items={state.companies || []}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default CompanyListItem
