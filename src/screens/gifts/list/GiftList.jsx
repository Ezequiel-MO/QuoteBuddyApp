
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListHeader } from '../../../components/molecules'


export const GiftList = () => {
    const navigate = useNavigate()
    const [gift] = useState({})

    const handleClick = () =>
        navigate('/app/gift/specs', { state: { gift } })

    return (
        <div>
            <ListHeader
                title="Gifts"
                handleClick={handleClick}
            />
        </div>
    )
}