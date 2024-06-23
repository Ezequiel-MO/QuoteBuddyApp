import { useState, useEffect } from "react"
import { TextInput, SelectInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { ProjectSelector } from "./ProjectSelector"
import { VendorSelector } from "./VendorSelector"
import { VendorTransferSelector } from "./VendorTransferSelector"
import { VendorFreelancerSelector } from "./VendorFreelancerSelector"
import { optionsVendorType, includesVendor, optionsStatus } from "./helperAndConstants"

const PaymentsFormFields = () => {
	const { state, handleChange, dispatch } = usePayment()

	const [project, setProject] = useState<string>("")
	const [vendorId, serVendorId] = useState<string>("")

	useEffect(() => {
		dispatch({
			type: "UPDATE_PAYMENT_FIELD",
			payload: {
				name: "vendorModel",
				value: state.payment?.vendorType ? `${state.payment.vendorType}s` : ""
			}
		})
		serVendorId("")
	}, [state.payment?.vendorType])

	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Payment Data</h1>
			</legend>
			<div className="space-y-4">
				<div className="flex space-x-4">
					<div className="w-1/2">
						<TextInput
							label='Invoice Number'
							placeholder='example: 001'
							type='text'
							name="invoiceNumber"
							value={state.payment?.invoiceNumber}
							handleChange={handleChange}
						/>
					</div>
					<div className="w-1/2">
						<label className="uppercase text-xl text-gray-600 font-bold block mb-1">
							Project
						</label>
						<ProjectSelector projectId={project} setProjectId={setProject} />
					</div>
				</div>
				<div className="flex space-x-4">
					<TextInput
						label="invoice Date"
						type="date"
						name="invoiceDate"
						value={state.payment?.invoiceDate}
						handleChange={handleChange}
					/>
					<TextInput
						label="due Date"
						type="date"
						name="dueDate"
						value={state.payment?.dueDate}
						handleChange={handleChange}
					/>
				</div>
				<div>
					<SelectInput
						titleLabel="vendor type"
						placeholderOption="-- select a vendor --"
						name="vendorType"
						value={state.payment?.vendorType as string}
						handleChange={handleChange}
						options={optionsVendorType}
					/>
				</div>
				<div>
					<label className="uppercase text-xl text-gray-600 font-bold block mb-1">
						{state.payment?.vendorModel ? "vendor" : ""}
					</label>
					{
						includesVendor.includes(state.payment?.vendorModel as string) &&
						<VendorSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
					{
						state.payment?.vendorModel === "Transfers" &&
						<VendorTransferSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
					{
						state.payment?.vendorModel === "Freelancers" &&
						<VendorFreelancerSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
				</div>
				<div>
					<SelectInput
						titleLabel="status"
						placeholderOption="-- select a status --"
						name="status"
						value={state.payment?.status as string}
						handleChange={handleChange}
						options={optionsStatus}
					/>
				</div>
				<TextInput
					label="INVOICE AMOUNT"
					type="number"
					name="amount"
					value={state.payment?.amount}
					handleChange={handleChange}
				/>
			</div>
		</fieldset>
	)
}

export default PaymentsFormFields
