import { NumberInput } from '../../../../../../../ui'

export const HalfDayRateInputs = ({
	timing,
	handleMeetingChange,
	meetingValues
}) => {
	if ((timing !== 'Morning Meeting') & (timing !== 'Afternoon Meeting')) {
		return null
	}

	const [HDRate, HDDDR] = meetingValues
	return (
		<>
			<NumberInput
				label="HD Rental"
				name="HDRate"
				placeholder="Ex. 1500"
				handleChange={handleMeetingChange}
				value={HDRate}
				type="number"
			/>
			<NumberInput
				label="HD Delegate.Rate"
				name="HDDDR"
				placeholder="Ex. 60"
				value={HDDDR}
				handleChange={handleMeetingChange}
				type="number"
			/>
		</>
	)
}
