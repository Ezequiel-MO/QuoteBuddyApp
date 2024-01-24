import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from 'src/components/atoms/buttons/Button'

describe('<Button />', () => {
	it('renders the button with children', () => {
		const buttonText = 'Click me'
		render(
			<Button icon="mdi:home" type="button">
				{buttonText}
			</Button>
		)
		expect(screen.getByText(buttonText)).toBeInTheDocument()
	})

	it('triggers handleClick when clicked', () => {
		const handleClick = vi.fn()
		render(
			<Button icon="mdi:home" type="button" handleClick={handleClick}>
				Click me
			</Button>
		)
		fireEvent.click(screen.getByText('Click me'))
		expect(handleClick).toHaveBeenCalled()
	})
})
