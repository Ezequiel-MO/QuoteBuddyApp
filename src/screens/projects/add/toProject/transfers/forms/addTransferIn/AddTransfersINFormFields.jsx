import { useNavigate, useLocation } from 'react-router-dom'
import {
	CityFilter,
	TransferVendorFilter,
	VehicleSizeFilter
} from '../../../../../../../ui'
import { NumberInput } from '../../../../../../../components/atoms'
import { FreelancerButton } from '../shared/FreeLancerButton'
import { FreelancerDisplay } from '../shared/FreeLancerDisplay'
import styles from '../../transfer.module.css'

export const AddTransfersINFormFields = (props) => {
	const {
		city,
		setCity,
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		data,
		handleChange,
		handleClick,
		meetGreetOrDispatch,
		assistance,
		state,
		removeMeetGreetOrDispatch,
		removeAssistance
	} = props
	const navigate = useNavigate()
	const url = useLocation().pathname

	return (
		<div className="flex flex-col items-start">
			<CityFilter setCity={setCity} city={city} />
			<TransferVendorFilter
				setCompany={setCompany}
				company={company}
				city={city}
			/>
			<VehicleSizeFilter
				company={company}
				city={city}
				vehicleCapacity={vehicleCapacity}
				setVehicleCapacity={setVehicleCapacity}
			/>
			<NumberInput
				name="nrVehicles"
				value={data.nrVehicles}
				handleChange={handleChange}
			/>
			<NumberInput
				label="Number of Meet&Greet (if any)"
				name="meetGreet"
				value={data.meetGreet}
				handleChange={handleChange}
			/>
			<FreelancerButton
				navigate={navigate}
				url={url}
				state={state}
				serviceType="meetOrDispatch"
				isAvailable={meetGreetOrDispatch.length < 1}
			/>
			<NumberInput
				label="Number of Transfer Assist"
				name="assistance"
				value={data.assistance}
				handleChange={handleChange}
			/>
			<FreelancerButton
				navigate={navigate}
				url={url}
				state={state}
				serviceType="assistance"
				isAvailable={assistance.length < 1}
			/>
			<FreelancerDisplay
				freelancerData={meetGreetOrDispatch}
				serviceType="meetGreet"
				removeAction={removeMeetGreetOrDispatch}
			/>
			<FreelancerDisplay
				freelancerData={assistance}
				serviceType="assistance"
				removeAction={removeAssistance}
			/>
			<button
				onClick={handleClick}
				type="button"
				className={styles.buttonAddTransfer}
			>
				Show Table
			</button>
			<input
				className={styles.buttonSubmit}
				type="submit"
				value="Submit choices"
			/>
		</div>
	)
}
