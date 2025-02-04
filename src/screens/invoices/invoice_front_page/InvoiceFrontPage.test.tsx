import { useEffect } from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import { IInvoice } from '@interfaces/invoice'
import { InvoiceProvider, useInvoice } from '../context/InvoiceContext'
import { InvoiceFrontPage } from './InvoiceFrontPage'
import { createBlankInvoice } from '../context/createBlankInvoice'
import { MemoryRouter } from 'react-router-dom'

// TestDispatcher dispatches an action to set an invoice via useEffect.
function TestDispatcher({ invoice }: { invoice: IInvoice }) {
	const { dispatch } = useInvoice()
	useEffect(() => {
		dispatch({ type: 'SET_INVOICE', payload: invoice })
	}, [dispatch, invoice])
	return null
}

describe('InvoiceFrontPage Component', () => {
	describe('Fallback (no invoice loaded)', () => {
		beforeEach(async () => {
			await act(async () => {
				render(
					<MemoryRouter>
						<InvoiceProvider>
							<InvoiceFrontPage />
						</InvoiceProvider>
					</MemoryRouter>
				)
			})
		})

		it('renders "No invoice data available." from the InvoiceTable fallback', () => {
			expect(screen.getByText(/no invoice data available/i)).toBeInTheDocument()
		})

		it('renders "No invoice loaded" in the InvoiceHeader fallback', () => {
			expect(screen.getByText(/no invoice loaded/i)).toBeInTheDocument()
		})

		it('renders "no invoice number" in the InvoiceTableHeader', () => {
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

		beforeEach(async () => {
			await act(async () => {
				render(
					<MemoryRouter>
						<InvoiceProvider>
							<TestDispatcher invoice={mockInvoice} />
							<InvoiceFrontPage />
						</InvoiceProvider>
					</MemoryRouter>
				)
			})
		})

		it('does NOT show "No invoice loaded" because the invoice is present', async () => {
			await waitFor(() => {
				expect(screen.queryByText(/no invoice loaded/i)).not.toBeInTheDocument()
			})
		})

		it('renders InvoiceTable (and PostingTable inputs) when invoice.status is "posting"', async () => {
			await waitFor(() => {
				expect(screen.getByText(/date/i)).toBeInTheDocument()
				expect(screen.getByText(/amount \(eur\)/i)).toBeInTheDocument()
				expect(screen.getByText(/bi iva @ 21%/i)).toBeInTheDocument()
			})
		})

		it('renders the InvoiceTableHeader with the correct invoice number', async () => {
			await waitFor(() => {
				expect(screen.getByText(/INVOICE:/i)).toBeInTheDocument()
				expect(screen.getByText(/23001/i)).toBeInTheDocument()
			})
		})

		it('renders the bank selection from InvoiceBankDetails for a posting invoice', async () => {
			await waitFor(() => {
				const bankSelect = screen.getByRole('combobox', { name: /bank/i })
				expect(bankSelect).toBeInTheDocument()
				expect(bankSelect).toHaveValue('DB')
			})
		})

		it('renders the invoice diagonal component with text "Cutting Edge Events S.L"', async () => {
			await waitFor(() => {
				expect(
					screen.getByText(/cutting edge events s\.l/i)
				).toBeInTheDocument()
			})
		})
	})
})
