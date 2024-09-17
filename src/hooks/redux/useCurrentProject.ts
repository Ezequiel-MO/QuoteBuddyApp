import { useSelector } from 'react-redux'
import {
	selectCurrentProject,
	selectErrors,
	selectIsModalOpen
} from '../../redux/features/currentProject/CurrentProjectSelectors'
import {
	useDragnDropActions,
	useEventActions,
	useGiftActions,
	useHotelActions,
	useItineraryActions,
	useMeetingActions,
	useModalActions,
	useProjectActions,
	useRestaurantActions,
	useTransferActions
} from 'src/redux/features/currentProject/actions'

export const useCurrentProject = () => {
	const currentProject = useSelector(selectCurrentProject)
	const errors = useSelector(selectErrors)
	const isModalOpen = useSelector(selectIsModalOpen)
	const projectActions = useProjectActions()
	const hotelActions = useHotelActions()
	const eventActions = useEventActions()
	const transferActions = useTransferActions()
	const dragndropActions = useDragnDropActions()
	const meetingActions = useMeetingActions()
	const itineraryActions = useItineraryActions()
	const restaurantActions = useRestaurantActions()
	const giftActions = useGiftActions()
	const modalActions = useModalActions()

	return {
		currentProject,
		errors,
		isModalOpen,
		...projectActions,
		...hotelActions,
		...eventActions,
		...transferActions,
		...dragndropActions,
		...meetingActions,
		...itineraryActions,
		...restaurantActions,
		...giftActions,
		...modalActions
	}
}
