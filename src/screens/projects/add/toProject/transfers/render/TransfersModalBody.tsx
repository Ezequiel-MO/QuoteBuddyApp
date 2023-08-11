import { ServiceSection } from './ServiceSection'
import { TransferSection } from './TransferSection'
import { useTransfers } from './context'

export const TransfersModalBody = () => {
	const { selectedSection } = useTransfers()

	if (!selectedSection) return null

	return (
		<>
			<TransferSection />
			<ServiceSection />
		</>
	)
}
