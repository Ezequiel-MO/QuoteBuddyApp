export function titleByEvent(nameEvent) {
    const upLetter = nameEvent.split("").find(el => el === el.toLocaleUpperCase())
    const indexUpLetter = nameEvent.indexOf(upLetter)
    return nameEvent.slice(0, indexUpLetter) + " " + nameEvent.slice(indexUpLetter).toLowerCase()
}