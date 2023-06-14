import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AddToProjectButton } from '../../buttons/AddToProjectButton'

const renderAddToProjectButton = (canBeAddedToProject, onAdd) => {
	return render(
		<table>
			<tbody>
				<tr>
					<AddToProjectButton
						canBeAddedToProject={canBeAddedToProject}
						onAdd={onAdd}
					/>
				</tr>
			</tbody>
		</table>
	)
}

describe('AddToProjectButton component', () => {
	it('Does not render when canBeAddedToProject is false', () => {
		const { queryByTestId } = renderAddToProjectButton(null)
		expect(queryByTestId('add-to-project-button')).toBeNull()
	})

	test('Renders correctly when canBeAddedToProject is true', () => {
		const { getByTestId } = renderAddToProjectButton(true)
		expect(getByTestId('add-to-project-button')).toBeInTheDocument()
	})

	test('Calls onAdd when clicked', () => {
		const onAdd = jest.fn()
		const { getByTestId } = renderAddToProjectButton(true, onAdd)

		fireEvent.click(getByTestId('add-to-project-button'))
		expect(onAdd).toHaveBeenCalledTimes(1)
	})
})
