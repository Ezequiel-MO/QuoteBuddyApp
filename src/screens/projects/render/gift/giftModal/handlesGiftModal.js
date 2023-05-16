import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject} from '../../../../../hooks'
import { validateUpdateTextContent } from "./helperGiftModal"

const mySwal = withReactContent(Swal)
// const { editGift } = useCurrentProject()

export const handleClose = ({
    setEditIndex,
    setOpen,
    textContent,
    setTextContent,
    gift
}) => {
    const originalTextContent = gift.textContent
        ?.replace(/&lt;/g, '<')
        ?.replace(/&gt;/g, '>')
    const validateChangedTextContent = validateUpdateTextContent(
        originalTextContent,
        textContent
    )
    if (validateChangedTextContent) {
        mySwal.fire({
            title: 'There is modified data',
            text: 'Are you sure you want to exit? Your data will be lost',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'yes',
            cancelButtonText: `Cancel`,
            customClass: { container: 'custom-container' }
        }).then((res) => {
            if (res.isConfirmed) {
                setEditIndex(-1)
                setOpen(false)
            }
        })
    } else {
        setTextContent(gift?.textContent)
        setEditIndex(-1)
        setOpen(false)
    }
}


export const handleConfirm = ({
    editGift,
    index,
    textContent,
    setOpen,
    setEditIndex
}) => {
    mySwal.fire({
        title: 'Do you want to modify the data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: `Cancel`,
        customClass: { container: 'custom-container' }
    }).then((res) => {
        if (res.isConfirmed) {
            editGift({
                indexGift: index,
                textContent: textContent
            })
            mySwal.fire({
                title: 'Success',
                icon: 'success',
                confirmButtonText: 'continue',
                customClass: { container: 'custom-container' }
            })
            setOpen(false)
            setEditIndex(-1)
        }
    })
}