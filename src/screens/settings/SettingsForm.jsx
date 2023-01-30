import { Icon } from '@iconify/react'


const SettingForm = ({ data, setData, fileInput, handleSubmit }) => {

    const handleChange = (event) => {
        setData(({
            ...data,
            [event.target.name]: event.target.value
        }))
        // console.log(data)
    }

    const handleColor = (event) => {
        if (!data.colorPalette.includes(event.target.value)) {
            setData({
                ...data,
                colorPalette: [...data.colorPalette, event.target.value]
            })
        }
    }
    
    const handleDelete = (event) => {
        setData({
            ...data,
            colorPalette: data.colorPalette.filter(c => c !== event)
        })
    }


    return (
        <>
            <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
                <form onSubmit={event => handleSubmit(event, fileInput.current ?? [])}  >
                    <fieldset className="grid grid-cols-2 gap-4">
                        <legend>
                            <h1 className="text-2xl mb-4">
                                Setting
                            </h1>
                        </legend>
                        <div className="form-group mb-6">
                            <label htmlFor="">Name</label>
                            <input
                                className='w-full
                                px-2
                                py-1
                                text-base
                                text-gray-700
                                border border-solid border-gray-300
                                rounded
                                focus:text-gray-700 focus:outline-none'
                                type="text"
                                name='name'
                                value={data.name}
                                onChange={event => handleChange(event)}
                            />
                            {/* {errors.name &&
                                <p className='bg-red-500 font-bold text-white-50'  >{errors.name}</p>
                            } */}
                            <label htmlFor="">Color</label>
                            <input
                                className='w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none'
                                type="color"
                                placeholder='user given password'
                                name='colorPalette'
                                value={data.colorPalette[0]}
                                id={data.colorPalette[0]}
                                onChange={event => handleColor(event)}
                            />
                            <label htmlFor="">Font</label>
                            <textarea
                                className='w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none'
                                type="text"
                                name='fonts'
                                placeholder='example Font Family: Rockwell Extra Bold , Arial , ...'
                                value={data.fonts}
                                onChange={event => handleChange(event)}
                            />
                        </div>

                        <div className="flex align-center justify-start">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <Icon icon="akar-icons:cloud-upload" width="40" />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                placeholder='user given email'
                                name='imageContentUrl'
                                multiple={false}
                                ref={fileInput}
                            />
                        </div>

                        <input
                            type="submit"
                            className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                            value={'Save settings'}
                        />

                    </fieldset>
                </form>
                <br />
                <div style={{ backgroundColor: "white", borderRadius: "10px" }} >
                    {data.colorPalette.map(element => {  
                        return (
                            <li key={element} style={{ color: element, marginLeft: "50px" }} >Aggregate color: {element}{" "}
                                <button style={{ marginLeft: "10px", color: "red" }} onClick={() => handleDelete(element)}>
                                    X
                                </button>
                            </li>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SettingForm