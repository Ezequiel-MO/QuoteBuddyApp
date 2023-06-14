import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CreateButton } from '../../buttons/CreateButton'

describe('CreateButton component', () => {
	const title = 'Test'
	const handleClick = jest.fn()

	it('should render correctly', () => {
		const { getByText } = render(
			<CreateButton title={title} handleClick={handleClick} />
		)
		expect(getByText(`Create New ${title}`)).toBeInTheDocument()
	})

	it('should call handleClick when clicked', () => {
		const { getByText } = render(
			<CreateButton title={title} handleClick={handleClick} />
		)
		const button = getByText(`Create New ${title}`)
		fireEvent.click(button)
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('should have correct classnames', () => {
		const { getByText } = render(
			<CreateButton title={title} handleClick={handleClick} />
		)
		const button = getByText(`Create New ${title}`)
		expect(button).toHaveClass(
			'mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'
		)
	})
	it('should handle missing handleClick gracefully', () => {
		const title = 'Test'
		const { getByText } = render(<CreateButton title={title} />)
		const button = getByText(`Create New ${title}`)
		expect(() => {
			fireEvent.click(button)
		}).not.toThrow()
	})
})
