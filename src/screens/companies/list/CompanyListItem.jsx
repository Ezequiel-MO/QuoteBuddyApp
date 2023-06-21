import { useNavigate } from 'react-router-dom'
import { ButtonDeleted } from '../../../components/atoms'

const CompanyListItem = ({ company, companies, setCompanies }) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
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
				<td>{company.address}</td>
				<td>{company.country}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
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
