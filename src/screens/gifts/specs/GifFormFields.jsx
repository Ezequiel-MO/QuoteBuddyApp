import styles from '../Gift.module.css'
import { FileUpload } from '../../../components/molecules'
import { SubmitInput, TextInput } from '../../../components/atoms'

export const GiftFormFields = ({ data, handleChange, fileInput, update }) => {
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
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
					step="any"
					onChange={(event) => handleChange(event)}
				/>
				<div className="col-span-1" style={{ marginTop: '30px' }}>
					<FileUpload multiple={true} fileInput={fileInput} update={update} />
				</div>
				<SubmitInput update={update} title="Gift" customStyles="absolute" />
			</div>
		</fieldset>
	)
}
