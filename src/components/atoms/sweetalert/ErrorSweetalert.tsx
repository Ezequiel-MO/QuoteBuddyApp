import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

export const errorSweetalert = async (title?: string, text?: string) => mySwal.fire({
    title: title ?? "Error",
    text: text ?? "",
    icon: 'error',
    customClass: { container: 'custom-container' }
})