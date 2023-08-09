import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IntroAdd } from '../../components/atoms'

jest.mock('@iconify/react', () => {
	return {
		Icon: () => <div>Mock Icon</div>
	}
})

describe('IntroAdd component', () => {
	const setOpen = jest.fn()

	it('Renders correctly', () => {
		render(<IntroAdd setOpen={setOpen} events={{}} />)
		expect(screen.getByText('Mock Icon')).toBeInTheDocument()
	})

	it('Calls setOpen when clicked', () => {
		render(<IntroAdd setOpen={setOpen} events={{}} />)
		fireEvent.click(screen.getByText('Mock Icon'))
		expect(setOpen).toHaveBeenCalledTimes(1)
	})

	it('Displays "Add Intro" when there is no intro event', () => {
		render(<IntroAdd setOpen={setOpen} events={{}} />)
		expect(screen.getByText('Add Intro')).toBeInTheDocument()
	})

	it('Displays "Edit Intro" when there is an intro event', () => {
		render(<IntroAdd setOpen={setOpen} events={{ intro: 'test' }} />)
		expect(screen.getByText('Edit Intro')).toBeInTheDocument()
	})
})
