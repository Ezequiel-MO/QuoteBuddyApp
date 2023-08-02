
export const InputMeetingForm = ({
    label = "",
    name,
    data,
    handleChange
}) => {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <input
                className=" min-w-[180px] w-full px-2 py-1 text-base text-gray-700 border border-solid border-gray-300 rounded  focus:text-gray-700 focus:outline-none"
                type="number"
                name={name}
                value={data}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}