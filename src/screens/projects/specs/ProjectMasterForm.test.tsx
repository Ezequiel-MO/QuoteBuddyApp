import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, beforeEach, it, expect, type Mock } from 'vitest'
import { ProjectMasterForm } from './ProjectMasterForm'
import { useProject } from '@screens/projects/context/ProjectContext'
import { useCurrentProject } from 'src/hooks'
import { useNavigate } from 'react-router-dom'
import { resetProjectFilters } from './resetProjectFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { IProject } from '@interfaces/project'

vi.mock('@screens/projects/context/ProjectContext')
vi.mock('src/hooks')
vi.mock('react-router-dom')
vi.mock('src/helper/forms/updateEntity')
vi.mock('src/helper/forms/createEntity')
vi.mock('./resetProjectFields')
vi.mock('../images/ProjectImagesModal', () => ({
	default: () => <div>ProjectImagesModal</div>,
	__esModule: true
}))
vi.mock('src/hooks/images/useImageModal', () => ({
	useImageModal: vi.fn()
}))
vi.mock('src/context/auth/AuthProvider', () => ({
	useAuth: vi.fn().mockImplementation(() => ({
		user: { _id: 'test-user' },
		isLoading: false,
		isAuthenticated: true,
		role: 'admin'
	}))
}))

const mockDispatch = vi.fn()
const mockSetForceRefresh = vi.fn()
const mockSetCurrentProject = vi.fn()
const mockNavigate = vi.fn()
const mockHandleProjectInputChange = vi.fn()
const mockHandleProjectBlur = vi.fn()
const mockHandleScheduleDays = vi.fn()
const mockOpenModal = vi.fn()
const mockCloseModal = vi.fn()

// Define a mock project
const mockProject: IProject = {
	...defaultProject
}

describe('ProjectMasterForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		;(useProject as Mock).mockReturnValue({
			state: {
				projects: [],
				imagesModal: false,
				update: false
			},
			dispatch: mockDispatch,
			handleChange: vi.fn(), // Mocked as a function
			handleBlur: vi.fn(), // Mocked as a function
			errors: {},
			setForceRefresh: mockSetForceRefresh
		})
		;(useCurrentProject as Mock).mockReturnValue({
			currentProject: mockProject,
			setCurrentProject: mockSetCurrentProject,
			handleProjectInputChange: mockHandleProjectInputChange,
			handleProjectBlur: mockHandleProjectBlur,
			handleScheduleDays: mockHandleScheduleDays
		})
		;(useNavigate as Mock).mockReturnValue(mockNavigate)
		;(useImageModal as Mock).mockReturnValue({
			openModal: mockOpenModal,
			closeModal: mockCloseModal
		})
	})

	it('renders the form with submit button', () => {
		render(<ProjectMasterForm />)
		expect(screen.getByTestId('project-master-form')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
	})

	describe('Form Submission', () => {
		it('handles update submission when project has ID', async () => {
			;(useCurrentProject as Mock).mockReturnValue({
				currentProject: { ...mockProject, _id: '123' },
				setCurrentProject: mockSetCurrentProject,
				handleProjectInputChange: mockHandleProjectInputChange,
				handleProjectBlur: mockHandleProjectBlur,
				handleScheduleDays: mockHandleScheduleDays
			})

			render(<ProjectMasterForm />)
			fireEvent.submit(screen.getByTestId('project-master-form'))

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SCHEDULE' })
				expect(updateEntity).toHaveBeenCalledWith(
					'projects',
					expect.objectContaining({ _id: '123' }),
					[],
					mockDispatch
				)
				expect(resetProjectFilters).toHaveBeenCalledWith(mockDispatch, {
					groupLocation: ''
				})
				expect(mockSetForceRefresh).toHaveBeenCalledWith(expect.any(Function))
				expect(mockNavigate).toHaveBeenCalledWith('/app/project')
			})
		})

		it('handles create submission when project has no ID', async () => {
			;(useCurrentProject as Mock).mockReturnValue({
				currentProject: { ...mockProject, _id: undefined },
				setCurrentProject: mockSetCurrentProject,
				handleProjectInputChange: mockHandleProjectInputChange,
				handleProjectBlur: mockHandleProjectBlur,
				handleScheduleDays: mockHandleScheduleDays
			})

			render(<ProjectMasterForm />)
			fireEvent.submit(screen.getByTestId('project-master-form'))

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SCHEDULE' })
				expect(createEntity).toHaveBeenCalledWith(
					'projects',
					expect.objectContaining({}),
					[],
					mockDispatch
				)
				expect(resetProjectFilters).toHaveBeenCalledWith(mockDispatch, {
					groupLocation: ''
				})
				expect(mockSetForceRefresh).toHaveBeenCalledWith(expect.any(Function))
				expect(mockNavigate).toHaveBeenCalledWith('/app/project')
			})
		})

		it('dispatches CLEAR_SCHEDULE on submit', async () => {
			render(<ProjectMasterForm />)
			fireEvent.submit(screen.getByTestId('project-master-form'))

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SCHEDULE' })
			})
		})
	})

	describe('Conditional PDF Button', () => {
		it('renders PDF button when budget is budgetAsPdf', () => {
			;(useCurrentProject as Mock).mockReturnValue({
				currentProject: { ...mockProject, budget: 'budgetAsPdf' },
				setCurrentProject: mockSetCurrentProject,
				handleProjectInputChange: mockHandleProjectInputChange,
				handleProjectBlur: mockHandleProjectBlur,
				handleScheduleDays: mockHandleScheduleDays
			})

			render(<ProjectMasterForm />)
			expect(screen.getByText('UPLOAD BUDGET PDF')).toBeInTheDocument()
		})

		it('opens modal when PDF button is clicked', () => {
			;(useCurrentProject as Mock).mockReturnValue({
				currentProject: { ...mockProject, budget: 'budgetAsPdf' },
				setCurrentProject: mockSetCurrentProject,
				handleProjectInputChange: mockHandleProjectInputChange,
				handleProjectBlur: mockHandleProjectBlur,
				handleScheduleDays: mockHandleScheduleDays
			})
			;(useProject as Mock).mockReturnValue({
				state: {
					projects: [],
					imagesModal: false,
					update: false
				},
				dispatch: mockDispatch,
				handleChange: vi.fn(),
				handleBlur: vi.fn(),
				errors: {},
				setForceRefresh: mockSetForceRefresh
			})

			render(<ProjectMasterForm />)
			const pdfButton = screen.getByText('UPLOAD BUDGET PDF')
			fireEvent.click(pdfButton)

			// Verify that openModal was called
			expect(mockOpenModal).toHaveBeenCalled()
		})
	})

	it('displays correct submit button text based on update state', () => {
		;(useProject as Mock).mockReturnValue({
			state: {
				projects: [],
				imagesModal: false,
				update: true
			},
			dispatch: mockDispatch,
			handleChange: vi.fn(),
			handleBlur: vi.fn(),
			errors: {},
			setForceRefresh: mockSetForceRefresh
		})

		render(<ProjectMasterForm />)
		expect(screen.getByText('Edit & Exit')).toBeInTheDocument()
	})
})
