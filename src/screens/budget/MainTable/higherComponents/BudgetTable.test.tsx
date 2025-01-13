import { fireEvent, screen } from '@testing-library/react'
import renderWithProjectProvider from 'src/helper/testing/renderWithProjectProvider'
import { BudgetTable } from './BudgetTable'
import baseAPI from 'src/axios/axiosConfig'

vi.mock('src/axios/axiosConfig', () => ({
	__esModule: true,
	default: {
		patch: vi.fn()
	}
}))

describe('BudgetTable', () => {
	beforeEach(() => {
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
		;(baseAPI.patch as jest.Mock).mockResolvedValueOnce({
			data: {
				data: {
					data: { _id: 'someProjectId' }
				}
			}
		})

		renderWithProjectProvider(<BudgetTable />)

		const saveBtn = screen.getByRole('button', { name: /save budget/i })
		fireEvent.click(saveBtn)

		expect(baseAPI.patch).toHaveBeenCalledTimes(1)
		expect(saveBtn).toBeDisabled()
	})

	it('handles patch error gracefully', async () => {
		;(baseAPI.patch as jest.Mock).mockRejectedValueOnce(
			new Error('Network error')
		)

		renderWithProjectProvider(<BudgetTable />)
		const saveBtn = screen.getByRole('button', { name: /save budget/i })
		fireEvent.click(saveBtn)

		expect(baseAPI.patch).toHaveBeenCalledTimes(1)
	})
})
