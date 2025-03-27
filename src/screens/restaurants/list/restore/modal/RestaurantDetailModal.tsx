import { IRestaurant } from '@interfaces/restaurant'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
import { formatMoney } from 'src/helper'

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

interface RestaurantDetailModalProps {
    restaurant: IRestaurant
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RestaurantDetailModal: FC<RestaurantDetailModalProps> = ({ restaurant, open, setOpen }) => {

    const handleModalClose = () => {
        setOpen(false)
    }


    return (
        <div role="menuitem">
            <ModalComponent open={open} setOpen={() => handleModalClose()} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => handleModalClose()} />
                <h1 className='text-center mb-4 text-4xl'>
                    {restaurant?.name}
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <p>
                        <strong>City: </strong>
                        {restaurant?.city}
                    </p>
                    <p>
                        <strong>Cost:</strong>
                        {formatMoney(restaurant?.price ? restaurant?.price : 0)}
                    </p>
                    <p>
                        <strong>Max capacity: </strong>
                        {restaurant?.maxCapacity ? restaurant?.maxCapacity : 'No information'}
                    </p>
                    <p>
                        <strong>It is a venue: </strong>
                        {restaurant?.isVenue ? 'Yes' : 'No'}
                    </p>
                </div>

                {/* Descripción del hotel */}
                <div className={`mt-6 ${!restaurant.textContent && 'opacity-0 h-0'} `} >
                    <h3 className="text-md font-semibold mb-2">Description (English)</h3>
                    <div className="bg-gray-800 text-white-0 p-4 rounded whitespace-pre-line">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: restaurant.textContent ?? ''
                            }}
                        ></div>
                    </div>
                </div>
                <div className="mt-6 mb-8">
                    <ul
                        className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900"
                    >
                        {restaurant.imageUrlCaptions?.map((el, index) => (
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