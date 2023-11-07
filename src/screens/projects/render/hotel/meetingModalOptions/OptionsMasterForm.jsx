
export const OptionsMasterForm = ({ value, setValue }) => {

    const handleOptionChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className=" block p-6 w-3/4 rounded-lg border" style={{ marginLeft: "10%", marginTop: "20px" }}>
            <input
                type="radio"
                className=" h-4 w-4  mr-2"
                name="option"
                value="removeHotel"
                onChange={handleOptionChange}
                checked={value === "removeHotel"}
            />
            <label className="text-white-0 text-lg">
                Remove this Hotel from the Project, including Meeting information
            </label>
            <br />
            <br />
            <input
                type="radio"
                className=" h-4 w-4  mr-2"
                name="option"
                value="removeMeetings"
                onChange={handleOptionChange}
                checked={value === "removeMeetings"}
            />
            <label htmlFor="" className="text-white-0 text-lg">
                Remove the Meeting information, but keep the hotel in the project
            </label>
        </div>
    )
}