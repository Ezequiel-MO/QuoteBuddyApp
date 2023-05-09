import { useNavigate } from 'react-router-dom'
import {AddGiftButton} from "./AddGiftButton"

export const GiftSchedule = () =>{
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate('/app/gift')
    }

    return(
        <div>
            {/* <button onClick={()=> handleNavigate()} > navegar </button> */}
            <AddGiftButton handleNavigate={handleNavigate} />
        </div>
    )
}