import { useState} from 'react'
import { Icon } from '@iconify/react'
import { ModalComponent } from '../../../../../components/atoms/Modal'
import { RichTextEditor } from '../../../../../ui'
import { useCurrentProject } from '../../../../../hooks'
import { handleClose , handleConfirm } from "./handlesGiftModal"
import styles from "../GiftProyect.module.css"

export const GiftModal = ({ open, setOpen, gift, index, setEditIndex }) => {
    const { editGift } = useCurrentProject()
    const [textContent, setTextContent] = useState()

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2
    }


    const modalClose = () => {
        setOpen(false)
        setEditIndex(-1)
    }

    const update = Object.keys(gift).length > 0


    if (Object.keys(gift).length === 0) {
        return null
    }


    return (
        <div>
            <ModalComponent open={open} setOpen={modalClose} styleModal={styleModal}>
                <button
                    className={styles.buttonCancel}
                    onClick={() => handleClose({ setEditIndex, setOpen, setTextContent, textContent, gift })}
                >
                    <Icon icon="material-symbols:cancel" width="30" />
                </button>
                <div style={{ marginTop: "50px", marginLeft: "30px" }}>
                    <RichTextEditor
                        style={{ width: '95%', }}
                        textContent={textContent}
                        setTextContent={setTextContent}
                        screen={gift}
                        update={update}
                    />
                </div>
                <button
                    className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-slate-900 text-white-0 hover:text-white-0 fonrt-bold uppercase rounded-lg"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '10px'
                    }}
                    onClick={() => handleConfirm({
                        editGift,
                        index,
                        setEditIndex,
                        setOpen,
                        textContent
                    })}
                >
                    Save Edit
                </button>
            </ModalComponent>
        </div>
    )
}