import { useState, useEffect } from "react"

export const TableForm = ({ id, name, timeOfEvent, dayOfEvent, meetingValues, setMeetingValues }) => {
    const nameEvent = timeOfEvent + "-" + dayOfEvent

    const [valuesForm, setValuesForm] = useState({
        roomCapacity: '',
        // HDRate: '',
        HDDDR: '',
        // FDRate: '',
        // FDDDR: '',
        aavvPackage: '',
        coffeeBreakUnits: '',
        coffeeBreakPrice: '',
        workingLunchUnits: '',
        workingLunchPrice: '',
        hotelDinnerUnits: '',
        hotelDinnerPrice: ''
    })

    useEffect(() => {
        setMeetingValues({
            ...meetingValues,
            [nameEvent]: valuesForm
        })
    }, [valuesForm])


    const handleChangeForm = (e, nameEvent) => {
        setValuesForm({
            ...valuesForm,
            [e.target.name]: e.target.value,
        })
    }


    return (
        <tbody id={id} >
            <tr>
                <td className="border px-2 py-1">{name}</td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="roomCapacity"
                        value={valuesForm.roomCapacity}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="coffeeBreakUnits"
                        value={valuesForm.coffeeBreakUnits}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="coffeeBreakPrice"
                        value={valuesForm.coffeeBreakPrice}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="aavvPackage"
                        value={valuesForm.aavvPackage}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="HDDDR"
                        value={valuesForm.HDDDR}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="workingLunchUnits"
                        value={valuesForm.workingLunchUnits}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="workingLunchPrice"
                        value={valuesForm.workingLunchPrice}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="hotelDinnerUnits"
                        value={valuesForm.hotelDinnerUnits}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="hotelDinnerPrice"
                        value={valuesForm.hotelDinnerPrice}
                        onChange={(e) => handleChangeForm(e, nameEvent)}
                    />
                </td>
                {/* <td className="border px-2 py-1">
                    <input type="file" className="form-input mt-1 block w-full" />
                </td> */}
            </tr>
        </tbody>
    )
}