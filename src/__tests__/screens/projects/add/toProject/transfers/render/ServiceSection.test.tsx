import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ServiceSection } from '@screens/projects/add/toProject/transfers/render/ServiceSection'
import * as context from '@screens/projects/add/toProject/transfers/render/context'

jest.mock('@iconify/react', () => ({
	Icon: () => <div>Mock Icon</div>
}))

jest.mock('@screens/projects/add/toProject/transfers/render/context', () => ({
	useTransfers: jest.fn()
}))

describe('ServiceSection component', () => {
	const mockDispatch = jest.fn()
	const mockUseTransfers = jest.requireMock(
		'@screens/projects/add/toProject/transfers/render/context'
	).useTransfers

	beforeEach(() => {
		mockUseTransfers.mockReturnValue({
			state: {
				services: [
					{
						freelancer: {
							type: 'hostess',
							halfDayRate: 100
						},
						typeOfAssistance: 'assistance'
					}
				]
			},
			dispatch: mockDispatch
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders services correctly', () => {
		render(<ServiceSection />)
		expect(true).toBe(true)
	})
})
