import { type Mock } from 'vitest'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import renderWithProjectProvider from 'src/helper/testing/renderWithProjectProvider'
import { BudgetTable } from './BudgetTable'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'

vi.mock('src/axios/axiosConfig', () => ({
	__esModule: true,
	default: {
		patch: vi.fn()
	}
}))

vi.mock('react-toastify', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn()
	}
}))

describe('BudgetTable', () => {
	beforeEach(() => {
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
		vi.clearAllMocks()
	})

	it('renders a table', () => {
		renderWithProjectProvider(<BudgetTable />)
		const tableEl = screen.getByRole('table')
		expect(tableEl).toBeInTheDocument()
	})

	it('displays "Save Budget" button if path != /client', () => {
		renderWithProjectProvider(<BudgetTable />)
		const saveBtn = screen.queryByRole('button', { name: /save budget/i })
		expect(saveBtn).toBeInTheDocument()
	})

	it('calls baseAPI.patch on "Save Budget" click (happy path)', async () => {
		;(baseAPI.patch as Mock).mockResolvedValueOnce({
			data: {
				data: {
					data: { _id: 'someProjectId' }
				}
			}
		})

		renderWithProjectProvider(<BudgetTable />)

		const saveBtn = screen.getByRole('button', { name: /save budget/i })
		await act(async () => {
			fireEvent.click(saveBtn)
		})

		await waitFor(() => expect(baseAPI.patch).toHaveBeenCalledTimes(1))
		expect(toast.success).toHaveBeenCalledWith(
			'Budget saved',
			expect.any(Object)
		)
	})

	it('handles patch error gracefully', async () => {
		;(baseAPI.patch as Mock).mockRejectedValueOnce(new Error('Network error'))

		renderWithProjectProvider(<BudgetTable />)
		const saveBtn = screen.getByRole('button', { name: /save budget/i })
		await act(async () => {
			fireEvent.click(saveBtn)
		})

		await waitFor(() => expect(baseAPI.patch).toHaveBeenCalledTimes(1))
		expect(toast.error).toHaveBeenCalledWith(
			'Network error',
			expect.any(Object)
		)
	})
})
