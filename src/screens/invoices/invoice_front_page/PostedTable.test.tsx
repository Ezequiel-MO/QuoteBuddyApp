import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// The component under test
import { PostedTable } from './PostedTable'
// InvoiceProvider & context
import { InvoiceProvider } from '../context/InvoiceContext'
// If you have a default invoice, import it
import { IInvoice } from '@interfaces/invoice'
import { TestDispatcher } from '../helpers/InvoiceTestDispatcher'

/**
 * Helper to render PostedTable with an optional partial invoice.
 */
function renderPostedTable(invoice?: Partial<IInvoice>) {
	return render(
		<MemoryRouter>
			<InvoiceProvider>
				{invoice ? <TestDispatcher invoice={invoice} /> : null}
				<PostedTable />
			</InvoiceProvider>
		</MemoryRouter>
	)
}

describe('PostedTable', () => {
	describe('Fallback scenario', () => {
		it('shows "No invoice data available" when currentInvoice is null', () => {
			renderPostedTable() // no invoice => fallback
			expect(
				screen.getByText(
					/no invoice data available\. please load an invoice\./i
				)
			).toBeInTheDocument()
		})
	})

	describe('When an invoice is loaded', () => {
		it('renders the main row with date, description, and line amount (no taxBreakdown)', () => {
			const { container } = renderPostedTable({
				lineDate: '2023-07-01',
				lineText: 'Test line item',
				lineAmount: 500,
				currency: 'USD',
				taxBreakdown: false
			})

			// Add non-null assertions (!) to querySelector results
			const tbody = container.querySelector('tbody')! // <-- Add !
			const tfoot = container.querySelector('tfoot')! // <-- Add !

			// Rest of the test remains the same
			expect(screen.getByText('2023-07-01')).toBeInTheDocument()
			expect(screen.getByText(/test line item/i)).toBeInTheDocument()
			expect(within(tbody).getByText(/usd\s*500,00/i)).toBeInTheDocument()
			expect(screen.getByText(/total invoice/i)).toBeInTheDocument()
			expect(within(tfoot).getByText(/usd\s*500,00/i)).toBeInTheDocument()
		})

		it('renders tax rows if taxBreakdown=true and currency=EUR', () => {
			renderPostedTable({
				lineDate: '2025-01-31',
				lineText: 'Some text here',
				lineAmount: 1000,
				currency: 'EUR',
				taxBreakdown: true,
				taxBase21: 200,
				expenses: 50
			})

			// The main row
			expect(screen.getByText('2025-01-31')).toBeInTheDocument()
			expect(screen.getByText(/some text here/i)).toBeInTheDocument()
			// The line amount cell might read "EUR 1.000,00" or "EUR 1000,00" depending on your locale:
			expect(screen.getByText(/eur\s*1.000,00/i)).toBeInTheDocument()

			// Because taxBreakdown=true & currency=EUR, we see tax rows in the tfoot
			// 21% of 200 => "€ 42,00" (for example)
			// The actual text is: `Tax Base @ 21% - EUR 200`
			expect(screen.getByText(/tax base @ 21% - eur 200/i)).toBeInTheDocument()
			// formatMoney(0.21 * 200) => "€ 42,00" or "€42,00"
			expect(screen.getByText(/€\s*42,00/i)).toBeInTheDocument()

			// Next row for 10%
			expect(screen.getByText(/tax base @ 10% - eur 0/i)).toBeInTheDocument()
			expect(screen.getByText(/€\s*0,00/i)).toBeInTheDocument()

			// Expenses row => "Expenses" + "€ 50,00"
			expect(screen.getByText(/expenses/i)).toBeInTheDocument()
			expect(screen.getByText(/€\s*50,00/i)).toBeInTheDocument()

			// We do NOT see "TOTAL INVOICE" if taxBreakdown is true
			expect(screen.queryByText(/total invoice/i)).not.toBeInTheDocument()
		})
	})
})
