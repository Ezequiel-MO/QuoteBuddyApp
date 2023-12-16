import { useEffect, useState, ChangeEvent } from "react"
import { filterStyles } from "src/constants"
import { useTransfers } from '../../../../add/toProject/transfers/render/context'



export const DaySegmentsSelect = () => {
    const { starts, setStarts, ends, setEnds } = useTransfers()

    const daySegments = ["morning", "afternoon", "night"]
    const [daySegmentsEnd, setDaySegmentsEnd] = useState(daySegments)

    useEffect(() => {
        switch (starts) {
            case "morning":
                setDaySegmentsEnd(["morning", "afternoon", "night"])
                break
            case "afternoon":
                setDaySegmentsEnd(["afternoon", "night"])
                if(ends === "morning"){
                    setEnds("")
                }
                break
            case "night":
                setDaySegmentsEnd(["night"])
                if(ends === "morning" || ends === "afternoon"){
                    setEnds("")
                }
                break
            default:
                setDaySegmentsEnd([])
                setEnds("")
        }
    }, [starts])
    

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target
        if (name === "stars") {
            setStarts(value)
        }
        if (name === "ends") {
            setEnds(value)
        }
    }


    return (
        <>
            <div className={filterStyles['container']}>
                <select
                    className={filterStyles.select}
                    value={starts}
                    onChange={handleChange}
                    name="stars"
                >
                    <option value="">--- SERVICE STARTS ---</option>
                    {
                        daySegments.map((el, index) => (
                            <option value={el} key={index}>
                                {el} start
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className={filterStyles['container']}>
                <select
                    className={filterStyles.select}
                    value={ends}
                    onChange={handleChange}
                    name="ends"
                    disabled={!starts}
                >
                    <option value="">--- SERVICE ENDS ---</option>
                    {
                        daySegmentsEnd.map((el, index) => (
                            <option value={el} key={index}>
                                {el} end
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}