import { useEffect, useState, ChangeEvent, FC } from 'react'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { useApiFetch } from 'src/hooks/fetchData'
import { useInvoice } from '../context/InvoiceContext'
import { IClientCompany } from '@interfaces/clientCompany'

interface Props {
	selectedCompany: string | undefined
}

export const CompanySelector: FC<Props> = ({ selectedCompany }) => {
	const { data: companies, isLoading } =
		useApiFetch<IClientCompany[]>('client_companies')
	const [localCompany, setLocalCompany] = useState<string>('')
	const { state, dispatch, handleChange } = useInvoice()

	const isEditable = state.currentInvoice?.status === 'posting'

	useEffect(() => {
		const company = companies.find((c) => c.name === selectedCompany)

		if (company) {
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'address',
					value: company.address || ''
				}
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'postCode',
					value: company.postCode || ''
				}
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'VATNr',
					value: company.VATNr || ''
				}
			})
		} else {
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'address',
					value: ''
				}
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'postCode',
					value: ''
				}
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'VATNr',
					value: ''
				}
			})
		}
	}, [selectedCompany, companies, dispatch])

	const handleCompanyChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setLocalCompany(e.target.value)
		handleChange(e)
	}

	if (isLoading) {
		return (
			<p className="text-center text-xl text-orange-500">
				Loading companies...
			</p>
		)
	}

	return (
		<div className={isEditable ? editableDivClass : readOnlyDivClass}>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				COMPANY:
			</div>
			{isEditable ? (
				<>
					<select
						name="company"
						value={state.currentInvoice?.company || localCompany}
						onChange={handleCompanyChange}
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
					>
						<option value="">Select a Company</option>
						{companies.map((company, index) => (
							<option key={index} value={company.name}>
								{company.name}
							</option>
						))}
					</select>
				</>
			) : (
				<p
					className={
						isEditable ? 'ml-2 text-gray-700' : 'ml-2 text-lg text-right'
					}
				>
					{selectedCompany}
				</p>
			)}
		</div>
	)
}
