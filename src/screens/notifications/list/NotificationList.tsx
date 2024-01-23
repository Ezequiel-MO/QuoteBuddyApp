import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListHeader } from '../../../components/molecules'
import { TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'


export const NotificationList = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/app/notification/specs', { state: { notification: {} } })
    }

    return (
        <>
            <ListHeader
                title='Notifications'
                handleClick={handleNavigate}
            />
            <hr />
            <div className="flex-1 m-4 flex-col">
                <table className="w-full p-5">
                    <TableHeaders headers='notification' />
                </table>
            </div>
        </>
    )
}