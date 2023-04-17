import { useState } from "react"
import { ImageList, ImageListItem } from '@mui/material'
import { Icon } from '@iconify/react'
import styles from '../../DayEvents.module.css'

export const ImagesModalHotel = ({ hotel }) => {
    const [change, setChange] = useState(false)

    const [hotelIndex, setHotelIndex] = useState(null)


    return (
        <div>
            <ImageList
                sx={{ width: '55vw', height: '30vh' }}
                cols={4} rowHeight={164}
                style={{ marginTop: "7px" }}
            >
                {hotel?.imageContentUrl?.map((el, index) => (
                    <ImageListItem key={index} style={{ position: 'relative' }}>
                        {
                            hotelIndex !== index &&
                            <span
                                className={styles.deletedImagen}
                                // onClick={() => { ACA SE PODRIA UTILIZAR EL DELETED DE MODALPITURES.JSX }}
                                onMouseOver={(event) => {
                                    setChange(true)
                                    setHotelIndex(index)
                                }}
                            >
                                <Icon icon="mdi:garbage" className={styles.iconGarbage} />
                            </span>
                        }
                        {
                            change && hotelIndex === index &&
                            <span
                                className={styles.deletedImagen}
                                onMouseOut={(event) => {
                                    setChange(false)
                                    setHotelIndex(null)
                                }}
                            >
                                <Icon icon="mdi:garbage-can-empty"
                                    className={styles.iconGarbage}
                                />
                            </span>
                        }
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