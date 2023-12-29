import { useState, useEffect } from 'react'
import { IProject } from '@interfaces/project'

const useProjectFilter = (projects: IProject[] | null, searchItem: string) => {
	const [filteredProjects, setFilteredProjects] = useState<IProject[]>([])

	useEffect(() => {
		if (searchItem === '') {
			setFilteredProjects(projects ?? [])
			return
		}

		const result = projects?.filter((data) =>
			['code', 'groupName', 'status', 'groupLocation'].some((key) =>
				data[key as keyof IProject]
					?.toString()
					.toLowerCase()
					.includes(searchItem.toLowerCase())
			)
		)

		setFilteredProjects(result ?? [])
	}, [projects, searchItem])

	return filteredProjects
}

export default useProjectFilter
