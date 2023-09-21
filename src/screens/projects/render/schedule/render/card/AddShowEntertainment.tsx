import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../../../components/atoms"

interface AddShowEntertainmentProps {
    typeMeal: string
    dayIndex: number
    idRestaurant:string | undefined
}

const classAddShow = "text-base inline-block text-white-0 hover:text-orange-500 hover:scale-150 hover:transition hover:duration-150 hover:ease-in-out"



export const AddShowEntertainment: FC<AddShowEntertainmentProps> = ({ typeMeal, dayIndex , idRestaurant }) => {
    const navigate = useNavigate()
    const isRestaurant = ["lunch", "dinner"]

    if (!isRestaurant.includes(typeMeal)) return null

    return (
        <>
            <Button
                icon=""
                type="button"
                newClass={classAddShow}
                handleClick={() =>
                    navigate("/app/entertainment", {
                        state: {
                            typeMeal,
                            dayIndex,
                            idRestaurant
                        }
                    })
                }
            >
                <abbr title="adds a show or entertainment to the restaurant">
                    Add Show/Entertainment
                </abbr>
            </Button>
        </>
    )
}