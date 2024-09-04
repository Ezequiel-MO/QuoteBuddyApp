import { Spinner } from "src/components/atoms/spinner/Spinner"
import { TableHeaders } from "src/ui"
import { TablePayment } from "./TablePayment"
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { TableVendorInvoice } from "./TableVendorInvoice"


export const PaymentSlip = () => {
	const { stateProject: project, isLoading, setForceRefresh } = usePaymentSlip()

	const clientAccManager = project?.clientAccManager && project.clientAccManager[0]
	const clientCompany = project?.clientCompany && project.clientCompany[0]
	const accountManager = project?.accountManager && project.accountManager[0]

	if (isLoading || !project) {
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
						<td align='left' className="px-6">
							{project?.code}
						</td>
						<td align='left' className='px-6 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{`${clientAccManager?.firstName ?? ""} ${clientAccManager?.familyName ?? ""}`}
						</td>
						<td align='left' className='px-6 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{clientCompany?.name}
						</td>
						<td align='left' className='px-6 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{project?.arrivalDay}
						</td>
						<td align='left' className='px-6 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
							{project?.departureDay}
						</td>
						<td align='left' className='px-6 truncate relative overflow-hidden whitespace-nowrap max-w-xs'>
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
