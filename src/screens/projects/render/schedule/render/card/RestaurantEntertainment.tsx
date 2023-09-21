import { FC } from "react"
import { IRestaurant } from "../../../../../../interfaces"

interface RestaurantEntertainmentProps {
    typeMeal: string
    restaurant: IRestaurant
}

export const RestaurantEntertainment: FC<RestaurantEntertainmentProps> = ({ typeMeal, restaurant }) => {
    const isRestaurant = ["lunch", "dinner"]

    if (!isRestaurant.includes(typeMeal)) return null

    return (
        <div>
            {
                restaurant.entertainment?.map((el) => (
                    <p style={{ cursor: "pointer" }}>
                        <abbr title="open more info Entertainment">
                            Edit {el.name}
                        </abbr>
                    </p>
                ))
            }
        </div>
    )
}