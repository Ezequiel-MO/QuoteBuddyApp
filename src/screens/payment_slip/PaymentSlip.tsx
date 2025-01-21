import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { TableHeaders } from 'src/ui'
import { TablePayment } from './TablePayment'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { TableVendorInvoice } from './TableVendorInvoice'
import { useApiFetch } from 'src/hooks/fetchData/'
import { useFetchProjects } from 'src/hooks/fetchData/useFetchProjects'
import { useProject } from '@screens/projects/context/ProjectContext'
import { useCurrentProject } from 'src/hooks'

export const PaymentSlip = () => {
	const { projectId } = useParams<{ projectId: string }>()
	const navigate = useNavigate()
	const { stateProject: project, isLoading, dispatch } = usePaymentSlip()
	const { setCurrentProject } = useCurrentProject()
	const { dispatch: projectDispatch } = useProject()

	const clientAccManager = project?.clientAccManager?.[0]
	const clientCompany = project?.clientCompany?.[0]
	const accountManager = project?.accountManager?.[0]

	const notIsProject = project && Object.keys(project).length > 1 ? false : true

	// Fetch vendor invoices
	const { data: vendorInvoices, isLoading: isLoadingVendorInvoices } =
		useApiFetch(`vendorInvoices/project/${projectId}`)

	// Fetch updated project info (invoices, etc.)
	const { project: projectUpdate, isLoading: isLoadingProjectUpdate } =
		useFetchProjects({ id: projectId })

	useEffect(() => {
		if (!isLoadingVendorInvoices && !isLoadingProjectUpdate && !notIsProject) {
			dispatch({
				type: 'UPDATE_PROJECT_FIELD',
				payload: {
					keyProject: 'vendorInvoices',
					value: vendorInvoices
				}
			})

			if (projectUpdate?.invoices) {
				dispatch({
					type: 'UPDATE_PROJECT_FIELD',
					payload: {
						keyProject: 'invoices',
						value: projectUpdate.invoices
					}
				})
			}
		}
	}, [vendorInvoices, projectUpdate])

	// Scroll to top on mount
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (isLoading || notIsProject || isLoadingVendorInvoices) {
		return (
			<div className="mt-40">
				<Spinner />
			</div>
		)
	}

	const handleNavigateToProjectSpecs = () => {
		projectDispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		if (project) {
			setCurrentProject(project)
			navigate('/app/project/specs')
		}
	}

	return (
		<div className="mx-auto mt-8 w-full bg-gray-900 rounded-md shadow-lg p-4 overflow-x-auto">
			<h1 className="text-center text-2xl text-gray-100 font-semibold tracking-wide mb-4">
				Payment Slip
			</h1>

			{/* Basic Project Info Table */}
			<div className="shadow-sm rounded-md border border-gray-700 mb-6">
				<table className="w-full text-left table-auto divide-y divide-gray-700 bg-gray-800 text-gray-200">
					<TableHeaders headers="projectBasePaymentSlip" />
					<tbody>
						<tr className="hover:bg-gray-700 transition-colors">
							<td
								align="left"
								onClick={handleNavigateToProjectSpecs}
								className="p-2 hover:text-blue-600 hover:underline cursor-pointer truncate w-24"
							>
								{project?.code}
							</td>
							<td align="left" className="px-4 py-2 truncate">
								{`${clientAccManager?.firstName ?? ''} ${
									clientAccManager?.familyName ?? ''
								}`}
							</td>
							<td align="left" className="px-4 py-2 truncate">
								{clientCompany?.name}
							</td>
							<td align="left" className="px-4 py-2 truncate">
								{project?.arrivalDay}
							</td>
							<td align="left" className="px-4 py-2 truncate">
								{project?.departureDay}
							</td>
							<td align="left" className="px-4 py-2 truncate">
								{`${accountManager?.firstName ?? ''} ${
									accountManager?.familyName ?? ''
								}`}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Payment Table */}
			<TablePayment />

			{/* Vendor Invoices Table */}
			<TableVendorInvoice />
		</div>
	)
}
