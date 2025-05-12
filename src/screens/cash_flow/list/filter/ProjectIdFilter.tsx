import React, { useState, useEffect } from 'react'
import { filterStyles } from '@constants/styles/filterStyles'
import { usePayment } from '../../context/PaymentsProvider'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { useApiFetch } from 'src/hooks/fetchData'

export const ProjectIdFilter = () => {
	const { state, dispatch } = usePayment()

	const { data: vendorInvoices } = useApiFetch<IVendorInvoice[]>(
		// `vendorInvoices${state.vendorTypeFilter ? "?vendorType="+state.vendorTypeFilter : ""}`
		`vendorInvoices`
	)

	const projects = vendorInvoices
		?.map((el) => el.project)
		?.filter((project) => project && project._id)
		?.filter(
			(vendor: any, index, vendorInvoices) =>
				index ===
				vendorInvoices.findIndex((item: any) => item?._id === vendor._id)
		)

	const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: 'SET_FILTER',
			payload: { name: 'projectIdFilter', value: event.target.value }
		})
	}

	return (
		<div className={`${filterStyles['selectContainer']} hover:border-blue-600`}>
			<select
				id="projectIdFilter"
				name="projectIdFilter"
				className={filterStyles['select']}
				value={state.projectIdFilter}
				onChange={(e) => handleChangeFilter(e)}
			>
				<option value={''}>--- Filter by Project (All) ---</option>
				{projects.map((vendor, index) => (
					<option key={index} value={vendor?._id}>
						{`--- ${vendor?.code} ---`}
					</option>
				))}
			</select>
		</div>
	)
}
