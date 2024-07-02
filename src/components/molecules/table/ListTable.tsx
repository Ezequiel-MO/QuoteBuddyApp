import React from 'react'
import { Spinner } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { useCurrentProject } from 'src/hooks'
import { HeaderItems } from 'src/constants'

interface ListTableProps<T> {
	items: T[]
	headers: keyof HeaderItems
	ListItemComponent: React.FC<{ item: T; canBeAddedToProject: boolean }>
	isLoading: boolean
}

export const ListTable = <T,>({
	items,
	headers,
	ListItemComponent,
	isLoading
}: ListTableProps<T>) => {
	const { currentProject } = useCurrentProject()

	if (isLoading) {
		return <Spinner />
	}

	const canBeAddedToProject = currentProject?._id !== undefined

	return (
		<table className={listStyles.table}>
			<TableHeaders headers={headers} />
			{Array.isArray(items) &&
				items?.map((item: T) => (
					<ListItemComponent
						key={(item as any)._id}
						item={item}
						canBeAddedToProject={canBeAddedToProject}
					/>
				))}
		</table>
	)
}
