import { Icon } from '@iconify/react'
import { FC, MouseEvent } from 'react';

interface Hotel {
  meetingImageContentUrl: string[];
}

interface ButtonModalMeetingImagesProps { // interface del componente
  hotel?: Hotel;
  handleOpen: (event: MouseEvent<HTMLButtonElement>) => void; // con esto digo que es una funcion de tipo moueseEvent
}

export const ButtonModalMeetingImages: FC<ButtonModalMeetingImagesProps> = ({ hotel, handleOpen }) => {
    
    if (!hotel) {
        return null
    }

    return (
        <button
            type='button'
            onClick={(e) => {
                e.stopPropagation()
                handleOpen(e)
            }}
            // style={{ position: "absolute", marginLeft: "430px" }}
            className='focus:scale-110 hover:animate-pulse bg-black-50 hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-0 px-2 border border-orange-50 hover:border-transparent rounded'
        >
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "16px" }} className="truncate">
                {
                    hotel?.meetingImageContentUrl.length > 0 ?
                        "EDIT MEETING IMAGES" :
                        "ADD MEETING IMAGES"
                }
                <Icon style={{ marginLeft: "10px", color: "" }} icon="bi:images" />
            </span>
        </button>
    )
}