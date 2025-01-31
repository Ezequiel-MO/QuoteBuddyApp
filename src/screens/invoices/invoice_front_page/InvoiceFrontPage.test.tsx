import React, { useEffect } from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IInvoice } from '@interfaces/invoice'
import { InvoiceProvider, useInvoice } from '../context/InvoiceContext'
import { InvoiceFrontPage } from './InvoiceFrontPage'
import { createBlankInvoice } from '../context/createBlankInvoice'
import { MemoryRouter } from 'react-router-dom'

function TestDispatcher({ invoice }: { invoice: IInvoice }) {
	const { dispatch } = useInvoice()

	useEffect(() => {
		dispatch({ type: 'SET_INVOICE', payload: invoice })
	}, [dispatch, invoice])

	return null
}

describe('InvoiceFrontPage Component', () => {
	describe('Fallback (no invoice loaded)', () => {
		beforeEach(() => {
			render(
				<MemoryRouter>
					<InvoiceProvider>
						<InvoiceFrontPage />
					</InvoiceProvider>
				</MemoryRouter>
			)
		})

		it('renders "No invoice data available." from the InvoiceTable fallback', () => {
			expect(screen.getByText(/no invoice data available/i)).toBeInTheDocument()
		})

		it('renders "No invoice loaded" in the InvoiceHeader fallback', () => {
			expect(screen.getByText(/no invoice loaded/i)).toBeInTheDocument()
		})

		it('does not render invoice number in InvoiceTableHeader', () => {
			expect(screen.getByText(/no invoice number/i)).toBeInTheDocument()
		})
	})

	describe('When an invoice is loaded', () => {
		const mockInvoice: IInvoice = {
			...createBlankInvoice(),
			invoiceNumber: '23001',
			status: 'posting',
			address: '123 Example Street',
			company: 'ABC Company',
			client: 'ACME Client',
			taxBreakdown: true,
			lineAmount: 100,
			currency: 'EUR'
		}

		beforeEach(() => {
			render(
				<MemoryRouter>
					<InvoiceProvider>
						<TestDispatcher invoice={mockInvoice} />
						<InvoiceFrontPage />
					</InvoiceProvider>
				</MemoryRouter>
			)
		})

		it('does NOT show "No invoice loaded" because the invoice is present', () => {
			expect(screen.queryByText(/no invoice loaded/i)).not.toBeInTheDocument()
		})

		it('renders InvoiceTable, but since invoice.status="posting", it may show the PostingTable inputs', () => {
			expect(screen.getByText(/date/i)).toBeInTheDocument()
			expect(screen.getByText(/amount \(eur\)/i)).toBeInTheDocument()
			expect(screen.getByText(/bi iva @ 21%/i)).toBeInTheDocument()
		})

		it('renders the InvoiceTableHeader with the correct invoice number', () => {
			expect(screen.getByText(/INVOICE:/i)).toBeInTheDocument()
			expect(screen.getByText(/23001/i)).toBeInTheDocument()
		})

		it('renders the bank selection from InvoiceBankDetails for a posting invoice', () => {
			const bankSelect = screen.getByRole('combobox', { name: /bank/i })
			expect(bankSelect).toBeInTheDocument()
			expect(bankSelect).toHaveValue('DB')
		})

		it('renders the invoice diagonal component with text "Cutting Edge Events S.L"', () => {
			// <InvoiceDiagonal /> includes the text "Cutting Edge Events S.L"
			expect(screen.getByText(/cutting edge events s\.l/i)).toBeInTheDocument()
		})
	})
})
