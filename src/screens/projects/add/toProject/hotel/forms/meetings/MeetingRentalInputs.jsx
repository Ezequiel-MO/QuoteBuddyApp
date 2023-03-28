import { NumberInput } from '../../../../../../../ui'
import { FileUpload } from './FileUpload'
import { FullDayRateInputs } from './FullDayInputs'
import { HalfDayRateInputs } from './HalfDayInputs'

export const MeetingRentalsInputs = ({
	handleMeetingChange,
	meetingValues,
	fileInput,
	timing
}) => {
	return (
		<div className="grid grid-cols-2 gap-x-4">
			<div>
				<NumberInput
					label="Room Capacity"
					name="roomCapacity"
					placeholder="Ex. 100"
					handleChange={handleMeetingChange}
					value={meetingValues.roomCapacity}
					type="number"
				/>
				<NumberInput
					label="Audiovisuals"
					name="aavvPackage"
					placeholder="Ex. 3000"
					handleChange={handleMeetingChange}
					value={meetingValues.aavvPackage}
					type="number"
				/>
				<FileUpload fileInput={fileInput} />
			</div>
			<div>
				<HalfDayRateInputs
					timing={timing}
					handleMeetingChange={handleMeetingChange}
					meetingValues={[meetingValues.HDRate, meetingValues.HDDDR]}
				/>
				<FullDayRateInputs
					timing={timing}
					handleMeetingChange={handleMeetingChange}
					meetingValues={[meetingValues.FDRate, meetingValues.FDDDR]}
				/>
			</div>
		</div>
	)
}
