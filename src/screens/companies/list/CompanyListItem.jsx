import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'

const CompanyListItem = ({ company, companies, setCompanies }) => {
	const navigate = useNavigate()

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					onClick={() =>
						navigate(`/app/company/specs`, {
							state: { company }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{company.name}
				</td>
				<td className={listStyles.td}>{company.address}</td>
				<td>{company.country}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'client_companies'}
						ID={company._id}
						setter={setCompanies}
						items={companies}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default CompanyListItem
