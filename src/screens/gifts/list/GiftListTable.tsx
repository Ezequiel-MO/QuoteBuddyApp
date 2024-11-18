import React from 'react'
import { Spinner } from '../../../components/atoms'
import { useCurrentProject } from 'src/hooks'
import { IGift } from '@interfaces/gift'
import { GiftListItem } from './GiftListItem'

interface GiftListTableProps {
	items: IGift[]
	isLoading: boolean
	searchTerm?: string
}

export const GiftListTable: React.FC<GiftListTableProps> = ({
	items,
	isLoading,
	searchTerm
}) => {
	const { currentProject } = useCurrentProject()

	if (isLoading) {
		return <Spinner />
	}

	if (searchTerm && items.length === 0) {
		const document = 'Gift'
		return (
			<h1 className="text-center text-4xl mt-32">{`${document} not found`}</h1>
		)
	}

	const canBeAddedToProject = currentProject?._id !== undefined

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
			{items.map((gift) => (
				<GiftListItem
					key={gift._id}
					item={gift}
					canBeAddedToProject={canBeAddedToProject}
				/>
			))}
		</div>
	)
}
