import {
	render,
	screen,
	fireEvent,
	within,
	waitFor
} from '@testing-library/react'
import { CountryFilter } from './CountryFilter'
import { useApiFetch } from '../../../hooks/fetchData/useApiFetch'
import { vi } from 'vitest'
import { ICountry } from '../../../interfaces/country'
import { useState } from 'react'

// Mock the useApiFetch hook
vi.mock('../../../hooks/fetchData/useApiFetch')

const mockCountries: ICountry[] = [
	{ accessCode: 'US', name: 'United States', quoteLanguage: 'EN' },
	{ accessCode: 'CA', name: 'Canada', quoteLanguage: 'EN' },
	{ accessCode: 'MX', name: 'Mexico', quoteLanguage: 'ES' }
]

describe('CountryFilter', () => {
	const mockSetCountry = vi.fn()

	beforeEach(() => {
		;(useApiFetch as any).mockReturnValue({
			data: mockCountries,
			isLoading: false,
			error: null
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders initial state correctly', () => {
		render(<CountryFilter country="" setCountry={mockSetCountry} />)
		expect(screen.getByText('All countries')).toBeInTheDocument()
	})

	it('shows loading state', () => {
		;(useApiFetch as any).mockReturnValue({ isLoading: true })
		render(<CountryFilter country="" setCountry={mockSetCountry} />)
		expect(screen.getByTestId('Spinner')).toBeInTheDocument()
	})

	it('opens and closes dropdown', async () => {
		render(<CountryFilter country="" setCountry={mockSetCountry} />)

		// Open dropdown
		fireEvent.click(screen.getByRole('button'))
		expect(screen.getByRole('listbox')).toBeInTheDocument()

		// Close by clicking outside
		fireEvent.mouseDown(document.body)
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
	})

	it('filters countries by search term', async () => {
		render(<CountryFilter country="" setCountry={mockSetCountry} />)
		fireEvent.click(screen.getByRole('button'))

		const searchInput = screen.getByPlaceholderText('Start typing...')
		fireEvent.change(searchInput, { target: { value: 'can' } })

		const options = within(screen.getByRole('listbox')).getAllByRole('option')
		expect(options).toHaveLength(2) // "All countries" + Canada
		expect(options[1]).toHaveTextContent('Canada')
	})

	it('selects country on click', async () => {
		const Wrapper = () => {
			const [country, setCountry] = useState<string>('')
			return <CountryFilter country={country} setCountry={setCountry} />
		}

		render(<Wrapper />)

		fireEvent.click(screen.getByRole('button'))
		const canadaOption = within(screen.getByRole('listbox')).getByText('Canada')
		fireEvent.click(canadaOption)

		await waitFor(() => {
			expect(screen.getByRole('button')).toHaveTextContent(/canada/i)
		})
	})

	it('selects first match on Enter', async () => {
		render(<CountryFilter country="" setCountry={mockSetCountry} />)
		fireEvent.click(screen.getByRole('button'))

		const searchInput = screen.getByPlaceholderText('Start typing...')
		fireEvent.change(searchInput, { target: { value: 'mex' } })
		fireEvent.keyDown(searchInput, { key: 'Enter' })

		expect(mockSetCountry).toHaveBeenCalledWith('MX')
	})

	it('shows "All countries" option', async () => {
		const Wrapper = () => {
			const [country, setCountry] = useState<string>('US')
			return <CountryFilter country={country} setCountry={setCountry} />
		}

		render(<Wrapper />)

		fireEvent.click(screen.getByRole('button'))
		const allCountriesOption = within(screen.getByRole('listbox')).getByText(
			'All countries'
		)
		fireEvent.click(allCountriesOption)

		await waitFor(() => {
			expect(screen.getByRole('button')).toHaveTextContent('All countries')
		})
	})

	it('handles invalid selected country', () => {
		render(<CountryFilter country="XX" setCountry={mockSetCountry} />)
		expect(screen.getByText('Invalid selection')).toBeInTheDocument()
	})
})
