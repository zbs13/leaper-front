/**
 * fetch my groups according to offset
 * 
 * @param {number} offset offset for getting results  
 * @returns 
 */
export const fetchMyGroups = (offset) => {
    return fetch("https://sdgdfghrdh.fr").then().catch(() => {
        return [{
            groupId: 1,
            name: "le groupe 1",
            description: "yaaaa",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822043275552489492/image0.jpg?width=457&height=609"
        },
        {
            groupId: 2,
            name: "le groupe 2",
            description: "yaaaa",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822043275552489492/image0.jpg?width=457&height=609"
        },
        {
            groupId: 3,
            name: "le groupe 3",
            description: "yaaaa",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822043275552489492/image0.jpg?width=457&height=609"
        },
        {
            groupId: 4,
            name: "le groupe 4",
            description: "yaaaa",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822043275552489492/image0.jpg?width=457&height=609"
        },
        {
            groupId: 5,
            name: "le groupe 5",
            description: "yaaaa",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822043275552489492/image0.jpg?width=457&height=609"
        }]
    });
}

/**
 * fetch my groups by id
 * 
 * @param {number} id group id  
 * @returns 
 */
export const fetchById = (id) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {
            id: 7,
            name: "le groupe 3",
            description: "la descriptionjfoezj fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezon zeb zerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
            users: [{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },{
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
        }
    })
}

/**
 * fetch messages in group
 * 
 * @param {number} id group id 
 * @param {number} offset offset for getting results
 * @returns 
 */
 export const fetchMessages = (id, offset) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return [{
            id: 1,
            content: "ta mere la pute",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/830803906027454514/1585832659398.png"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 2,
            content: "ta mere la pute 2",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "video",
                uri: "https://media.tenor.co/videos/e34c8f6730986f42163745064476eb46/mp4"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 3,
            content: "ta mere la pute",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://media.giphy.com/media/l396Uasr95XqhSFJm/giphy.gif"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 4,
            content: "ta mere la pute",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 5,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 6,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 7,
            content: "ta mere la phghththtrhrthrthrthrthtrh th th ",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 8,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 9,
            content: "non",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 10,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 11,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 12,
            content: "non",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        }]
    })
}