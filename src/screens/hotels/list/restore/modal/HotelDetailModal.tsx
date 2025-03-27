import { IHotel } from '@interfaces/hotel'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
    padding: 5
}

interface HotelDetailModalProps {
    hotel: IHotel
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelDetailModal: FC<HotelDetailModalProps> = ({ hotel, open, setOpen }) => {

    const handleModalClose = () => {
        setOpen(false)
    }


    return (
        <div role="menuitem">
            <ModalComponent open={open} setOpen={() => handleModalClose()} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => handleModalClose()} />
                <h1 className='text-center mb-4 text-4xl'>
                    {hotel.name}
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <p>
                        <strong>City: </strong>
                        {hotel.city}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {hotel.address}
                    </p>
                    <p><strong>Stars:</strong> {hotel.numberStars} stars</p>
                    <p><strong>Total Rooms:</strong> {hotel.numberRooms}</p>
                    <p><strong>Meeting Rooms:</strong> {hotel.meetingRooms}</p>
                    <p><strong>Check-in/out:</strong> {hotel.checkin_out}</p>
                    <p><strong>Wi-Fi Speed:</strong> {hotel.wifiSpeed}</p>
                    <p><strong>Restaurants:</strong> {hotel.restaurants}</p>
                    <p><strong>Swimming Pool:</strong> {hotel.swimmingPool}</p>
                    <p><strong>Wheelchair Accessible:</strong> {hotel.wheelChairAccessible ? 'Yes' : 'No'}</p>
                </div>

                {/* Descripción del hotel */}
                <div className={`mt-6 ${!hotel.textContent && 'opacity-0 h-0'} `} >
                    <h3 className="text-md font-semibold mb-2">Description (English)</h3>
                    <div className="bg-gray-800 text-white-0 p-4 rounded whitespace-pre-line">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: hotel.textContent ?? ''
                            }}
                        ></div>
                    </div>
                </div>
                <div className="mt-6 mb-8">
                    <ul
                        className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900"
                    >
                        {hotel.imageUrlCaptions?.map((el, index) => (
                            <li
                                key={el._id}
                                className={`relative flex-grow-0 flex-shrink-0 min-w-0 p-2 w-1/4`}
                            >
                                <div className='relative'>
                                    <img
                                        src={el.imageUrl}
                                        key={el._id}
                                        className={`rounded-md  h-40 object-cover w-40`}
                                        loading="lazy"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </ModalComponent>
        </div>
    )
}