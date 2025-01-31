// TestDispatcher.tsx

import React, { useEffect } from 'react'
import { useInvoice } from '../context/InvoiceContext'
import { IInvoice } from '@interfaces/invoice'
import { starterInvoice } from 'src/constants/starterObjects'

/**
 * This component merges the test's partial invoice props into
 * the starterInvoice, then dispatches that full invoice into context.
 */
export function TestDispatcher({ invoice }: { invoice?: Partial<IInvoice> }) {
	const { dispatch } = useInvoice()

	useEffect(() => {
		// Merge them so the test's currency, lineAmount, etc. overrides any default from starterInvoice
		const fullInvoice: IInvoice = {
			...starterInvoice, // your default object
			...invoice // test overrides
		}
		dispatch({ type: 'SET_INVOICE', payload: fullInvoice })
	}, [dispatch, invoice])

	return null
}
