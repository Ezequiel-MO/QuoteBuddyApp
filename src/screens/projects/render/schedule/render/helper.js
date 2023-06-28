export const updateEvents  = ({
    prevEvents,
    dayIndexActivate,
    nameEventActivate,
    dayIndexOver,
    nameEventOver,
    active, 
    over,
    activeId
}) => {
    const newEvents = JSON.parse(JSON.stringify(prevEvents));
    const restaurantsStart =
        newEvents[dayIndexActivate][nameEventActivate]?.restaurants ||
        newEvents[dayIndexActivate][nameEventActivate];
    const restaurantsFilter = restaurantsStart.filter(el => el._id !== active.id);
    const restaurantsOver =
        newEvents[dayIndexOver][nameEventOver]?.restaurants ||
        newEvents[dayIndexOver][nameEventOver];
    const { intro: startIntro } = newEvents[dayIndexActivate][nameEventActivate];
    const startRestaurantsFilter = {
        restaurants: restaurantsFilter,
    };
    startIntro && (startRestaurantsFilter.intro = startIntro);
    let newIndex = restaurantsOver.findIndex(el => el._id === over.id);
    newIndex = newIndex >= 0 ? newIndex : 0;
    let sourceArray =
        newEvents[dayIndexOver][nameEventOver]?.restaurants ||
        newEvents[dayIndexOver][nameEventOver];
    const [elementRestaurant] = sourceArray.splice(newIndex, 1);
    sourceArray.splice(newIndex, 0, activeId);
    elementRestaurant && sourceArray.splice(newIndex, 0, elementRestaurant);
    const { intro: overIntro } = newEvents[dayIndexOver][nameEventOver];
    const destinationSourceArray = {
        restaurants: sourceArray,
    };
    overIntro && (destinationSourceArray.intro = overIntro);
    newEvents[dayIndexActivate][nameEventActivate] = startRestaurantsFilter;
    newEvents[dayIndexOver][nameEventOver] = destinationSourceArray;
    return newEvents;
};