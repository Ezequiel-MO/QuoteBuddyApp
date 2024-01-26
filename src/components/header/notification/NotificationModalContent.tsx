import { FC } from 'react'
import { IAccManagerNotification } from '@interfaces/accManagerNotification'
import styles from './ModalNotifications.module.css'

interface NotificationModalContentProps {
    accManagerNotification: IAccManagerNotification
    index: number
    handleClick: (index: number, id: string) => void
}



export const NotificationModalContent: FC<NotificationModalContentProps> = ({ accManagerNotification, index, handleClick }) => {
    return (
        <>
            <details
                className={`border p-4 rounded-lg shadow-lg mb-4 border-l-8 ${accManagerNotification.read === false ? "border-red-500" : ""}`}
                id={accManagerNotification._id}
                key={index}
                onClick={() => handleClick(index, accManagerNotification?._id as string)}
            >
                <summary
                    className="text-lg font-semibold cursor-pointer hover:text-blue-500"
                    style={{ marginLeft: "15px" }}
                >
                    {accManagerNotification.notificationId.title}
                </summary>
                <div
                    className={styles.customContent}
                    dangerouslySetInnerHTML={{ __html: accManagerNotification.notificationId.textContent }}
                >
                </div>
            </details>
        </>
    )
}