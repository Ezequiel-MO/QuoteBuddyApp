import { FC, useState } from 'react'
import { listStyles } from '@constants/styles/listStyles'
import { ILocation } from '@interfaces/location'
import { useLocation } from '../../context/LocationsContext'
import { Icon } from '@iconify/react'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import { formatDate } from 'src/helper/formatDate'
import { LocationDetailModal } from './modal/LocationDetailModal'

interface LocationListRestoreItemProps {
	item: ILocation
	canBeAddedToProject: boolean
}

export const LocationListRestoreItem: FC<LocationListRestoreItemProps> = ({
	item: location
}) => {
	const { state, dispatch } = useLocation()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (locationId: string) => {
		const updatedLocations = state.locations.filter(
			(el) => el._id !== locationId
		)
		await baseAPI.patch(`locations/isDeleted/true/${location._id}`)
		dispatch({ type: 'SET_LOCATIONS', payload: updatedLocations })
	}

	const handleDelete = async (locationId: string) => {
		const updatedLocations = state.locations.filter(
			(el) => el._id !== locationId
		)
		await baseAPI.delete(`locations/isDeleted/true/${location._id}`)
		dispatch({ type: 'SET_LOCATIONS', payload: updatedLocations })
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
			>
				<Icon
					icon="fluent:delete-arrow-back-16-regular"
					width={20}
					className="mr-1"
				/>
				{location.name}
			</td>
			<td className={listStyles.td}>{location.country}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{location?.deletedAt ? formatDate(location?.deletedAt) : ''}
			</td>
			<td className={`${listStyles.td}`}>
				<LocationDetailModal
					location={location}
					open={openModal}
					setOpen={setOpenModal}
				/>
				<MenuRestoreActions
					item={location}
					itemType="Location"
					onViewDetails={handleViewDetails}
					onRestore={(locationId) => handleRestore(locationId)}
					onDelete={(locationId) => handleDelete(locationId)}
					key={location._id}
				/>
			</td>
		</tr>
	)
}
