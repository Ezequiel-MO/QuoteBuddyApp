import { IBudget } from '@interfaces/budget'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IHotel } from '@interfaces/hotel'
import { ITransfer } from '@interfaces/transfer'
import * as thunks from './thunks'
import {
	CLEAR_BUDGET,
	CLEAR_MEETINGS_BUDGET,
	UPDATE_MEETINGS_TOTAT_COST
} from '../../CurrentProjectSlice'
import {
	IProgramTransfersPayload,
	UpdateOvernightCostPayload,
	UpdateProgramActivitiesCostPayload,
	UpdateProgramMealsCostPayload,
	UpdateProgramMeetingsCostPayload,
	UpdateProgramShowsCostPayload
} from '../../types'

export const useBudgetActions = () => {
	const dispatch = useAppDispatch()

	const clearBudget = () => {
		dispatch(CLEAR_BUDGET())
	}
	const clearMeetingsBudget = () => {
		dispatch(CLEAR_MEETINGS_BUDGET())
	}
	const setBudget = (budget: Partial<IBudget>) =>
		dispatch(thunks.setBudgetThunk(budget))

	const setBudgetSelectedHotel = (hotel: IHotel) =>
		dispatch(thunks.setBudgetSelectedHotelThunk(hotel))

	const setBudgetSelectedHotelCost = (selectedHotel: IHotel, nights: number) =>
		dispatch(thunks.setBudgetSelectedHotelCostThunk(selectedHotel, nights))

	const updateBudgetTransfersInCost = (transfer_in: ITransfer[]) =>
		dispatch(thunks.updateBudgetTransfersInCostThunk(transfer_in))

	const updateBudgetTransfersOutCost = (transfer_out: ITransfer[]) =>
		dispatch(thunks.updateBudgetTransfersOutCostThunk(transfer_out))

	const updateBudgetProgramTransfersCost = (
		programTransfers: IProgramTransfersPayload
	) => dispatch(thunks.updateProgramTransfersCostThunk(programTransfers))

	const updateBudgetProgramMealsCost = (
		programMeals: UpdateProgramMealsCostPayload
	) => dispatch(thunks.updateProgramMealsCostThunk(programMeals))

	const updateBudgetProgramActivitiesCost = (
		payload: UpdateProgramActivitiesCostPayload
	) => {
		dispatch(thunks.updateProgramActivitiesCostThunk(payload))
	}

	const updateBudgetProgramMeetingsCost = (
		payload: UpdateProgramMeetingsCostPayload
	) => {
		dispatch(thunks.updateProgramMeetingsCostThunk(payload))
	}

	const updateBudgetProgramShowCost = (
		payload: UpdateProgramShowsCostPayload
	) => dispatch(thunks.updateProgramShowsCostThunk(payload))

	const updateBudgetOvernightCost = (payload: UpdateOvernightCostPayload) =>
		dispatch(thunks.updateOvernightCostThunk(payload))

	const updateBudgetMeetingsTotalCost = (payload: number) => {
		dispatch(UPDATE_MEETINGS_TOTAT_COST(payload))
	}

	return {
		setBudget,
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost,
		updateBudgetTransfersInCost,
		updateBudgetTransfersOutCost,
		updateBudgetProgramTransfersCost,
		updateBudgetProgramMealsCost,
		updateBudgetProgramActivitiesCost,
		updateBudgetProgramMeetingsCost,
		updateBudgetProgramShowCost,
		updateBudgetOvernightCost,
		clearBudget,
		updateBudgetMeetingsTotalCost,
		clearMeetingsBudget
	}
}
