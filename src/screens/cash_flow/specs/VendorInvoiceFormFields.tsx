import { useState, useEffect } from 'react'
import { TextInput, SelectInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { ProjectSelector } from './select/ProjectSelector'
import { VendorSelector } from './select/VendorSelector'
import { VendorTransferSelector } from './select/VendorTransferSelector'
import { VendorFreelancerSelector } from './select/VendorFreelancerSelector'
import {
	optionsVendorType,
	includesVendor,
	optionsStatus
} from './helperAndConstants'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useLocation } from 'react-router-dom'

export const VendorInvoiceFormFields = () => {
	const { state, handleChange, dispatch, errors, handleBlur } = usePayment()
	const { auth } = useAuth()

	const location = useLocation()
	const isPathnameExpense =
		location.pathname === '/app/expense/vendorInvoice/specs'

	const [project, setProject] = useState<string>(
		typeof state.currentVendorInvoice?.project === 'object'
			? state?.currentVendorInvoice?.project?._id
			: (state.currentVendorInvoice?.project as any)
	)
	const [vendorId, serVendorId] = useState<string>(
		typeof state.currentVendorInvoice?.vendor === 'object'
			? state?.currentVendorInvoice?.vendor?._id
			: (state.currentVendorInvoice?.vendor as any)
	)

	useEffect(() => {
		dispatch({
			type: 'UPDATE_VENDORINVOICE_FIELD',
			payload: {
				name: 'vendorModel',
				value: state.currentVendorInvoice?.vendorType
					? `${state.currentVendorInvoice.vendorType}s`
					: ''
			}
		})
		if (!isPathnameExpense) {
			// si vengo de  ruta General Expense que no setee serVendorId()
			serVendorId('')
		}
	}, [state.currentVendorInvoice?.vendorType])

	//sirve cuando se hace un update al currentVendorInvoice
	useEffect(() => {
		if (
			state.currentVendorInvoice &&
			state.update === true &&
			state.currentVendorInvoice.vendor?._id
		) {
			serVendorId(state.currentVendorInvoice.vendor?._id)
		}
	}, [])

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Vendor Invoice Data
				</h1>
			</legend>
			<div className="space-y-4">
				<div className="flex space-x-4">
					<div className="w-1/2">
						<TextInput
							label="Invoice Number"
							placeholder="example: 001"
							type="text"
							name="invoiceNumber"
							value={state.currentVendorInvoice?.invoiceNumber}
							handleChange={(e) =>
								handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')
							}
							errors={!isPathnameExpense ? errors.invoiceNumber : ''}
							handleBlur={!isPathnameExpense ? handleBlur : undefined}
						/>
					</div>
					<div className="w-1/2">
						<label className="uppercase text-xl text-gray-600 font-bold block mb-1">
							Project
						</label>
						<ProjectSelector projectId={project} setProjectId={setProject} />
					</div>
				</div>
				<div className="flex space-x-28">
					<TextInput
						label="invoice Date"
						type="date"
						name="invoiceDate"
						value={state.currentVendorInvoice?.invoiceDate}
						handleChange={(e) => handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')}
						errors={errors.invoiceDate}
						handleBlur={handleBlur}
					/>
					<div className={`${isPathnameExpense && 'opacity-0 max-h-0'}`}>
						<TextInput
							label="due Date"
							type="date"
							name="dueDate"
							value={state.currentVendorInvoice?.dueDate}
							handleChange={(e) =>
								handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')
							}
						/>
					</div>
				</div>
				<div>
					<SelectInput
						titleLabel="vendor type"
						placeholderOption="-- select a vendor --"
						name="vendorType"
						value={state.currentVendorInvoice?.vendorType as string}
						handleChange={(e) => handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')}
						options={optionsVendorType}
						errorKey="vendorType"
						errors={errors}
						handleBlur={handleBlur}
					/>
				</div>
				<div>
					<label className="uppercase text-xl text-gray-600 font-bold block mb-1">
						{state.currentVendorInvoice?.vendorModel ? 'vendor' : ''}
					</label>
					{includesVendor.includes(
						state.currentVendorInvoice?.vendorModel as string
					) && <VendorSelector vendorId={vendorId} setVendorId={serVendorId} />}
					{state.currentVendorInvoice?.vendorModel === 'Transfers' && (
						<VendorTransferSelector
							vendorId={vendorId}
							setVendorId={serVendorId}
						/>
					)}
					{state.currentVendorInvoice?.vendorModel === 'Freelancers' && (
						<VendorFreelancerSelector
							vendorId={vendorId}
							setVendorId={serVendorId}
						/>
					)}
				</div>
				<div className={`${isPathnameExpense && 'opacity-0 max-h-0 max-w-0'}`}>
					<SelectInput
						titleLabel="status"
						placeholderOption="-- select a status --"
						name="status"
						value={state.currentVendorInvoice?.status as string}
						handleChange={(e) => handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')}
						options={
							auth.role === 'admin'
								? optionsStatus
								: [{ name: 'Pending', value: 'Pending' }]
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
					value={state.currentVendorInvoice?.amount}
					handleChange={(e) => handleChange(e, 'UPDATE_VENDORINVOICE_FIELD')}
					errors={errors.amount}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}
