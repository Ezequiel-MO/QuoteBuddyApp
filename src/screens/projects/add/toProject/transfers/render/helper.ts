interface IService {
    typeOfAssistance:string
}


export const couterMeetGreetAndAssistance = (services: IService[]) => {
    let meetGreetCount = 0
    let assistanceCount = 0
    for (let i = 0; i < services.length; i++) {
        if (services[i].typeOfAssistance === 'meetGreet') {
            meetGreetCount++
        }
        if (['hostessOnBoard', 'guideOnBoard'].includes(services[i].typeOfAssistance)) {
            assistanceCount++
        }
    }
    return { meetGreetCount, assistanceCount }
}