import styles from "../FreeLancer.module.css"

export const SelectTypeFreelancer = ({ typeFreeLancer, type,setType ,handleChange }) => {
    return (
        <div>
            <select
                name="type" 
                id="type" 
                className={styles.selectType}
                onChange={event => handleChange(event)}
            >
                <option value="">Select a type the freelancer </option>
                {typeFreeLancer.map((el, index) => {
                    return (
                        <option   key={index} value={el} >
                            {el}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
