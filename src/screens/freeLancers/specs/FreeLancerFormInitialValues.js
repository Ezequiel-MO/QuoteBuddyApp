export const getInitialValues = (freeLancer) => {
    return {
        firstName: freeLancer?.firstName ?? "",
        familyName: freeLancer?.familyName ?? "",
        email: freeLancer?.email ?? "",
        phone: freeLancer?.phone ?? "",
        halfDayRate: freeLancer?.halfDayRate ?? Number(),
        fullDayRate: freeLancer?.fullDayRate ?? Number(),
        languageSupplement: freeLancer?.languageSupplement ?? Number(),
        weekendHDRate: freeLancer?.weekendHDRate ?? Number(),
        weekendFDRate: freeLancer?.weekendFDRate ?? Number(),
        type: freeLancer?.type ?? "",
        city: freeLancer?.city ?? ""
    }
}