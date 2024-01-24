import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListHeader } from '../../../components/molecules'
import { TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { useApiFetch } from 'src/hooks/fetchData/useApiFetch'
import { NotificationListItem } from "./NotificationListItem"
import { INotafication } from "@interfaces/notification"



export const NotificationList = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/app/notification/specs', { state: { notification: {} } })
    }

    const { isLoading, data: notifications, setData: setNotifications } = useApiFetch<INotafication>('notifications')
    const notificationList = notifications.map((el, index) => {
        return (
            <NotificationListItem
                notification={el}
                notifications={notifications}
                setNotification={setNotifications}
                key={index}
            />
        )
    })

    return (
        <>
            <ListHeader
                title='Notifications'
                handleClick={handleNavigate}
            />
            <hr />
            <div className="flex-1 m-4 flex-col">
                {
                    isLoading ?
                        <Spinner />
                        :
                        <table className="w-full p-5">
                            <TableHeaders headers='notification' />
                            {notificationList}
                        </table>
                }
            </div>
        </>
    )
}