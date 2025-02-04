import { Spinner } from '@components/atoms'
import { useCurrentProject, useGetLocation } from '../../hooks'
import { ILocation } from '../../interfaces/location'
import { DestinationHeader } from './DestinationHeader'
import { DestinationDescription } from './DestinationDescription'
import { DestinationFacts } from './DestinationFacts'
import { DestinationTable } from './DestinationTable'
import { DestinationGallery } from './DestinationGallery'
import { IProject } from '@interfaces/project'

export const Destination = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation } = currentProject || {}
	const { selectedOption, loading } = useGetLocation(groupLocation)

	if (loading || !selectedOption || !selectedOption?.imageContentUrl) {
		return loading ? <Spinner /> : null
	}

	return (
		<div className="container mx-auto px-4">
			<DestinationHeader groupLocation={groupLocation} />
			<DestinationDescription locationObj={selectedOption as ILocation} />
			<DestinationFacts locationObj={selectedOption as ILocation} />
			<DestinationTable locationObj={selectedOption as ILocation} />
			<DestinationGallery images={selectedOption.imageContentUrl} />
		</div>
	)
}
