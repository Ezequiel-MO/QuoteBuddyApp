import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { PostingTable } from './PostingTable'
import { InvoiceProvider } from '../context/InvoiceContext'
import { IInvoice } from '@interfaces/invoice'
import { TestDispatcher } from '../helpers/InvoiceTestDispatcher'
import { starterInvoice } from '@constants/starterObjects'
// The new, improved dispatcher that merges partial invoice props

function renderPostingTable(invoice?: Partial<IInvoice>) {
	return render(
		<MemoryRouter>
			<InvoiceProvider>
				{invoice ? <TestDispatcher invoice={invoice} /> : null}
				<PostingTable />
			</InvoiceProvider>
		</MemoryRouter>
	)
}

describe('PostingTable', () => {
	describe('Fallback rendering', () => {
		it('shows a message if no invoice is available', () => {
			// no props => currentInvoice stays null
			renderPostingTable()
			expect(screen.getByText(/no invoice data available/i)).toBeInTheDocument()
		})
	})

	describe('With an invoice (status="posting")', () => {
		it('renders table fields with taxBreakdown=false and USD currency', () => {
			renderPostingTable({
				...starterInvoice,
				status: 'posting',
				taxBreakdown: false,
				currency: 'USD',
				lineAmount: 300
			})

			// Check that thead text is correct
			// The code renders: "Amount ( USD )" with possible whitespace in between
			// Use a flexible regex: /amount.*usd/i
			expect(screen.getByText(/date/i)).toBeInTheDocument()
			expect(screen.getByText(/description/i)).toBeInTheDocument()
			expect(screen.getByText(/amount \(usd\)/i)).toBeInTheDocument()

			// Because taxBreakdown=false, we see "TOTAL INVOICE" row
			expect(screen.getByText(/total invoice/i)).toBeInTheDocument()

			// The code's formatMoney for "USD" might produce "USD 300,00" or similar
			// Confirm what actually appears in your tfoot:
			expect(screen.getByText(/usd 300,00/i)).toBeInTheDocument()

			// We do NOT see any "BI IVA @ 21%"
			expect(screen.queryByText(/bi iva @ 21%/i)).not.toBeInTheDocument()
		})

		it('renders tax rows if taxBreakdown is true and currency=EUR', () => {
			renderPostingTable({
				status: 'posting',
				taxBreakdown: true,
				currency: 'EUR',
				// Suppose we want taxBase=100 => € 21,00
				taxBase: 100,
				// Suppose we want taxBase10=50 => €5,00
				taxBase10: 50,
				// expenses => 25 => €25,00
				expenses: 25
			})

			// The code should show these lines in the tfoot
			expect(screen.getByText(/bi iva @ 21%/i)).toBeInTheDocument()
			expect(screen.getByText(/bi iva @ 10%/i)).toBeInTheDocument()
			expect(screen.getByText(/expenses/i)).toBeInTheDocument()

			// The code typically renders "€ 21,00", not "€21.00"
			expect(screen.getByText(/€ 21,00/i)).toBeInTheDocument()
			expect(screen.getByText(/€ 5,00/i)).toBeInTheDocument()
			expect(screen.getByText(/€ 25,00/i)).toBeInTheDocument()

			// Because taxBreakdown=true, we do NOT see "TOTAL INVOICE"
			expect(screen.queryByText(/total invoice/i)).not.toBeInTheDocument()
		})

		it('allows user to change date, description, and amount fields', () => {
			renderPostingTable({
				status: 'posting',
				taxBreakdown: false,
				currency: 'EUR'
				// lineDate: '2025-01-01' by default from the starterInvoice, presumably
			})

			// 1) The date input is <input type="date" value="2025-01-01"/>
			//   There's no label => let's match by display value
			const dateInput = screen.getByDisplayValue('2025-01-01')
			expect(dateInput).toBeInTheDocument()

			fireEvent.change(dateInput, { target: { value: '2023-04-15' } })
			expect(dateInput).toHaveValue('2023-04-15')

			// 2) The description is <textarea name="lineText" value="...">
			//   If you see "Sample Line Text" in the DOM, let's match by that:
			const descArea = screen.getByDisplayValue(/sample line text/i)
			fireEvent.change(descArea, { target: { value: 'Testing desc' } })
			expect(descArea).toHaveValue('Testing desc')

			// 3) The amount input is type="number" => default might be "100"
			//   We'll look for that:
			const amountInput = screen.getByDisplayValue('100')
			fireEvent.change(amountInput, { target: { value: '999' } })
			expect(amountInput).toHaveValue(999)
		})
	})
})
