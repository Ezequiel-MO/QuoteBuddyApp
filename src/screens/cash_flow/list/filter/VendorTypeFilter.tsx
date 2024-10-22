import React, { useState } from 'react'
import { filterStyles } from 'src/constants/filterStyles'
import { optionsVendorType } from '../../specs/helperAndConstants'
import { usePayment } from '../../context/PaymentsProvider'

export const VendorTypeFilter = () => {
	const [data, setData] = useState('')
	const { state, dispatch, setForceRefresh } = usePayment()

	const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		state.vendorTypeFilter = event.target.value
		dispatch({
			type: 'SET_FILTER',
			payload: { name: 'vendorTypeFilter', value: event.target.value }
		})
		dispatch({
			type: 'SET_FILTER',
			payload: { name: 'vendorIdFilter', value: '' }
		})
	}

	return (
		<div className={`${filterStyles['selectContainer']} hover:border-blue-600`}>
			<select
				id="vendorType"
				name="vendorType"
				className={filterStyles['select']}
				value={state.vendorTypeFilter}
				onChange={(e) => handleChangeFilter(e)}
			>
				<option value={''}>--- Filter by Vendor Type (All) ---</option>
				{optionsVendorType.map((vendor, index) => (
					<option key={index} value={vendor.value}>
						{`--- ${vendor.name} ---`}
					</option>
				))}
			</select>
		</div>
	)
}
