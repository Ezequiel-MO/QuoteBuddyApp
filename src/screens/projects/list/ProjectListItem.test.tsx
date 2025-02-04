import { vi, describe, beforeEach, it, expect, type Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { ProjectListItem } from './ProjectListItem'
import { useProject } from '../context/ProjectContext'
import { useCurrentProject } from 'src/hooks'
import { formatMoney } from '../../../helper'
import { IProject } from '@interfaces/project'
import { IClientCompany } from '@interfaces/clientCompany'
import { starterCompany } from 'src/constants/starterObjects'

// Mock dependencies
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual<typeof import('react-router-dom')>(
		'react-router-dom'
	)
	return {
		...actual,
		useNavigate: vi.fn()
	}
})

vi.mock('../../../helper', () => ({
	formatMoney: vi.fn((n) => `$${n}`)
}))

vi.mock('../context/ProjectContext', () => ({
	useProject: vi.fn(() => ({ dispatch: vi.fn() }))
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn(() => ({ setCurrentProject: vi.fn() }))
}))

vi.mock('./ProjectListActions', () => ({
	ProjectListActions: () => <div data-testid="project-actions-menu" />
}))

vi.mock('@iconify/react', () => ({
	Icon: () => <div data-testid="icon">Icon</div>
}))

const mockClientCompany: IClientCompany = {
	...starterCompany,
	_id: 'comp-001',
	name: 'Test Company'
}

const mockProject: IProject = {
	_id: 'proj-001',
	code: 'PROJ2023',
	groupLocation: 'Barcelona',
	accountManager: [],
	clientCompany: [mockClientCompany],
	groupName: 'Test Group',
	nrPax: 25,
	arrivalDay: '2023-09-01',
	departureDay: '2023-09-07',
	status: 'Confirmed',
	estimate: 50000,
	// Required fields from interface
	projectIntro: [],
	suplementaryText: false,
	hotels: [],
	budget: 'budget',
	imageContentUrl: [],
	hasSideMenu: false,
	multiDestination: false,
	hideDates: false,
	hasExternalCorporateImage: false,
	clientAccManager: [],
	schedule: [],
	gifts: [],
	languageVendorDescriptions: '',
	invoices: [],
	collectionsFromClient: [],
	requiresCashFlowVerification: false
}

// Helper function to render components inside a table structure.
const renderInTable = (component: React.ReactNode) =>
	render(
		<table>
			<tbody>{component}</tbody>
		</table>
	)

describe('ProjectListItem', () => {
	const mockDispatch = vi.fn()
	const mockSetCurrentProject = vi.fn()
	const mockNavigate = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
		;(useProject as any).mockReturnValue({ dispatch: mockDispatch })
		;(useCurrentProject as any).mockReturnValue({
			setCurrentProject: mockSetCurrentProject
		})
		;(useNavigate as Mock).mockReturnValue(mockNavigate)
	})

	it('renders all project data correctly', () => {
		renderInTable(<ProjectListItem item={mockProject} />)

		expect(screen.getByText(mockProject.code)).toBeInTheDocument()
		expect(screen.getByText(mockProject.groupLocation)).toBeInTheDocument()
		expect(
			screen.getByText(mockProject.clientCompany[0].name)
		).toBeInTheDocument()
		expect(screen.getByText(mockProject.groupName)).toBeInTheDocument()
		expect(screen.getByText(mockProject.nrPax.toString())).toBeInTheDocument()
		expect(screen.getByText(mockProject.arrivalDay)).toBeInTheDocument()
		expect(screen.getByText(mockProject.departureDay)).toBeInTheDocument()
		expect(screen.getByText(mockProject.status)).toBeInTheDocument()
		expect(screen.getByText(`$${mockProject.estimate}`)).toBeInTheDocument()
	})

	describe('Client Company Name handling', () => {
		it('shows client company name from array when available', () => {
			renderInTable(<ProjectListItem item={mockProject} />)
			expect(screen.getByText('Test Company')).toBeInTheDocument()
		})

		it('falls back to clientCompanyName when array is empty', () => {
			const projectWithoutCompany = {
				...mockProject,
				clientCompany: [],
				clientCompanyName: 'Fallback Company'
			}
			renderInTable(<ProjectListItem item={projectWithoutCompany} />)
			expect(screen.getByText('Fallback Company')).toBeInTheDocument()
		})
	})

	describe('Navigation', () => {
		it('triggers navigation when clicking on code cell', () => {
			renderInTable(<ProjectListItem item={mockProject} />)
			fireEvent.click(screen.getByText(mockProject.code))

			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'TOGGLE_UPDATE',
				payload: true
			})
			expect(mockSetCurrentProject).toHaveBeenCalledWith(mockProject)
			expect(mockNavigate).toHaveBeenCalledWith('specs')
		})
	})

	describe('Actions menu', () => {
		it('toggles menu visibility when clicking menu icon', () => {
			renderInTable(<ProjectListItem item={mockProject} />)

			// Initial state - menu closed
			expect(
				screen.queryByTestId('project-actions-menu')
			).not.toBeInTheDocument()

			// Open menu
			fireEvent.click(screen.getByTestId('icon').parentElement!)
			expect(screen.getByTestId('project-actions-menu')).toBeInTheDocument()

			// Close menu
			fireEvent.click(screen.getByTestId('icon').parentElement!)
			expect(
				screen.queryByTestId('project-actions-menu')
			).not.toBeInTheDocument()
		})
	})

	it('formats estimate correctly using formatMoney', () => {
		renderInTable(<ProjectListItem item={mockProject} />)
		expect(formatMoney).toHaveBeenCalledWith(mockProject.estimate)
		expect(screen.getByText(`$${mockProject.estimate}`)).toBeInTheDocument()
	})
})
