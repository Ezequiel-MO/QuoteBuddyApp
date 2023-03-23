import { useState } from "react"
import styles from "../FreeLancer.module.css"
import { useGetLocations } from "../../../hooks/"

export const SelectLocation = ({ handleChange , city }) => {
    const { locations } = useGetLocations()
    const [search, setSearch] = useState("")

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredOptions = locations.filter(el =>
        el.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

    return (
        <div>
            <input
                className={styles.search}
                type="text"
                placeholder="search..."
                value={search}
                onChange={event => handleSearch(event)}
            />

            <select
                name="city"
                id="city"
                value={city}
                className={styles.selectLocation}
                onChange={event => handleChange(event)}
            >
                {
                    !search &&
                    <option value="">
                        Select a city
                    </option>
                }
                {
                    filteredOptions.length === 0 &&
                    <option value="">
                        no city exists
                    </option>
                }
                {filteredOptions.map(el => {
                    return (
                        <option value={el.name} key={el._id}
                            onClick={event => handleChange(event)}
                        >
                            {el.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}