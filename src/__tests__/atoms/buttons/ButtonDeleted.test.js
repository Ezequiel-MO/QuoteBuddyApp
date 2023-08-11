import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ButtonDeleted } from '../../../components/atoms'
import { useAuth } from '../../../hooks'

jest.mock('@iconify/react', () => ({ Icon: () => <div>Icon</div> }))
jest.mock('../../../helper/RemoveItemFromList', () => ({
	removeItemFromList: jest.fn()
}))
jest.mock('../../../hooks', () => ({
	useAuth: jest.fn()
}))
jest.mock('../../../axios/axiosConfig')

describe('ButtonDeleted', () => {
	const endpoint = 'http://example.com/api/items'
	const ID = '1'
	const setter = jest.fn()
	const items = [
		{ id: '1', name: 'Item 1' },
		{ id: '2', name: 'Item 2' }
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders without crashing', () => {
		useAuth.mockReturnValue({
			auth: { role: 'admin' }
		})
		render(
			<ButtonDeleted
				endpoint={endpoint}
				ID={ID}
				setter={setter}
				items={items}
			/>
		)
		const deleteButton = screen.getByRole('button')
		expect(deleteButton).toBeInTheDocument()
	})

	it("doesn't render for non-admin users", () => {
		useAuth.mockReturnValue({
			auth: { role: 'user' }
		})
		render(
			<ButtonDeleted
				endpoint={endpoint}
				ID={ID}
				setter={setter}
				items={items}
			/>
		)
		expect(screen.queryByRole('button')).toBeNull()
	})
})
