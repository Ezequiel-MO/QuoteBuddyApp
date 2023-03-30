import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import {
    CityFilter,
    TransferVendorFilter,
    VehicleSizeFilter
} from '../../../../../../../ui'
import styles from "../../transfer.module.css"

export const AddTransfersOutFormFields = ({
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
}) => {
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
            <div className="flex justify-between items-center w-60">
                <label className="text-xl text-gray-100" htmlFor="nrVehicles">
                    Number of Vehicles{' '}
                </label>
                <input
                    type="number"
                    name="nrVehicles"
                    className={styles.input}
                    value={data.nrVehicles}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            {
                meetGreetOrDispatch.length < 1 ?
                    <button
                        className={styles.buttonFreelancer}
                        onClick={() => navigate("/app/freelancer", { state: { url, type: "meetOrDispatch", state } })}
                    >
                        Aggregate Freelancer
                    </button>
                    :
                    <div className="flex justify-between items-center w-60 mt-2">
                        <label className="text-xl text-rose-500-100">
                            <p style={{ fontSize: "18px" }}>
                                {`FreeLancer: ${meetGreetOrDispatch[0]?.familyName}, 
                                Price: ${meetGreetOrDispatch[0]?.fullDayRate}€  `}
                                <button
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => removeMeetGreetOrDispatch({ id: meetGreetOrDispatch[0]._id })}
                                >
                                    <Icon icon='fluent:delete-16-regular' color='#ea5933' />
                                </button>
                            </p>
                        </label>
                    </div>
            }
            <div className="flex justify-between items-center w-60 mt-2">
                <label className="text-xl text-gray-100" htmlFor="groupDispatch">
                    <p style={{ fontSize: "19px" }}>Number of Meet&Greet (if any)</p>
                </label>
                <input
                    type="number"
                    name="groupDispatch"
                    className={styles.input}
                    value={data.groupDispatch}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            {
                assistance.length < 1 ?
                    <button
                        className={styles.buttonFreelancer}
                        style={{ fontSize: "15px" }}
                        onClick={() => navigate("/app/freelancer", { state: { url, type: "assistance", state } })}
                    >
                        Aggregate Freelancer Assist
                    </button>
                    :
                    <div className="flex justify-between items-center w-60 mt-2">
                        <label className="text-xl text-rose-500-100">
                            <p style={{ fontSize: "18px" }}>
                                {`FreeLancer: ${assistance[0]?.familyName}, 
                                Price: ${assistance[0]?.halfDayRate}€  `}
                                <button style={{ marginLeft: "10px" }}
                                    onClick={()=>removeAssistance({id: assistance[0]._id }) } 
                                >
                                    <Icon icon='fluent:delete-16-regular' color='#ea5933' />
                                </button>
                            </p>
                        </label>
                    </div>
            }
            <div className="flex justify-between items-center w-60 mt-2">
                <label className="text-xl text-gray-100" htmlFor="assistance">
                    Number of Transfer Assist
                </label>
                <input
                    type="number"
                    name="assistance"
                    className={styles.input}
                    value={data.assistance}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <button
                onClick={handleClick}
                type="button"
                className={styles.buttonAddTransfer}
            >
                Add type of transfer +{' '}
            </button>
            <input
                className={styles.buttonSubmit}
                type="submit"
                value="Submit choices"
            />
        </div>
    )
}