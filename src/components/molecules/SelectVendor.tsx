import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { fetchProjects } from 'src/helper/fetch/fetchProjects'
import { getVendorsFromProject } from 'src/helper/payments/getVendorsFromProject'
import { useGetProject } from 'src/hooks'

const SelectVendor = () => {
	const { state } = usePayment()
	const projectCode = state.payment?.projectCode || ''
	const { project } = useGetProject(projectCode)

	const allVendorsFromProject = project ? getVendorsFromProject(project[0]) : []

	console.log('allVendorsFromProject', allVendorsFromProject)

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<select
				className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				cursor-pointer ml-2"
				name=""
				id="type_vendor"
			>
				<option value="">select type of vendor</option>
				<option value="restaurant">Restaurant</option>
				<option value="hotel">Hotel</option>
				<option value="freelance">Freelance</option>
				<option value="activity">Activity</option>
			</select>
		</div>
	)
}

export default SelectVendor
