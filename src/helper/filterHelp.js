
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


export const filterDocumentLength = ({ valuesRute, url, filterOptions }) => {
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