
export const AddClient = ({ handleClick }) => {
    return (
        <button
            type='button'
            style={{ fontSize: "17px" }}
            className="flex-none py-1 px-5 mt-6 rounded-md text-center cursor-pointer hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase"
            onClick={() => handleClick()}
        >
            ADD CLIENT
        </button>
    )
}