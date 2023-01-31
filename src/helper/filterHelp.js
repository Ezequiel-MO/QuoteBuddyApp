
export const filterDocumentLength = ({ city, numberStars, numberRooms, url }) => {
    let resultsUrl = `v1/${url}`
    if (city) {
        resultsUrl = `v1/${url}?city=${city}`
    }
    if (city && numberStars) {
        resultsUrl = `v1/${url}?city=${city}&numberStars=${numberStars}`
    }
    if (city && numberRooms) {
        resultsUrl = `v1/${url}?city=${city}&numberRooms[lte]=${numberRooms}`
    }
    if (numberStars && !city) {
        resultsUrl = `v1/${url}?numberStars=${numberStars}`
    }
    if (numberStars && numberRooms) {
        resultsUrl = `v1/${url}?numberStars=${numberStars}&numberRooms[lte]=${numberRooms}`
    }
    if (numberRooms && !city && !numberStars) {
        resultsUrl = `v1/${url}?numberRooms[lte]=${numberRooms}`
    }
    if (city && numberStars && numberRooms) {
        resultsUrl = `v1/${url}?city=${city}&numberStars=${numberStars}&numberRooms[lte]=${numberRooms}`
    }
    return resultsUrl
}

export const filter = ({ valuesRute, url, filterOptions, page }) => {
    let resultsUrl = `v1/${url}?page=${page}&limit=10`
    const valuesUrlFilters = []
    for (let i = 0; i < valuesRute.length; i++) {
        for (let j = 0; j < filterOptions.length; j++) {
            if (valuesRute[i].name.includes(filterOptions[j])) {
                valuesRute[i].value && valuesUrlFilters.push(valuesRute[i])
                typeof valuesRute[i].value === "boolean" && valuesUrlFilters.push(valuesRute[i])
            }
        }
    }
    console.log(valuesUrlFilters)
    let newUrl = ""
    if (valuesUrlFilters.length > 0) {
        for (let i = 0; i < valuesUrlFilters.length; i++) {
            newUrl = newUrl + `&${valuesUrlFilters[i].name}=${valuesUrlFilters[i].value}`
        }
    }
    let finalUrl = resultsUrl + newUrl
    return finalUrl
}


export const newFilterDocumentLength = ({ valuesRute, url, filterOptions }) => {
    let resultsUrl = `v1/${url}?`
    const valuesUrlFilters = []
    for (let i = 0; i < valuesRute.length; i++) {
        for (let j = 0; j < filterOptions.length; j++) {
            if (valuesRute[i].name.includes(filterOptions[j])) {
                valuesRute[i].value && valuesUrlFilters.push(valuesRute[i])
            }
        }
    }
    let newUrl = ""
    if (valuesUrlFilters.length > 0) {
        for (let i = 0; i < valuesUrlFilters.length; i++) {
            newUrl = newUrl + `&${valuesUrlFilters[i].name}=${valuesUrlFilters[i].value}`
        }
    }
    let finalUrl = resultsUrl + newUrl
    return finalUrl
}