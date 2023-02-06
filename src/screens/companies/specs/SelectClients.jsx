
const SelectClients = ({ handleChange, clients, employees, data , handleDelete }) => {

    return (
        <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
            <div className='flex items-center gap-2'>
                <select
                    id='country'
                    className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
                    onChange={event => handleChange(event)}
                >
                    <option value='none'>
                        Select Client/s
                    </option>
                    {clients?.map((el) => {
                        return (
                            <option key={el._id}
                             value={`${el._id} ${el.firstName} ${el.familyName}`}
                            >
                                {`${el.firstName} ${el.familyName}`}
                            </option>
                        )
                    })}
                </select>
            </div>
            <br />
            {
                data.employees.length > 0 &&
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    position: "absolute",
                    marginLeft: "-0.1%",
                    marginTop: "300px",
                    // marginBottom:" -400px",
                    padding: "2%"
                }}
                >
                    <h1 style={{ textAlign: "center" }}>
                        Selected clients
                    </h1>
                    {data.employees.map(element => {
                        return (
                            <li key={element} style={{ color: "black", marginLeft: "50px" }} >client: {element}{" "}
                                <button style={{ marginLeft: "10px", color: "red" }} onClick={() => handleDelete(element)}>
                                    X
                                </button>
                            </li>
                        )
                    })}
                </div>
            }
        </div>
    )
}


export default SelectClients