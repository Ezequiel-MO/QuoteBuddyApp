import React, { useState, useEffect } from 'react'
import { filterStyles } from 'src/constants/filterStyles'
import { usePayment } from '../../context/PaymentsProvider'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { useApiFetch } from 'src/hooks/fetchData'

export const VendorIdFilter = () => {
	const { state, dispatch } = usePayment()

	const { data: vendorInvoices } = useApiFetch<IVendorInvoice[]>(`vendorInvoices${'?vendorType=' + state.vendorTypeFilter}`)

	// if (!state.vendorTypeFilter) {
	// 	return null
	// }

	const vendors = vendorInvoices
		.map((el) => el.vendor)
		.filter(
			(vendor: any, index, vendorInvoices) =>
				index ===
				vendorInvoices.findIndex((item: any) => item._id === vendor._id)
		)

	const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: 'SET_FILTER',
			payload: { name: 'vendorIdFilter', value: event.target.value }
		})
	}

	return (
		<div className={`${filterStyles['selectContainer']} transition-all duration-500 ease-in-out ${state.vendorTypeFilter ? 'opacity-100 max-h-40 mt-1' : 'opacity-0 max-h-0 overflow-hidden'} hover:border-blue-600`}>
			<select
				id="vendorIdFilter"
				name="vendorIdFilter"
				className={filterStyles['select']}
				value={state.vendorIdFilter}
				onChange={(e) => handleChangeFilter(e)}
			>
				<option value={''}>
					--- Filter by {state.vendorTypeFilter} (All) ---
				</option>
				{vendors.map((vendor: any, index) => (
					<option key={index} value={vendor?._id}>
						{`--- ${vendor?.name} ---`}
					</option>
				))}
			</select>
		</div>
	)
}
