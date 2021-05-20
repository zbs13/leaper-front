/**
 * get user datas by id
 * 
 * @param {string} id user id
 * @returns 
 */
export const fetchUserById = (id) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {
            id: 1,
            firstname: "Lala",
            lastname: "Lolo",
            email: "lulu@caca.fr",
            create_at: "2021-05-02 01:00:00",
            events: [{
                id: 1,
                name: "le groupe de ouf",
                description: "La mege description zebi",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                sportId: 5
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
        }
    })
}