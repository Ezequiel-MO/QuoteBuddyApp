import styles from './HotelPrices.module.css'
export const AddHotelPricesToProject = ({ handleChange }) => {
	return (
		<fieldset className={styles.container}>
			<div className={`${styles.inputWrapper} w-[155px]`}>
				<label htmlFor="DUInr" className={styles.inputLabel}>
					Number of DUIs
				</label>
				<input
					name="DUInr"
					onChange={handleChange}
					type="number"
					min="0"
					step=".01"
					className={styles.inputField}
				/>
			</div>
			<div className={`${styles.inputWrapper} w-[170px]`}>
				<label htmlFor="DUIprice" className={styles.inputLabel}>
					DUI Price
				</label>
				<input
					name="DUIprice"
					onChange={handleChange}
					type="number"
					min="0"
					step=".01"
					className={styles.inputField}
				/>
			</div>
			<div className={`${styles.inputWrapper} w-[155px]`}>
				<label htmlFor="DoubleRoomNr" className={styles.inputLabel}>
					Number of Double Rooms
				</label>
				<input
					name="DoubleRoomNr"
					onChange={handleChange}
					type="number"
					min="0"
					step=".01"
					className={styles.inputField}
				/>
			</div>

			<div className={`${styles.inputWrapper} w-[180px]`}>
				<label htmlFor="DoubleRoomPrice" className={styles.inputLabel}>
					Rate per Double Room
				</label>
				<input
					name="DoubleRoomPrice"
					onChange={handleChange}
					type="number"
					min="0"
					step=".01"
					className={styles.inputField}
				/>
			</div>
			<div className={`${styles.inputWrapper} w-[180px]`}>
				<label htmlFor="breakfast" className={styles.inputLabel}>
					Breakfast
				</label>
				<input
					label="Breakfast"
					name="breakfast"
					onChange={handleChange}
					type="number"
					min="0"
					step=".01"
					className={styles.inputField}
				/>
			</div>
			<div className={`${styles.inputWrapper} w-[180px]`}>
				<label htmlFor="DailyTax" className={styles.inputLabel}>
					City Tax
				</label>
				<input
					name="DailyTax"
					type="number"
					min="0"
					step=".01"
					onChange={handleChange}
					className={styles.inputField}
				/>
			</div>
		</fieldset>
	)
}
