import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from "src/components/atoms/spinner/Spinner"
import { TableHeaders } from "src/ui"
import { TablePayment } from "./TablePayment"
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { TableVendorInvoice } from "./TableVendorInvoice"
import { useApiFetch } from "src/hooks/fetchData/"



export const PaymentSlip = () => {
	const { projectId } = useParams<{ projectId: string }>()
	const { stateProject: project, isLoading, setForceRefresh, dispatch } = usePaymentSlip()

	const clientAccManager = project?.clientAccManager && project.clientAccManager[0]
	const clientCompany = project?.clientCompany && project.clientCompany[0]
	const accountManager = project?.accountManager && project.accountManager[0]

	const notIsProject = project && Object.keys(project).length > 1 ? false : true

	//Esto sirve para renderizar los  vendorInvoices  o los nuevos que se crearon
	const { data: vendorInvoices, isLoading: isLoadingVendorInvoices } = useApiFetch(`vendorInvoices/project/${projectId}`)
	//cuando lo obtengo lo guardo en el state Project
	useEffect(() => {
		if (!isLoadingVendorInvoices) {
			const stateCopy = JSON.parse(JSON.stringify(project))
			stateCopy.vendorInvoices = vendorInvoices
			dispatch({
				type: "SET_PROJECT",
				payload: {
					project: stateCopy
				}
			})
		}
	}, [vendorInvoices])

	// Desplasa a la parte superior de la pagina cuando se monta el componente
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	if (isLoading || notIsProject || isLoadingVendorInvoices) {
		return (
			<div className='mt-40'>
				<Spinner />
			</div>
		)
	}

	return (
		<div>
			<h1 className='text-center text-3xl'>
				Payment Slip
			</h1>
			<hr />
			<table className='mt-10 min-w-full  table-auto border-collapse border-2'>
				<TableHeaders headers='projectBasePaymentSlimp' />
				<tbody>
					<tr>
						<td align='left' className="px-3">
							{project?.code}
						</td>
						<td align='left' className='px-3 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{`${clientAccManager?.firstName ?? ""} ${clientAccManager?.familyName ?? ""}`}
						</td>
						<td align='left' className='px-3 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{clientCompany?.name}
						</td>
						<td align='left' className='px-3 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{project?.arrivalDay}
						</td>
						<td align='left' className='px-3 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{project?.departureDay}
						</td>
						<td align='left' className='px-3 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{`${accountManager?.firstName ?? ""} ${accountManager?.familyName ?? ""}`}
						</td>
					</tr>
				</tbody>
			</table>
			<TablePayment />
			<TableVendorInvoice />
		</div>
	)
}
