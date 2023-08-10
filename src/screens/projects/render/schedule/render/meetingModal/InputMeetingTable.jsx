
export const InputMeetingTable = ({ style, nameInptut, data, handleChange, handleEdit, editMode }) => {

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) { // 13 es el código de la tecla Enter
            handleEdit(editMode , nameInptut);
        }
    }

    return (
        <div>
            <input
                style={style || { width: "80px", }}
                className="cursor-pointer text-right  "
                type="number"
                name={nameInptut}
                value={data ?? undefined}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleEdit(editMode, nameInptut)}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
            />
        </div>
    )
}