
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListHeader } from '../../../components/molecules'
import { useGetGifts } from "../../../hooks"
import { Spinner } from '../../../components/atoms'
import { GiftListItem } from "./GiftListItem"



export const GiftList = () => {
    const navigate = useNavigate()
    const [gift] = useState({})
    const { gifts, isLoading, setGifts } = useGetGifts()

    const handleClick = () => {
        navigate('/app/gift/specs', { state: { gift } })
    }

    return (
        <>
            <ListHeader
                title="Gifts"
                handleClick={handleClick}
            />
            {
                isLoading ?
                    (<Spinner />)
                    :
                    (<div >
                        <GiftListItem gifts={gifts} setGifts={setGifts} />
                    </div>)
            }
        </>
    )
}