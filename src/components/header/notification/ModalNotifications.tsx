import { useState, useEffect, FC } from 'react'
import { ModalComponent } from 'src/components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from 'src/components/atoms'
import styles from './ModalNotifications.module.css';
import baseAPI from 'src/axios/axiosConfig'
import { NotificationModalContent } from "./NotificationModalContent"
import { IAccManagerNotification } from '@interfaces/accManagerNotification';

// Define custom style for the modal
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    minHeight: '50vh',
    minWidth: '800px',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 2
}

interface ModalNotificationsProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    notifications: IAccManagerNotification[]
    refresh: () => void
}

export const ModalNotifications: FC<ModalNotificationsProps> = ({
    open,
    setOpen,
    notifications,
    refresh,
}) => {
    const [loading, setLoading] = useState(false)
    const [accManagerNotification, setAccManagerNotification] = useState<IAccManagerNotification[]>([])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setAccManagerNotification(notifications)
            setLoading(false)
        }, 1800)
    }, [open])


    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        refresh()
        setAccManagerNotification([])
        setOpen(false)
    }

    const handleClick = async (index: number, id: string, e:React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {
        e.stopPropagation()
        //cre un nuevo arreglo para que dectete los cambios
        const updatedNotifications = accManagerNotification.map((notification, i) => {
            if (i === index) {
                return {
                    ...notification,
                    read: true
                }
            }
            return notification
        })
        setAccManagerNotification(updatedNotifications)
        try {
            const json = { read: true }
            await baseAPI.patch(`accManagerNotifications/${id}`, json)
        } catch (error) {
            console.log(error)
        }
    }



    if (loading) {
        return (
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
                <div className="flex justify-center items-center mt-40">
                    <Spinner />
                </div>
            </ModalComponent>
        )
    }

    return (
        <ModalComponent
            open={open}
            styleModal={styleModal}
            setOpen={() => {
                refresh()
                setAccManagerNotification([])
                setOpen(false)
            }}
        >
            <ModalCancelButton handleClose={(e: any) => handleClose(e)} />
            {
                accManagerNotification.length > 0 &&
                accManagerNotification?.map((notification, index) => {
                    return (
                        <NotificationModalContent
                            accManagerNotification={notification}
                            handleClick={handleClick}
                            index={index} key={index}
                        />
                    )
                })
            }
        </ModalComponent>
    )
}