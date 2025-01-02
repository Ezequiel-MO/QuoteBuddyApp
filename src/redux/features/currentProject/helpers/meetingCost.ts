import { IMeeting } from '@interfaces/meeting'

export const meetingTotalCost = (meetingDetails: IMeeting, meetingType: 'morning' | 'afternoon' | 'full_day' ,pax:number) => {
    let totalMeetingsCost = 0
    const {
        FDRate = 0,
        HDRate = 0,
        HDDDR = 0,
        FDDDR = 0,
        coffeeBreakUnits = 0,
        coffeeBreakPrice = 0,
        workingLunchUnits = 0,
        workingLunchPrice = 0,
        hotelDinnerUnits = 0,
        hotelDinnerPrice = 0,
        aavvPackage = 0
    } = meetingDetails
    const dddrCost = meetingType === 'full_day' ? FDDDR : HDDDR
    const meetingCost =
        Number(FDRate) + Number(HDRate) +
        Number(dddrCost) * Number(pax) +
        Number(coffeeBreakUnits) * Number(coffeeBreakPrice) +
        Number(workingLunchUnits) * Number(workingLunchPrice) +
        Number(hotelDinnerUnits) * Number(hotelDinnerPrice) + Number(aavvPackage)
    totalMeetingsCost += Number(meetingCost)
    return totalMeetingsCost
}