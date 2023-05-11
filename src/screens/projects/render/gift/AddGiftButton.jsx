export const AddGiftButton = ({ handleNavigate , gifts }) => {

    //con esto hago que no se visible el button , esto es porque por ahora solamente se agrega un gift
    if(gifts.length > 0){
        return null    
    }

    return (
        <button
            onClick={() => handleNavigate()}
            className="my-2 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
        >
            Add Gift from DATABASE
        </button>
    )
}