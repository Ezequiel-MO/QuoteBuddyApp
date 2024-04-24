import { useState , useEffect } from 'react'
import { IGift } from "src/interfaces/"
import { useContextBudget } from '../../../context/BudgetContext'
import { GiftRow } from "./GiftRow"



export const GiftSection = () => {
    const { state, dispatch } = useContextBudget()
    const [selectedGift, setSelectedGift] = useState<IGift>(state.gifts[0])

    if (state.gifts.length === 0) return null

    useEffect(()=>{
        dispatch({
            type:"UPDATE_GIFT_COST",
            payload:{
                value: selectedGift.qty * selectedGift.price
            }
        })
    },[state.gifts , selectedGift , dispatch])

    return (
        <>
            <GiftRow
                items={state.gifts}
                selectedGift={selectedGift}
                setSelectedGift={setSelectedGift}
            />
        </>
    )
}