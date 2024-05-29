import { FC } from "react"
import { IClient, IClientNote } from 'src/interfaces/client'
import { Button } from "src/components/atoms/buttons/Button"
import { TextInput } from '@components/atoms'
import { ClientOptionsSelect } from "./ClientOptionsSelect"
import { RichTextEditor } from "src/components/molecules"


type ClientNoteKey = keyof IClientNote

interface ClientNotesProps {
    data: IClient
    setData: React.Dispatch<React.SetStateAction<any>>
    notes: IClientNote[]
    setNotes: React.Dispatch<React.SetStateAction<IClientNote[]>>
}


export const ClientNotes: FC<ClientNotesProps> = ({ data, setData, notes, setNotes }) => {

    const optionsQualification = [
        { value: "Feedback", name: "Feedback" },
        { value: "Incident", name: "Incident" },
        { value: "Complaint", name: "Complaint" },
        { value: "Other", name: "Other" },
    ]

    // Función para agregar una nueva "note" al estado.
    const addNote = () => {
        const newNote = { type: "", date: "", textContent: "" } as any
        setNotes([...notes, newNote])
    }

    // Función para manejar la eliminación de una "note" específica.
    const removeNote = (index: number) => {
        const updatedNotes = notes.filter((_, idIndex) => idIndex !== index);
        setNotes(updatedNotes)
    }

    //handle para el "TextInput" and "ClientOptionsSelect"
    const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = event.target
        const keyNote = name as ClientNoteKey
        const updateNotes = [...notes]
        updateNotes[index][keyNote] = value as any
        setNotes(updateNotes)
    }

    // handle para RichTextEditor
    const handleRichTextEditor = (text: string, index: number) => {
        const updateNotes = [...notes]
        updateNotes[index].textContent = text
        setNotes(updateNotes)
    }

    return (
        <div>
            {
                notes.map((el, index) => {
                    return (
                        <div key={index}>
                            <label className="block uppercase text-lg text-gray-400 font-medium mb-4 ">
                                <hr />
                                New Note
                            </label>
                            <div className='flex space-x-4' key={index}>
                                <div className="w-1/2">
                                    <TextInput
                                        label='Date'
                                        type='date'
                                        name="date"
                                        value={el.date}
                                        handleChange={(event) => handleChangeNote(event, index)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ClientOptionsSelect
                                        titleLabel="type"
                                        options={optionsQualification}
                                        name="type"
                                        keyValue="type"
                                        value={el.type}
                                        handleChange={(event) => handleChangeNote(event, index)}
                                    />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <label className="block uppercase text-lg text-gray-400 font-medium">
                                    description
                                </label>
                                <RichTextEditor
                                    textContent={el.textContent}
                                    setTextContent={(text: string) => handleRichTextEditor(text, index)}
                                    update={false} // 
                                    screen={{}} // 
                                    keyScreen='' //
                                    style={{ marginBottom: '25px' }}
                                />
                            </div>
                            <Button
                                icon="tdesign:delete-1"
                                newClass='flex items-center gap-1 text-red-400 hover:text-red-600 ml-96 mt-2'
                                type="button"
                                widthIcon={20}
                                handleClick={() => removeNote(index)}
                            >
                                Delete Description
                            </Button>
                        </div>
                    )
                })
            }
            <Button
                icon=""
                newClass="text-green-300 hover:text-green-500"
                type="button"
                handleClick={addNote}
            >
                + Add Note
            </Button>
        </div>
    )
}