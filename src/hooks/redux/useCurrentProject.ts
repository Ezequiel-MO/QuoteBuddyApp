import {
	selectBudget,
	selectCurrentProject,
	selectErrors,
	selectIsModalOpen
} from '../../redux/features/currentProject/CurrentProjectSelectors'
import {
	useDragnDropActions,
	useEventActions,
	useGeneralActions,
	useGiftActions,
	useHotelActions,
	useItineraryActions,
	useMeetingActions,
	useModalActions,
	useProjectActions,
	useRestaurantActions,
	useTransferActions,
	useBudgetActions
} from 'src/redux/features/currentProject/actions'
import { useAppSelector } from './redux'

export const useCurrentProject = () => {
	const currentProject = useAppSelector(selectCurrentProject)
	const currentBudget = useAppSelector(selectBudget)
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
	const generalActions = useGeneralActions()
	const budgetActions = useBudgetActions()

	return {
		currentProject,
		currentBudget,
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
		...modalActions,
		...generalActions,
		...budgetActions
	}
}
