import { NumberInput } from '../../../../../../../ui'

export const MeetingFBInputs = ({ handleMeetingChange, meetingValues }) => {
	return (
		<div className="grid grid-cols-2 gap-x-4">
			<div>
				<NumberInput
					label="Coffee Break Units"
					name="coffeeBreakUnits"
					placeholder="Ex. 45"
					handleChange={handleMeetingChange}
					value={meetingValues.coffeeBreakUnits}
					type="number"
				/>
				<NumberInput
					label="Lunch units"
					name="workingLunchUnits"
					placeholder="Ex. 40"
					handleChange={handleMeetingChange}
					value={meetingValues.workingLunchUnits}
					type="number"
				/>
				<NumberInput
					label="Dinner units"
					name="hotelDinnerUnits"
					placeholder="Ex. 40"
					handleChange={handleMeetingChange}
					value={meetingValues.hotelDinnerUnits}
					type="number"
				/>
			</div>
			<div>
				<NumberInput
					label="Coffee Break Price"
					name="coffeeBreakPrice"
					placeholder="Ex. 40"
					handleChange={handleMeetingChange}
					value={meetingValues.coffeeBreakPrice}
					type="number"
				/>
				<NumberInput
					label="Lunch price"
					name="workingLunchPrice"
					placeholder="Ex. 40"
					handleChange={handleMeetingChange}
					value={meetingValues.workingLunchPrice}
					type="number"
				/>
				<NumberInput
					label="Dinner price"
					name="hotelDinnerPrice"
					placeholder="Ex. 82"
					handleChange={handleMeetingChange}
					value={meetingValues.hotelDinnerPrice}
					type="number"
				/>
			</div>
		</div>
	)
}
