import { vi, describe, beforeEach, it, expect, type Mock } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// **Mock Dependencies Before Importing the Component**

vi.mock('@screens/projects/context/ProjectContext', () => ({
	useProject: vi.fn()
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

vi.mock('src/context/auth/AuthProvider', () => ({
	useAuth: vi.fn()
}))

// **Mock @components/atoms/nativeInputs/BooleanSelectInput Correctly**

vi.mock('@components/atoms/nativeInputs/BooleanSelectInput', () => ({
	BooleanSelectInput: ({ label, name, value, handleChange, ...props }: any) => (
		<div data-testid={`booleanselectinput-${label}`}>
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				{...props}
			>
				<option value="true">Cash Flow Verification</option>
				<option value="false">No Cash Flow Verification</option>
			</select>
		</div>
	)
}))

// **Mock Other Components as Needed**

vi.mock('@components/atoms', () => ({
	TextInput: ({
		label,
		name,
		value,
		handleChange,
		handleBlur,
		errors,
		type = 'text',
		placeholder = '',
		checked = false,
		...props
	}: any) => (
		<div data-testid={`textinput-${label}`}>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				checked={type === 'checkbox' ? checked : undefined}
				{...props}
			/>
			{errors && <p>{errors}</p>}
		</div>
	),
	SelectInput: ({
		label,
		name,
		value,
		handleChange,
		errors,
		children,
		...props
	}: any) => (
		<div data-testid={`selectinput-${label}`}>
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				{...props}
			>
				{children}
			</select>
			{errors && <p>{errors}</p>}
		</div>
	)
}))

vi.mock('@components/molecules/LocationSelector', () => ({
	LocationSelector: ({ name }: any) => (
		<div data-testid={`locationselector-${name}`}>LocationSelector</div>
	)
}))

vi.mock('./ProjectAccManagersSelector', () => ({
	ProjectAccManagersSelector: ({ handleChange }: any) => (
		<div data-testid="projectaccmanagersselector">
			ProjectAccManagersSelector
		</div>
	)
}))

vi.mock('./ProjectCompanySelector', () => ({
	ProjectCompanySelector: ({ handleChange }: any) => (
		<div data-testid="projectcompanyselector">ProjectCompanySelector</div>
	)
}))

vi.mock('./ProjectClientSelector', () => ({
	ProjectClientSelector: ({ handleChange }: any) => (
		<div data-testid="projectclientselector">ProjectClientSelector</div>
	)
}))

vi.mock('./ProjectStatusSelector', () => ({
	ProjectStatusSelector: ({ options, status, handleChange }: any) => (
		<div data-testid="selectinput-Project Status">
			<label htmlFor="status">Project Status</label>
			<select name="status" value={status} onChange={handleChange}>
				{options.map((option: string) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	)
}))

vi.mock('./ProjectLanguageSelector', () => ({
	ProjectLanguageSelector: ({
		languageVendorDescriptions,
		handleChange
	}: any) => (
		<div data-testid="selectinput-Language Vendor Descriptions">
			<label htmlFor="languageVendorDescriptions">
				Language Vendor Descriptions
			</label>
			<select
				name="languageVendorDescriptions"
				value={languageVendorDescriptions}
				onChange={handleChange}
			>
				<option value="">Select a language</option>
				<option value="EN">English</option>
				<option value="ES">Spanish</option>
				{/* ...other languages */}
			</select>
		</div>
	)
}))

vi.mock('./helperFunctionProject', () => ({
	updateScheduleDays: vi.fn().mockReturnValue(['2025-01-01', '2025-01-10']),
	createScheduleDays: vi.fn().mockReturnValue(['2025-01-01', '2025-01-10'])
}))

// **Import the Component After Mocking Dependencies**

import { ProjectFormFields } from './ProjectFormFields'

// **Define Mock Functions**

const mockDispatch = vi.fn()
const mockSetForceRefresh = vi.fn()
const mockSetCurrentProject = vi.fn()
const mockHandleProjectInputChange = vi.fn()
const mockHandleProjectBlur = vi.fn()
const mockHandleScheduleDays = vi.fn()

// **Define a Mock Project with _id to Indicate an Update**

import { IProject } from '@interfaces/project'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { useProject } from '@screens/projects/context/ProjectContext'
import { useCurrentProject } from 'src/hooks'
import { useAuth } from 'src/context/auth/AuthProvider'
import { createScheduleDays, updateScheduleDays } from './helperFunctionProject'

const mockProject: IProject = {
	...defaultProject,
	_id: 'proj-001', // Indicates an existing project
	arrivalDay: '2025-01-01',
	departureDay: '2025-01-10',
	budget: 'budget', // Assuming 'budget' is a valid type based on your component
	requiresCashFlowVerification: true
}

describe('ProjectFormFields', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		;(useProject as Mock).mockReturnValue({
			state: {
				projects: [],
				imagesModal: false,
				update: false
			},
			dispatch: mockDispatch,
			handleChange: mockHandleProjectInputChange,
			handleBlur: mockHandleProjectBlur,
			errors: {},
			setForceRefresh: mockSetForceRefresh,
			isLoading: false
		})
		;(useCurrentProject as Mock).mockReturnValue({
			currentProject: mockProject,
			setCurrentProject: mockSetCurrentProject,
			handleProjectInputChange: mockHandleProjectInputChange,
			handleProjectBlur: mockHandleProjectBlur,
			handleScheduleDays: mockHandleScheduleDays
		})
		;(useAuth as Mock).mockReturnValue({
			auth: { role: 'admin' },
			setAuth: vi.fn(),
			loading: false
		})
		;(updateScheduleDays as Mock).mockReturnValue(['2025-01-01', '2025-01-10'])
		;(createScheduleDays as Mock).mockReturnValue(['2025-01-01', '2025-01-10'])
	})

	it('renders all text input fields correctly', () => {
		render(<ProjectFormFields />)
		expect(screen.getByTestId('textinput-Project Code')).toBeInTheDocument()
		expect(screen.getByTestId('textinput-Nr.Participants')).toBeInTheDocument()
		expect(
			screen.getByTestId('textinput-Estimated Turnover')
		).toBeInTheDocument()
		expect(screen.getByTestId('textinput-Group Name')).toBeInTheDocument()
	})

	it('renders all date input fields correctly', () => {
		render(<ProjectFormFields />)
		expect(screen.getByTestId('textinput-Arrival Date')).toBeInTheDocument()
		expect(screen.getByTestId('textinput-Departure Date')).toBeInTheDocument()
	})

	it('renders LocationSelector correctly', () => {
		render(<ProjectFormFields />)
		expect(
			screen.getByTestId('locationselector-groupLocation')
		).toBeInTheDocument()
	})

	it('renders ProjectAccManagersSelector correctly', () => {
		render(<ProjectFormFields />)
		expect(screen.getByTestId('projectaccmanagersselector')).toBeInTheDocument()
	})

	it('renders ProjectCompanySelector correctly', () => {
		render(<ProjectFormFields />)
		expect(screen.getByTestId('projectcompanyselector')).toBeInTheDocument()
	})

	it('renders ProjectClientSelector when a company is selected', () => {
		;(useCurrentProject as Mock).mockReturnValueOnce({
			currentProject: {
				...mockProject,
				clientCompany: [{ _id: 'comp-001', name: 'Acme Inc.' }]
			},
			setCurrentProject: mockSetCurrentProject,
			handleProjectInputChange: mockHandleProjectInputChange,
			handleProjectBlur: mockHandleProjectBlur,
			handleScheduleDays: mockHandleScheduleDays
		})

		render(<ProjectFormFields />)
		expect(screen.getByTestId('projectclientselector')).toBeInTheDocument()
	})

	it('does not render ProjectClientSelector when no company is selected', () => {
		;(useCurrentProject as Mock).mockReturnValueOnce({
			currentProject: { ...mockProject, clientCompany: [] },
			setCurrentProject: mockSetCurrentProject,
			handleProjectInputChange: mockHandleProjectInputChange,
			handleProjectBlur: mockHandleProjectBlur,
			handleScheduleDays: mockHandleScheduleDays
		})

		render(<ProjectFormFields />)
		expect(
			screen.queryByTestId('projectclientselector')
		).not.toBeInTheDocument()
	})

	it('renders BooleanSelectInput for admin users', () => {
		render(<ProjectFormFields />)
		expect(
			screen.getByTestId('booleanselectinput-Project Type')
		).toBeInTheDocument()
	})

	it('does not render BooleanSelectInput for non-admin users', () => {
		;(useAuth as Mock).mockReturnValueOnce({
			auth: { role: 'user' },
			setAuth: vi.fn(),
			loading: false
		})

		render(<ProjectFormFields />)
		expect(
			screen.queryByTestId('booleanselectinput-Project Type')
		).not.toBeInTheDocument()
	})

	it('renders ProjectStatusSelector correctly', () => {
		render(<ProjectFormFields />)
		expect(screen.getByTestId('selectinput-Project Status')).toBeInTheDocument()
	})

	it('renders ProjectLanguageSelector correctly', () => {
		render(<ProjectFormFields />)
		expect(
			screen.getByTestId('selectinput-Language Vendor Descriptions')
		).toBeInTheDocument()
	})

	it('calls handleChange on input change', () => {
		render(<ProjectFormFields />)
		const projectCodeInput = screen
			.getByTestId('textinput-Project Code')
			.querySelector('input')
		expect(projectCodeInput).toBeInTheDocument()

		fireEvent.change(projectCodeInput!, {
			target: { name: 'code', value: 'NEWCODE123' }
		})
		expect(mockHandleProjectInputChange).toHaveBeenCalled()
	})

	it('calls handleBlur on input blur', () => {
		render(<ProjectFormFields />)
		const projectCodeInput = screen
			.getByTestId('textinput-Project Code')
			.querySelector('input')
		expect(projectCodeInput).toBeInTheDocument()

		fireEvent.blur(projectCodeInput!, {
			target: { name: 'code', value: 'NEWCODE123' }
		})
		expect(mockHandleProjectBlur).toHaveBeenCalled()
	})

	describe('useEffect Side Effects', () => {
		it('calls updateScheduleDays when updating project and dates change', async () => {
			render(<ProjectFormFields />)
			await waitFor(() => {
				expect(updateScheduleDays).toHaveBeenCalledWith(mockProject)
			})
			expect(mockHandleScheduleDays).toHaveBeenCalledWith([
				'2025-01-01',
				'2025-01-10'
			])
		})

		it('calls createScheduleDays when creating a new project and dates change', async () => {
			// Define a new mock project without _id to simulate a new project
			const newMockProject: IProject = {
				...mockProject,
				_id: undefined
			}

			;(useCurrentProject as Mock).mockReturnValueOnce({
				currentProject: newMockProject,
				setCurrentProject: mockSetCurrentProject,
				handleProjectInputChange: mockHandleProjectInputChange,
				handleProjectBlur: mockHandleProjectBlur,
				handleScheduleDays: mockHandleScheduleDays
			})

			render(<ProjectFormFields />)
			await waitFor(() => {
				expect(createScheduleDays).toHaveBeenCalledWith(newMockProject)
			})
			expect(mockHandleScheduleDays).toHaveBeenCalledWith([
				'2025-01-01',
				'2025-01-10'
			])
		})
	})

	describe('Error Handling', () => {
		it('displays error messages when errors are present', () => {
			;(useProject as Mock).mockReturnValueOnce({
				state: {
					projects: [],
					imagesModal: false,
					update: false
				},
				dispatch: mockDispatch,
				handleChange: mockHandleProjectInputChange,
				handleBlur: mockHandleProjectBlur,
				errors: {
					code: 'Project code is required',
					nrPax: 'Number of participants must be greater than 0'
				},
				setForceRefresh: mockSetForceRefresh,
				isLoading: false
			})

			render(<ProjectFormFields />)
			expect(screen.getByText('Project code is required')).toBeInTheDocument()
			expect(
				screen.getByText('Number of participants must be greater than 0')
			).toBeInTheDocument()
		})
	})
})
