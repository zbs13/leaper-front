export const fetchGroups = () => {
    return fetch("https://sdgdfghrdh.fr").then().catch(() => {
        return [{
            groupId: 1,
            name: "le groupe 1"
        },
        {
            groupId: 2,
            name: "le groupe 2"
        },
        {
            groupId: 3,
            name: "le groupe 3"
        }]
    });
}