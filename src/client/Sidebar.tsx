import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'

const Sidebar = () => {
	/* const stickyClass = isSticky ? 'sticky top-10' : '' */
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, budget, hotels, multiDestination, hideDates } =
		currentProject
	return (
		<div className="sticky top-24 h-full w-64 bg-slate-400 dark:bg-slate-600 text-white-0 my-5 ml-2 p-5 rounded-lg">
			<p>Sidebar Content</p>
		</div>
	)
}

export default Sidebar
