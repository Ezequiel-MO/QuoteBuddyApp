import { useState, useEffect } from "react"
import { TextInput, SelectInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { ProjectSelector } from "./ProjectSelector"
import { VendorSelector } from "./VendorSelector"
import { VendorTransferSelector } from "./VendorTransferSelector"
import { VendorFreelancerSelector } from "./VendorFreelancerSelector"
import { optionsVendorType, includesVendor, optionsStatus } from "./helperAndConstants"
import { useAuth } from 'src/context/auth/AuthProvider'


const PaymentsFormFields = () => {
	const { state, handleChange, dispatch, errors, handleBlur } = usePayment()
	const { auth } = useAuth()

	const [project, setProject] = useState<string>(state.vendorInvoice?.project?._id ?? "")
	const [vendorId, serVendorId] = useState<string>("")

	useEffect(() => {
		dispatch({
			type: "UPDATE_PAYMENT_FIELD",
			payload: {
				name: "vendorModel",
				value: state.vendorInvoice?.vendorType ? `${state.vendorInvoice.vendorType}s` : ""
			}
		})
		serVendorId("")
	}, [state.vendorInvoice?.vendorType])

	//sirve cuando se hace un update al VendorInvoice
	useEffect(() => {
		if (state.vendorInvoice?.update === true && state.vendorInvoice.vendor?._id) {
			serVendorId(state.vendorInvoice.vendor?._id)
		}
	}, [])

	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Vendor Invoice Data</h1>
			</legend>
			<div className="space-y-4">
				<div className="flex space-x-4">
					<div className="w-1/2">
						<TextInput
							label='Invoice Number'
							placeholder='example: 001'
							type='text'
							name="invoiceNumber"
							value={state.vendorInvoice?.invoiceNumber}
							handleChange={handleChange}
							errors={errors.invoiceNumber}
							handleBlur={handleBlur}
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
						value={state.vendorInvoice?.invoiceDate}
						handleChange={handleChange}
						errors={errors.invoiceDate}
						handleBlur={handleBlur}
					/>
					<TextInput
						label="due Date"
						type="date"
						name="dueDate"
						value={state.vendorInvoice?.dueDate}
						handleChange={handleChange}
					/>
				</div>
				<div>
					<SelectInput
						titleLabel="vendor type"
						placeholderOption="-- select a vendor --"
						name="vendorType"
						value={state.vendorInvoice?.vendorType as string}
						handleChange={handleChange}
						options={optionsVendorType}
						errorKey="vendorType"
						errors={errors}
						handleBlur={handleBlur}
					/>
				</div>
				<div>
					<label className="uppercase text-xl text-gray-600 font-bold block mb-1">
						{state.vendorInvoice?.vendorModel ? "vendor" : ""}
					</label>
					{
						includesVendor.includes(state.vendorInvoice?.vendorModel as string) &&
						<VendorSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
					{
						state.vendorInvoice?.vendorModel === "Transfers" &&
						<VendorTransferSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
					{
						state.vendorInvoice?.vendorModel === "Freelancers" &&
						<VendorFreelancerSelector vendorId={vendorId} setVendorId={serVendorId} />
					}
				</div>
				<div>
					<SelectInput
						titleLabel="status"
						placeholderOption="-- select a status --"
						name="status"
						value={state.vendorInvoice?.status as string}
						handleChange={handleChange}
						options={
							auth.role === "admin" ? optionsStatus
								: [{ name: 'Pending', value: 'Pending' },]
						}
						errorKey="status"
						errors={errors}
						handleBlur={handleBlur}
					/>
				</div>
				<TextInput
					label="INVOICE AMOUNT"
					type="number"
					name="amount"
					value={state.vendorInvoice?.amount}
					handleChange={handleChange}
					errors={errors.amount}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}

export default PaymentsFormFields
