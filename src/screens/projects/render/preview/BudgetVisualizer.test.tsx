import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import { ProjectProvider } from '@screens/projects/context/ProjectContext'
import BudgetVisualizer from './BudgetVisualizer'

vi.mock('@screens/budget/partial-costs/usePartialCostsData', () => ({
	usePartialCostsData: () => ({
		totalCostOfItems: 12345
	})
}))

function renderWithProjectProvider(ui: React.ReactNode) {
	return render(
		<MemoryRouter>
			<Provider store={store}>
				<ProjectProvider>{ui}</ProjectProvider>
			</Provider>
		</MemoryRouter>
	)
}

describe('BudgetVisualizer', () => {
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should render the budget visualizer in "closed" state by default', () => {
		const { container } = renderWithProjectProvider(<BudgetVisualizer />)
		expect(container.firstChild).toHaveClass('translate-x-full')
	})

	it('should toggle the visualizer when the "Hide" button is clicked', () => {
		const { container, getByRole } = renderWithProjectProvider(
			<BudgetVisualizer />
		)

		expect(container.firstChild).toHaveClass('translate-x-full')

		const hideButton = screen.getByText(/hide/i)
		fireEvent.click(hideButton)

		expect(container.firstChild).toHaveClass('translate-x-0')
	})

	it('should display the heading "Budget Visualizer"', () => {
		renderWithProjectProvider(<BudgetVisualizer />)
		const heading = screen.getByText(/Budget Visualizer/i)
		expect(heading).toBeInTheDocument()
	})

	it('should handle resizing on mouse drag', async () => {
		const { container } = renderWithProjectProvider(<BudgetVisualizer />)
		const resizer = container.querySelector('.cursor-ew-resize') as HTMLElement
		expect(resizer).toBeInTheDocument()

		fireEvent.mouseDown(resizer, { clientX: 200 })
		fireEvent.mouseMove(document, { clientX: 150 })
		fireEvent.mouseUp(document)

		await waitFor(() => {
			const outerDiv = container.querySelector('[role="dialog"]') as HTMLElement
			const finalWidth = outerDiv.style.width
			expect(finalWidth).toMatch(/\d+(\.\d+)?%/)
		})
	})
})
