import { ProjectFormFields } from './ProjectFormFields'

export const ProjectMasterForm = () => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('submitting form')
	}

	return (
		<form className="space-y-2" onSubmit={handleSubmit}>
			<ProjectFormFields />
		</form>
	)
}
