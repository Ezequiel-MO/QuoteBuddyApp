export const ProjectInfo = ({ code }) => (
	<div className="flex flex-col bg-transparent w-32 m-1 py-2 px-4 text-orange-50 rounded-xl items-center justify-center">
		<p>Active Project</p>
		<h2 className="dark:text-white-0">{code}</h2>
	</div>
)
