import { FC } from 'react'
import { filterStyles } from '../../../constants'

interface Props {
	typeOfAssistance: 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
	setTypeOfAssistance: React.Dispatch<
		React.SetStateAction<'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'>
	>
}

export const TypeOfTransfersAssistanceFilter: FC<Props> = ({
	typeOfAssistance,
	setTypeOfAssistance
}) => {
	return (
		<div className={filterStyles['container']}>
			<div className={filterStyles['innerContainer']}>
				<select
					id="typeOfTransferAssistance"
					className={filterStyles['select']}
					value={typeOfAssistance}
					onChange={(e) =>
						setTypeOfAssistance(
							e.target.value as 'meetGreet' | 'hostessOnBoard' | 'guideOnBoard'
						)
					}
				>
					<option value="none">
						--- Filter by type of transfer assistance(All) ---
					</option>
					<option value="meetGreet">Meet and Greet at the airport</option>
					<option value="hostessOnBoard">Assistance On Board Vehicle</option>
					<option value="guideOnBoard">Airport Transfer with guide</option>
				</select>
			</div>
		</div>
	)
}
