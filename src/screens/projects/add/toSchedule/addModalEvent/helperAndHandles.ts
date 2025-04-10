import { IService } from '@screens/projects/types/transfers'
import { ITransfer } from '../../../../../interfaces'

const couterAssistance = (services: IService[]) => {
	let assistanceCount = 0
	for (let i = 0; i < services.length; i++) {
		if (
			['hostessOnBoard', 'guideOnBoard'].includes(services[i].typeOfAssistance)
		) {
			assistanceCount++
		}
	}
	return assistanceCount
}

const isLastIteration = (index: number, length: number) => {
	return index === length - 1
}

export const transfersIncludedAssistance = (
	servicesEvent: IService[],
	transferEvent: ITransfer[]
) => {
	const assistanceCount = couterAssistance(servicesEvent)
	const updatedTransfers = transferEvent.map((transfer) => {
		let updatedTransfer = { ...transfer }
		servicesEvent.forEach((service, serviceIndex) => {
			const { freelancer, typeOfAssistance } = service
			const { halfDayRate } = freelancer
			if (['hostessOnBoard', 'guideOnBoard'].includes(typeOfAssistance)) {
				updatedTransfer.assistanceCost = halfDayRate
			}
			if (isLastIteration(serviceIndex, servicesEvent.length)) {
				if (assistanceCount > 0) {
					updatedTransfer.assistance = assistanceCount
				}
			}
		})
		return updatedTransfer
	})
	return updatedTransfers
}
