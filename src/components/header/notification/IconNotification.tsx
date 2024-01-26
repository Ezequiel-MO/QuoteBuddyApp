import { useState } from "react"
import { Icon } from '@iconify/react'
import Badge from '@mui/material/Badge'
import { useAuth } from "src/context/auth/useAuth"
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'
import { useFetchNotifications } from "src/hooks/fetchData/useFetchNotifications"
import { ModalNotifications } from "./ModalNotifications"
import { IAccManager } from '@interfaces/accManager'
import { IAccManagerNotification } from '@interfaces/accManagerNotification'



export const IconNotification = () => {

    const [openModal, setOpenModal] = useState(false)

    const { auth } = useAuth()

    const { accManagers: accManager } = useFetchAccManagers({
        query: auth.email
    })

    const userAcc = accManager as IAccManager

    const [forceRefresh, setForceRefresh] = useState(0)
    const { notifications: notificationsRead, isLoading, setData } = useFetchNotifications({
        params: `accManager/${userAcc._id}/false`,
        forceRefresh
    })

    const refresh = () => {
        setForceRefresh((prevCount) => prevCount + 1)
    }

    const handleOpen = () => {
        refresh()
        setTimeout(() => {
            setOpenModal(prev => !prev)
        }, 180)
    }


    if (notificationsRead.length === 0) return null

    return (
        <>
            {
                !isLoading &&
                <ModalNotifications
                    open={openModal}
                    setOpen={setOpenModal}
                    refresh={refresh}
                    notifications={notificationsRead as IAccManagerNotification[]}
                />
            }
            <button onClick={handleOpen}>
                <Badge badgeContent={notificationsRead.length} color='error'>
                    <Icon
                        icon="iconamoon:notification-duotone"
                        width="35px"
                        className="text-green-700 hover:text-green-400"
                    />
                </Badge>
            </button>
        </>
    )
}