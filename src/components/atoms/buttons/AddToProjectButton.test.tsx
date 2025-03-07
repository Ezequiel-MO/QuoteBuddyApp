import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { AddToProjectButton } from './AddToProjectButton'

describe('AddToProjectButton', () => {
	it('should render and trigger onAdd when clicked', async () => {
		const mockOnAdd = vi.fn()
		render(
			<table>
				<tbody>
					<tr>
						<AddToProjectButton onAddToProject={mockOnAdd} />
					</tr>
				</tbody>
			</table>
		)
		const button = screen.getByTestId('add-to-project-button')
		await act(async () => {
			fireEvent.click(button)
		})
		expect(mockOnAdd).toHaveBeenCalledTimes(1)
	})

	it('should render and show "Add to Project" when not clicked', () => {
		render(
			<table>
				<tbody>
					<tr>
						<AddToProjectButton onAddToProject={vi.fn()} />
					</tr>
				</tbody>
			</table>
		)
		expect(screen.getByText('Add to Project')).toBeInTheDocument()
	})

	it('should render and show "Adding..." when clicked', async () => {
		const mockOnAdd = vi
			.fn()
			.mockImplementation(
				() => new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
			)
		render(
			<table>
				<tbody>
					<tr>
						<AddToProjectButton onAddToProject={mockOnAdd} />
					</tr>
				</tbody>
			</table>
		)
		const button = screen.getByTestId('add-to-project-button')
		await act(async () => {
			fireEvent.click(button)
		})
		await waitFor(
			() => {
				expect(screen.getByText('Adding...')).toBeInTheDocument()
			},
			{ timeout: 1000 }
		)
		// Wait for loading to finish
		await screen.findByText('Add to Project')
	})
})
