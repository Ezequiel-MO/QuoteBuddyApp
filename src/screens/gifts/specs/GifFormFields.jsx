import styles from "../Gift.module.css"
import { TextInput } from "../../../ui/inputs/nativeInputs/"
import { FileUpload } from '../../../components/molecules'
import { ShowImagesButton } from '../../../components/atoms'

export const GiftFormFields = ({
    data,
    setData,
    handleChange,
    fileInput,
    update,
    setOpen
}) => {
    return (
        <fieldset className="grid grid-cols-2 gap-4">
            <legend>
                <h1 className="text-2xl mb-4">
                    General Gift Data
                </h1>
            </legend>
            <div className="form-group mb-6">
                <TextInput
                    name="name"
                    placeholder="name of the gift"
                    value={data.name}
                    handleChange={handleChange}
                />
                <label htmlFor="">Price</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={event => handleChange(event)}
                />
                <div className="col-span-1" style={{ marginTop: "30px" }}>
                    <FileUpload multiple={true} fileInput={fileInput} update={update} />
                </div>
                <input
                    type="submit"
                    className="cursor-pointer 
                    py-2 
                    px-10 
                    hover:bg-gray-600 
                    bg-green-50 
                    text-black-50 
                    hover:text-white-50 
                    font-bold
                    uppercase 
                    rounded-lg"
                    style={{position:"absolute", marginTop:"10px" }}
                    value={!update ?"Save new Gift" : "Edit Gift Form"}
                />
            </div>
        </fieldset>
    )
}