import { useState , useEffect } from "react"
import { ImageList, ImageListItem } from '@mui/material'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import styles from '../../../DayEvents.module.css'

export const ImagesModalEvent = ({ event , imagesEvent, setImagesEvent }) => {
    const [change, setChange] = useState(false)

    const [eventIndex, setEventIndex] = useState(null) 

    useEffect(() => {
        setImagesEvent(event?.imageContentUrl)
    }, [event])

    const handleDeleted = (index , imagen) => {
        let copy = [...imagesEvent]
        copy = copy.filter(el => el !== imagen )
        setImagesEvent(copy)
        toast.success(`Imagen Removed number:${index+1}`, toastOptions)
    }

    if( !imagesEvent || imagesEvent.length === 0){
        return null
    }


    return (
        <div>
            <ImageList
                sx={{ width: '55vw', height: '30vh' }}
                cols={4} rowHeight={164}
                style={{ marginTop: "7px" }}
            >
                {imagesEvent.map((el, index) => (
                    <ImageListItem key={index} style={{ position: 'relative' }}>
                        <div
                            onMouseOver={(event) => {
                                setChange(true)
                                setEventIndex(index)
                            }}
                            onMouseOut={(event) => {
                                setChange(false)
                                setEventIndex(null)
                            }}
                            onClick={() => { handleDeleted(index , el) }}
                        >
                            {
                                eventIndex !== index &&

                                <span
                                    className={styles.deletedImagen}
                                >
                                    <Icon icon="mdi:garbage" className={styles.iconGarbage} />
                                </span>
                            }
                            {
                                change && eventIndex === index &&
                                <span
                                    className={styles.deletedImagen}
                                >
                                    <Icon icon="mdi:garbage-can-empty"
                                        className={styles.iconGarbage}
                                    />
                                </span>
                            }
                        </div>
                        <img
                            src={`${el}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${el}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}