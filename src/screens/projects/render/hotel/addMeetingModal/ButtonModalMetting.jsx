import { Icon } from '@iconify/react'

export const ButtonModalMetting = ({ handleOpenModalMetting}) => {

    return (
        <>
            <button
                type='button'
                onClick={(e) => {
                    e.stopPropagation()
                    handleOpenModalMetting(e)
                }}
                // style={{ position: "absolute", marginLeft: "280px" }}
                className='focus:scale-110 hover:animate-pulse bg-black-50 hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-0 px-2 border border-orange-50 hover:border-transparent rounded'
            >
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "16px" }} className="truncate">
                    ADD MEETINGS
                    <Icon style={{ marginLeft: "10px", color: "#ea5933" }} icon="bi:box-arrow-in-down-right" />
                </span>
            </button>
        </>
    )
}