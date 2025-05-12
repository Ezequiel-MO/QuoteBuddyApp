import { vi, describe, beforeEach, it, expect, type Mock } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('../context/ProjectContext', () => ({
	useProject: vi.fn()
}))

vi.mock('@hooks/forms/useCreateNewItem', () => ({
	useCreateNewItem: vi.fn()
}))

vi.mock('@hooks/lists/usePagination', () => ({
	usePagination: vi.fn()
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

vi.mock('@components/molecules', () => ({
	ListHeader: ({
		title,
		handleClick,
		searchItem,
		filterList,
		page,
		totalPages,
		onChangePage,
		children,
		placeHolderSearch
	}: any) => (
		<div data-testid="ListHeader">
			<h1>{title}</h1>
			<button onClick={handleClick}>Create New Item</button>
			<input
				data-testid="search-input"
				value={searchItem}
				onChange={filterList}
				placeholder={placeHolderSearch}
			/>
			<button data-testid="prev-page" onClick={() => onChangePage('prev')}>
				Previous
			</button>
			<span data-testid="current-page">{page}</span>
			<button data-testid="next-page" onClick={() => onChangePage('next')}>
				Next
			</button>
			{children}
		</div>
	)
}))

vi.mock('@components/molecules/table/ListTable', () => ({
	ListTable: ({
		items,
		headers,
		ListItemComponent,
		isLoading,
		canBeAddedToProject,
		searchTerm
	}: any) => (
		<div data-testid="ListTable">
			{isLoading ? (
				<div>Loading...</div>
			) : items.length === 0 ? (
				<div>No projects found.</div>
			) : (
				<table>
					<thead>
						<tr>
							{headers === 'project' &&
								[
									'Code',
									'Location',
									'Client',
									'Group Name',
									'Participants',
									'Arrival',
									'Departure',
									'Status',
									'Estimate'
								].map((header: string) => <th key={header}>{header}</th>)}
						</tr>
					</thead>
					<tbody>
						{items.map((item: any) => (
							<ListItemComponent
								key={item._id}
								item={item}
								canBeAddedToProject={canBeAddedToProject}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}))

vi.mock('../../../components/atoms', () => ({
	CityFilter: ({ city, setCity }: any) => (
		<div data-testid="CityFilter">
			<input
				data-testid="city-filter-input"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="Filter by city"
			/>
		</div>
	)
}))

vi.mock('./ProjectListItem', () => ({
	ProjectListItem: ({ item, canBeAddedToProject }: any) => (
		<tr data-testid="ProjectListItem">
			<td>{item.code}</td>
			<td>{item.groupLocation}</td>
			<td>{item.clientCompanyName || 'N/A'}</td>
			<td>{item.groupName}</td>
			<td>{item.nrPax}</td>
			<td>{item.arrivalDay}</td>
			<td>{item.departureDay}</td>
			<td>{item.status}</td>
			<td>{item.estimate}</td>
			<td>
				<button onClick={() => {}}>Actions</button>
			</td>
		</tr>
	)
}))

// **Mock Custom Hooks**

const mockDispatch = vi.fn()
const mockSetForceRefresh = vi.fn()
const mockSetCurrentProject = vi.fn()
const mockCreateNewItem = vi.fn()
const mockChangePage = vi.fn()

import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
// **Import the Component After Mocking Dependencies**

import { ProjectList } from './ProjectList'
import { useProject } from '../context/ProjectContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { useCurrentProject } from 'src/hooks'
import { usePagination } from 'src/hooks/lists/usePagination'
import { IProject } from '@interfaces/project'
import { IClientCompany } from '@interfaces/clientCompany'
import { starterCompany, starterHotel } from '@constants/starterObjects'
import { IHotel } from '@interfaces/hotel'

// Update mockProject1 and mockProject2 with valid data

const mockClientCompany: IClientCompany = {
	...starterCompany
}

const mockHotel: IHotel = {
	...starterHotel
}

const mockProject1: IProject = {
	_id: 'proj-001',
	code: 'PROJ2023-001',
	accountManager: [
		{
			_id: 'acc-001',
			firstName: 'John',
			familyName: 'Doe',
			email: 'john@test.com',
			imageContentUrl: []
		}
	],
	groupName: 'Test Group 1',
	groupLocation: 'Barcelona',
	arrivalDay: '2023-09-01',
	departureDay: '2023-09-07',
	nrPax: 25,
	projectIntro: ['Welcome to Project 1'],
	suplementaryText: true,
	hotels: [mockHotel],
	status: 'Confirmed',
	estimate: 50000,
	budget: 'budget',
	imageContentUrl: [],
	hasSideMenu: true,
	multiDestination: false,
	hideDates: false,
	hasExternalCorporateImage: false,
	clientAccManager: [],
	clientCompany: [mockClientCompany],
	schedule: [],
	gifts: [],
	languageVendorDescriptions: 'English/Spanish',
	invoices: [],
	collectionsFromClient: [],
	requiresCashFlowVerification: true
}

const mockProject2: IProject = {
	...mockProject1,
	_id: 'proj-002',
	code: 'PROJ2023-002',
	groupName: 'Test Group 2',
	groupLocation: 'Madrid',
	status: 'Received',
	estimate: 75000,
	nrPax: 35
}

const mockState = {
	projects: [mockProject1, mockProject2],
	searchTerm: '',
	page: 1,
	totalPages: 2,
	groupLocation: '',
	isLoading: false
}

const mockUseProject = {
	state: mockState,
	dispatch: mockDispatch,
	setForceRefresh: mockSetForceRefresh,
	isLoading: false
}

const mockUseCreateNewItem = {
	createNewItem: mockCreateNewItem
}

const mockUsePagination = {
	changePage: mockChangePage
}

const mockUseCurrentProject = {
	clearProject: vi.fn(),
	setCurrentProject: mockSetCurrentProject
}

describe('ProjectList', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		;(useProject as Mock).mockReturnValue(mockUseProject)
		;(useCreateNewItem as Mock).mockReturnValue(mockUseCreateNewItem)
		;(usePagination as Mock).mockReturnValue(mockUsePagination)
		;(useCurrentProject as Mock).mockReturnValue(mockUseCurrentProject)
	})

	it('renders ListHeader and ListTable correctly', () => {
		render(<ProjectList />)

		expect(screen.getByTestId('ListHeader')).toBeInTheDocument()
		expect(screen.getByTestId('ListTable')).toBeInTheDocument()
		expect(screen.getByText('Projects')).toBeInTheDocument()
		expect(screen.getAllByTestId('ProjectListItem')).toHaveLength(2)
	})
	it('handles search input changes', async () => {
		render(<ProjectList />)

		const searchInput: HTMLInputElement = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 'test' } })

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'SET_SEARCH_TERM',
				payload: 'test'
			})
		})
	})

	it('filters projects by city', async () => {
		render(<ProjectList />)
		const cityInput = screen.getByTestId('city-filter-input')
		fireEvent.change(cityInput, { target: { value: 'Paris' } })

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'SET_GROUP_LOCATION',
				payload: 'Paris'
			})
		})
	})

	it('handles pagination controls', async () => {
		render(<ProjectList />)

		expect(mockChangePage).not.toHaveBeenCalled()
		expect(mockSetForceRefresh).not.toHaveBeenCalled()

		fireEvent.click(screen.getByTestId('next-page'))
		expect(mockChangePage).toHaveBeenLastCalledWith('next')
		expect(mockSetForceRefresh).toHaveBeenCalledTimes(1)

		mockChangePage.mockClear()
		mockSetForceRefresh.mockClear()

		fireEvent.click(screen.getByTestId('prev-page'))
		expect(mockChangePage).toHaveBeenLastCalledWith('prev')
		expect(mockSetForceRefresh).toHaveBeenCalledTimes(1)
	})

	it('creates new project when button is clicked', async () => {
		render(<ProjectList />)
		fireEvent.click(screen.getByText('Create New Item'))

		await waitFor(() => {
			expect(mockUseCurrentProject.clearProject).toHaveBeenCalledTimes(1)
			expect(mockCreateNewItem).toHaveBeenCalledTimes(1)
		})
	})

	it('shows loading state', async () => {
		;(useProject as Mock).mockReturnValue({
			...mockUseProject,
			isLoading: true
		})
		render(<ProjectList />)
		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})

	it('shows no projects found message', async () => {
		const projects = [
			{ ...mockProject1, code: 'BCNSAMPLE2023' },
			{ ...mockProject2, code: 'MADRSAMPLE2023' }
		]

		const filteredProjects = projects.filter((project) =>
			project.code.includes('BCN')
		)
		;(useProject as Mock).mockReturnValue({
			...mockUseProject,
			state: {
				...mockState,
				projects: filteredProjects,
				searchTerm: 'BCN'
			}
		})
		render(<ProjectList />)
		expect(screen.getAllByTestId('ProjectListItem')).toHaveLength(1)
	})

	it('shows empty state when no projects exist', async () => {
		;(useProject as Mock).mockReturnValue({
			...mockUseProject,
			state: {
				...mockState,
				projects: [],
				searchTerm: ''
			}
		})

		render(<ProjectList />)
		expect(screen.getByText('No projects found.')).toBeInTheDocument()
	})

	it('renders project details correctly in list items', () => {
		render(<ProjectList />)

		const items = screen.getAllByTestId('ProjectListItem')
		expect(items).toHaveLength(2)

		expect(items[0]).toHaveTextContent(mockProject1.code)
		expect(items[0]).toHaveTextContent(mockProject1.groupLocation)

		expect(items[1]).toHaveTextContent(mockProject2.code)
		expect(items[1]).toHaveTextContent(mockProject2.groupLocation)
	})

	it('maintains search term after navigation', async () => {
		const testSearchTerm = 'test search'

		// Initial render with search term
		;(useProject as Mock).mockReturnValue({
			...mockUseProject,
			state: {
				...mockState,
				searchTerm: testSearchTerm
			}
		})

		const { rerender } = render(<ProjectList />)

		// Simulate re-render after navigation
		rerender(<ProjectList />)

		const searchInput = screen.getByTestId('search-input') as HTMLInputElement
		await waitFor(() => {
			expect(searchInput.value).toBe(testSearchTerm)
		})
	})

	it('resets to first page when search term changes', async () => {
		render(<ProjectList />)

		// Set page to 2
		fireEvent.click(screen.getByTestId('next-page'))

		// Change search term
		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 'new search' } })

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'SET_PAGE',
				payload: 1
			})
		})
	})

	it('handles API error state', async () => {
		;(useProject as Mock).mockReturnValue({
			...mockUseProject,
			state: {
				...mockState,
				projects: [],
				isLoading: false,
				error: 'Error fetching projects'
			}
		})

		render(<ProjectList />)
		expect(screen.getByText('No projects found.')).toBeInTheDocument()
	})

	it('clears filters when unmounted', () => {
		const { unmount } = render(<ProjectList />)

		unmount()

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_SEARCH_TERM',
			payload: ''
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_GROUP_LOCATION',
			payload: ''
		})
	})
})
