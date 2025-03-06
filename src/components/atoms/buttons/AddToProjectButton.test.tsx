import { render, screen, fireEvent } from '@testing-library/react'
import { AddToProjectButton } from './AddToProjectButton'

describe('AddToProjectButton', () => {
	it('should render and trigger onAdd when clicked', () => {
		const mockOnAdd = vi.fn()
		render(<AddToProjectButton onAddToProject={mockOnAdd} />)
		const button = screen.getByTestId('add-to-project-button')
		fireEvent.click(button)
		expect(mockOnAdd).toHaveBeenCalledTimes(1)
	})

	it('should render and show "Add to Project" when not clicked', () => {
		render(<AddToProjectButton onAddToProject={vi.fn()} />)
		expect(screen.getByText('Add to Project')).toBeInTheDocument()
	})

	it('should render and show "Adding..." when clicked', () => {
		render(<AddToProjectButton onAddToProject={vi.fn()} />)
		const button = screen.getByTestId('add-to-project-button')
		fireEvent.click(button)
		expect(screen.getByText('Adding...')).toBeInTheDocument()
	})
})
