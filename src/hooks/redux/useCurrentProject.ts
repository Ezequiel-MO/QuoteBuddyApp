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
import { useAppSelector } from './redux'
import {
	selectCurrentProject,
	selectErrors,
	selectIsModalOpen
} from 'src/redux/features/currentProject/slices/project/projectSelectors'

export const useCurrentProject = () => {
	const currentProject = useAppSelector(selectCurrentProject)
	const errors = useAppSelector(selectErrors)
	const isModalOpen = useAppSelector(selectIsModalOpen)
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
