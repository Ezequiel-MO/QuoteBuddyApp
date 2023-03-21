import { NumberInput } from '../../../../../../../ui'

export const FullDayRateInputs = ({
	timing,
	handleMeetingChange,
	meetingValues
}) => {
	if (timing === 'Morning Meeting' || timing === 'Afternoon Meeting') {
		return null
	}
	const [FDRate, FDDDR] = meetingValues
	return (
		<>
			<NumberInput
				label="FD Rental"
				name="FDRate"
				placeholder="Ex. 1500"
				handleChange={handleMeetingChange}
				value={FDRate}
				type="number"
			/>
			<NumberInput
				label="FD Delegate.Rate"
				name="FDDDR"
				placeholder="Ex. 60"
				value={FDDDR}
				handleChange={handleMeetingChange}
				type="number"
			/>
		</>
	)
}
