import { Dispatch } from 'react'
import { VendorInvoiceAction } from '../context/contextInterfaces'

// Define a type for the valid filter names
type FilterName = 'vendorTypeFilter' | 'vendorIdFilter' | 'projectIdFilter'

/**
 * Resets filter fields for vendor invoices in the context state
 *
 * @param dispatch - The dispatch function from the context
 * @param fields - The fields to reset with their values
 */
export const resetVendorInvoiceFilters = (
	dispatch: Dispatch<VendorInvoiceAction>,
	fields: Partial<Record<FilterName, string>>
) => {
	// For vendor invoices, we need to reset filters which have different naming than the entity fields
	;(Object.keys(fields) as FilterName[]).forEach((key) => {
		dispatch({
			type: 'SET_FILTER',
			payload: {
				name: key,
				value: fields[key] || '' // Ensure we always have a string value
			}
		})
	})
}
