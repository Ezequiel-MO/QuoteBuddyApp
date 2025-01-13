import { ProjectProvider } from '@screens/projects/context/ProjectContext'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from 'src/redux/store'

function renderWithProjectProvider(ui: React.ReactNode) {
	return render(
		<MemoryRouter>
			<Provider store={store}>
				<ProjectProvider>{ui}</ProjectProvider>
			</Provider>
		</MemoryRouter>
	)
}

export default renderWithProjectProvider
