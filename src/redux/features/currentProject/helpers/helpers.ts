

export const getDay = (dayIndex: number, scheduleLength: number) => {
    if (dayIndex === 0) {
        return 'Arrival Day'
    }
    if (dayIndex === scheduleLength - 1) {
        return 'Departure Day'
    }
    return `Day ${dayIndex + 1}`
}

export const getTimeOfMeetingBudget = (timeOfMeeting: string) => {
    const upLetter = timeOfMeeting.split('').find(el => el === el.toUpperCase())
    let keyMeetingBudget = ''
    if (upLetter) {
        const indexUpLetter = timeOfMeeting.indexOf(upLetter)
        keyMeetingBudget = timeOfMeeting.slice(0, indexUpLetter)
    }
    return keyMeetingBudget === 'full' ? 'full_day' : keyMeetingBudget
}