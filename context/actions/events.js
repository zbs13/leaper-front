export const fetchEvents = () => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return [{
            eventId: 1,
            name: "l'event 1"
        },
        {
            eventId: 2,
            name: "l'event 2"
        },
        {
            eventId: 3,
            name: "l'event 3"
        }]
    });
}