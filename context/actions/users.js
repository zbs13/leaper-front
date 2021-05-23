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
            phone: "01438108",
            create_at: "2021-05-02 01:00:00",
            birthdate: "1998-06-28 00:00:00",
            country: 78,
            fav_sport: 52,
            events: [{
                id: 7,
                name: "l'event 3",
                description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
                sportId: 2,
                postalCode: 93340,
                owner: {
                    id: 2
                },
                location: {
                    latitude: 48.90049103281167, 
                    longitude: 2.510714120997393
                },
                address: "85 ter boulevard de l'ouest, 93340 Le Raincy",
                startHour: "2021-01-01 22:30:00",
                endHour: "2021-01-01 23:30:00",
                date: "2021-05-19 00:00:00",
                users: [{
                    id: 1,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 1
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                },{
                    id: 3,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 1
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                },{
                    id: 4,
                    firstname: "ezf",
                    lastname: "gueuffffffffffffffle",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 7
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                },{
                    id: 5,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 1
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                },{
                    id: 6,
                    firstname: "efsofgsdoàif",
                    lastname: "gueuleds^pfgiosdàogisçoghiujhçg",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 1
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                },{
                    id: 7,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        name: "le role",
                        event: {
                            id: 1
                        },
                        rights: [
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }],
                }],
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
        }
    })
}