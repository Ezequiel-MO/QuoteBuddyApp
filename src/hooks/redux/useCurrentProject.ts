import { useSelector } from 'react-redux'
import { selectCurrentProject } from '../../redux/features/currentProject/CurrentProjectSlice'
import {
	useDragnDropActions,
	useEventActions,
	useGiftActions,
	useHotelActions,
	useItineraryActions,
	useMeetingActions,
	useProjectActions,
	useRestaurantActions,
	useTransferActions
} from 'src/redux/features/currentProject/actions'

export const useCurrentProject = () => {
	const currentProject = useSelector(selectCurrentProject)
	const projectActions = useProjectActions()
	const hotelActions = useHotelActions()
	const eventActions = useEventActions()
	const transferActions = useTransferActions()
	const dragndropActions = useDragnDropActions()
	const meetingActions = useMeetingActions()
	const itineraryActions = useItineraryActions()
	const restaurantActions = useRestaurantActions()
	const giftActions = useGiftActions()

	return {
		currentProject,
		...projectActions,
		...hotelActions,
		...eventActions,
		...transferActions,
		...dragndropActions,
		...meetingActions,
		...itineraryActions,
		...restaurantActions,
		...giftActions
	}
}
