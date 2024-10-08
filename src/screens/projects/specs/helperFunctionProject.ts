import { IProject, IDay } from "@interfaces/project"
import { computeTotalDays, whichDay } from "src/helper/helperFunctions"

export const createScheduleDays = (project: IProject) => {
    const projectCopy: IProject = JSON.parse(JSON.stringify(project))
    const schedule = []
    const diffDays = computeTotalDays(project.arrivalDay, project.departureDay)
    for (let i = 1; i <= diffDays; i++) {
        schedule.push({
            date: whichDay(i, diffDays),
            // dayOfEvent: i,
            fullDayMeetings: {
                intro: '',
                meetings: []
            },
            morningMeetings: {
                intro: '',
                meetings: []
            },
            morningEvents: {
                intro: '',
                events: []
            },
            lunch: {
                intro: '',
                restaurants: []
            },
            afternoonMeetings: {
                intro: '',
                meetings: []
            },
            afternoonEvents: {
                intro: '',
                events: []
            },
            dinner: {
                intro: '',
                restaurants: []
            },
            transfer_in: [],
            transfer_out: [],
            itinerary: {
                intro: '',
                itinerary: [],
                morningActivity: {
                    intro: '',
                    events: []
                },
                afternoonActivity: {
                    intro: '',
                    events: []
                },
                nightActivity: {
                    intro: '',
                    events: []
                },
                lunch: {
                    intro: '',
                    restaurants: []
                },
                dinner: {
                    intro: '',
                    restaurants: []
                },
                starts: '',
                ends: ''
            },
            overnight: {
                intro: '',
                hotels: []
            }
        })
    }
    return schedule
}


export const updateScheduleDays = (project: IProject) => {
    const projectCopy: IProject = JSON.parse(JSON.stringify(project))
    const schedule = [...projectCopy.schedule]
    const diffDays = computeTotalDays(project.arrivalDay, project.departureDay)
    const currentNumberDays = project.schedule?.length
    //SI SE AGREGAN MAS DIAS
    if (currentNumberDays < diffDays) {
        for (let i = 0; i < diffDays; i++) {
            if (i === currentNumberDays - 1) {
                schedule[i].date = whichDay(i + 1, diffDays)
            }
            if (i > currentNumberDays - 1) {
                schedule.push({
                    date: whichDay(i + 1, diffDays),
                    // dayOfEvent: i,
                    fullDayMeetings: {
                        intro: '',
                        meetings: []
                    },
                    morningMeetings: {
                        intro: '',
                        meetings: []
                    },
                    morningEvents: {
                        intro: '',
                        events: []
                    },
                    lunch: {
                        intro: '',
                        restaurants: []
                    },
                    afternoonMeetings: {
                        intro: '',
                        meetings: []
                    },
                    afternoonEvents: {
                        intro: '',
                        events: []
                    },
                    dinner: {
                        intro: '',
                        restaurants: []
                    },
                    transfer_in: [],
                    transfer_out: [],
                    itinerary: {
                        intro: '',
                        itinerary: [],
                        morningActivity: {
                            intro: '',
                            events: []
                        },
                        afternoonActivity: {
                            intro: '',
                            events: []
                        },
                        nightActivity: {
                            intro: '',
                            events: []
                        },
                        lunch: {
                            intro: '',
                            restaurants: []
                        },
                        dinner: {
                            intro: '',
                            restaurants: []
                        },
                        starts: '',
                        ends: ''
                    },
                    overnight: {
                        intro: '',
                        hotels: []
                    }
                })
            }
        }
    }
    //SI SON MENOS DIAS
    if (currentNumberDays > diffDays) {
        for (let i = 0; i < currentNumberDays; i++) {
            if (i === diffDays - 1) {
                schedule[i].date = whichDay(i + 1, diffDays)
            }
            if (i > diffDays - 1) {
                schedule.pop()
            }
        }
    }
    console.log({ diffDays, currentNumberDays })
    return schedule
}