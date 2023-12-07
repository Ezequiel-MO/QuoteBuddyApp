import { InputMeetingForm } from "./InputMeetingForm"
import { SelectMeetingForm } from "./SelectMeetingForm"
import { RichTextEditor } from "../../../../../components/molecules"

export const MeetingDetailsMasterForm = ({
    meetingDetails,
    setMeetingDetails,
    textContent,
    setTextContent,
    screen,
}) => {
    const valuesVisibility = ['good', 'some columns']

    const handleChange = (e) => {
        setMeetingDetails({
            ...meetingDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleCheckBox = (e) => {
        setMeetingDetails({
            ...meetingDetails,
            [e.target.name] : e.target.checked
        })
    }

    return (
        <fieldset style={{ marginTop: "20px" }} className="flex items-center justify-center">
            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <InputMeetingForm label="Capacity" name="capacity" data={meetingDetails.capacity} handleChange={handleChange} />
                    <InputMeetingForm label="Size" name="size" data={meetingDetails.size} handleChange={handleChange} />
                    <SelectMeetingForm
                        label="Visibility"
                        options={valuesVisibility}
                        name="visibility"
                        value={meetingDetails.visibility}
                        handleChange={handleChange}
                    />
                    <>
                        <label className='mr-2'>Natural Light</label>
                        <input type="checkbox" name="naturalLight" checked={meetingDetails.naturalLight} onChange={(e) => handleCheckBox(e)} />
                    </>
                </div>
                <br />
                <RichTextEditor
                    style={{}}
                    textContent={textContent}
                    setTextContent={setTextContent}
                    screen={screen}
                    update={true}
                />
            </div>
        </fieldset>
    )
}