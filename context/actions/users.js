import { req } from './apiCall';
import gql from 'graphql-tag';

export const login = (mail, password) => {
    return req(
        'mutation',
        gql`mutation($mail: String!, $password: String!){
            login(
                email: $mail,
                password: $password
            ),{
                token,
                user{
                    id,
                    firstname,
                    lastname,
                    email,
                    phone,
                    is_verified,
                    is_ban,
                    create_at,
                    groups{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        description,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        }
                    },
                    groupsOwner{
                        id,
                        name,
                        description
                    },
                    events{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        description,
                        start_hour,
                        end_hour,
                        date,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        }
                    },
                    eventsOwner{
                        id,
                        name,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        description,
                        start_hour,
                        end_hour,
                        date
                    },
                    roles{
                        id,
                        name,
                        rights{
                            id,
                            name
                        },
                        group{
                            id,
                            name,
                            description
                        },
                        event{
                            id,
                            name,
                            address,
                            location{
                                latitude,
                                longitude
                            },
                            description,
                            start_hour,
                            end_hour,
                            date
                        }
                    },
                    is_notif_accept,
                    is_notif_message_group,
                    is_notif_message_event,
                    is_notif_add_group,
                    is_notif_add_event,
                    is_notif_add_friend,
                    is_remind_event,
                    birthdate,
                    fav_sport,
                    country,
                    friends{
                        id,
                        firstname,
                        lastname,
                    },
                    bookmarks{
                        id,
                        name,
                        description,
                        address,
                        location{
                            latitude,
                            longitude
                        }
                    }
                }
            }
        }`, 
        {
            mail: mail,
            password: password
        }
    )
    // return fetch("https://sdgdfghrdh.fr").then(() => {
    //     return {
    //         id: 2
    //     }
    // }).catch(() => {
    //     return {
    //         token: "pqeifopejfg",
    //         user: {
    //             id: 2,
    //             fav_sport: 1,
    //             firstname: "Lucas",
    //             lastname: "zedz",
    //             profilePic: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
    //             friends: [{
    //                 id: 1,
    //                 firstname: "eofj",
    //                 lastname: "pekjifoe",
    //                 src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
    //             },
    //             {
    //                 id: 2,
    //                 firstname: "brulux",
    //                 lastname: "joooe",
    //                 src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
    //             }],
    //             bookmarks: [
    //                 {
    //                     id: 6,
    //                     name: "l'event 3",
    //                     description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
    //                     sportId: 2,
    //                     postalCode: 93340,
    //                     owner: {
    //                         id: 2
    //                     },
    //                     location: {
    //                         latitude: 48.90049103281167, 
    //                         longitude: 2.510714120997393
    //                     },
    //                     roles: [{
    //                         id: 1,
    //                         name: "le rooooole",
    //                         rights: [{
    //                             id: 1
    //                         },
    //                         {
    //                             id: 3
    //                         }]
    //                     }],
    //                     address: "85 ter boulevard de l'ouest, 93340 Le Raincy",
    //                     startHour: "2021-01-01 22:30:00",
    //                     endHour: "2021-01-01 23:30:00",
    //                     date: "2021-05-19 00:00:00",
    //                     users: [{
    //                         id: 1,
    //                         firstname: "Ta",
    //                         lastname: "gueule",
    //                         src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
    //                         roles: [{
    //                             id: 1,
    //                             name: "le role",
    //                             event: {
    //                                 id: 1
    //                             },
    //                             rights: [
    //                                 {
    //                                     id: 1
    //                                 },
    //                                 {
    //                                     id: 2
    //                                 }
    //                             ]
    //                         }],
    //                     }]
    //                 },
    //                 {
    //                     id: 8,
    //                     name: "l'event 5",
    //                     description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
    //                     sportId: 2,
    //                     postalCode: 93340,
    //                     owner: {
    //                         id: 2
    //                     },
    //                     location: {
    //                         latitude: 48.90049103281167, 
    //                         longitude: 3.510714120997393
    //                     },
    //                     roles: [{
    //                         id: 1,
    //                         name: "le rooooole",
    //                         rights: [{
    //                             id: 1
    //                         },
    //                         {
    //                             id: 3
    //                         }]
    //                     }],
    //                     address: "84 ta mere road",
    //                     startHour: "2021-01-01 22:30:00",
    //                     endHour: "2021-01-01 23:30:00",
    //                     date: "2021-05-19 00:00:00",
    //                     users: [{
    //                         id: 2,
    //                         firstname: "Ta",
    //                         lastname: "gueule",
    //                         src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
    //                         roles: [{
    //                             id: 2,
    //                             name: "le role",
    //                             event: {
    //                                 id: 1
    //                             },
    //                             rights: [
    //                                 {
    //                                     id: 1
    //                                 },
    //                                 {
    //                                     id: 2
    //                                 }
    //                             ]
    //                         }],
    //                     }]
    //                 }
    //             ]
    //         }
    //     }
    // })
}

/**
 * create user profile
 * 
 * @param {string} firstname user firstname
 * @param {string} lastname user lastname
 * @param {string} email user email
 * @param {string} password user password
 * @param {string} phone user phone
 * @param {string} country user phone country
 * @param {string} birthdate user birthdate
 * @param {number} fav_sport user favorite sport
 * @param {string|null} profilePic user profile picture
 */
 export const signup = ({firstname, lastname, email, password, phone, country, birthdate, fav_sport, profilePic}) => {
    return req(
        'mutation',
        gql`mutation( 
            $firstname: String!, 
            $lastname: String!, 
            $email: String!, 
            $password: String!, 
            $phone: String!, 
            $birthdate: DateTime!, 
            $fav_sport: Int!, 
            $profilePic: String!, 
            $country: String!){
            signup(
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password,
                phone: $phone,
                birthdate: $birthdate,
                fav_sport: $fav_sport,
                profilePic: $profilePic,
                country: $country
            ),{
                user{
                    id
                }
            }
        }`, 
        {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            birthdate: birthdate,
            fav_sport: fav_sport,
            profilePic: "",
            country: country,
        }
    )
};

/**
 * edit user profile
 * 
 * @param {string} firstname user firstname
 * @param {string} lastname user lastname
 * @param {string} email user email
 * @param {string} password user password
 * @param {string} phone user phone
 * @param {string} country user phone country
 * @param {string} birthdate user birthdate
 * @param {number} fav_sport user favorite sport
 * @param {string|null} profilePic user profile picture
 */
export const editProfile = ({firstname, lastname, email, password, phone, country, birthdate, fav_sport, profilePic}) => {
    // return req(
    //     'mutation',
    //     gql`mutation( 
    //         $firstname: String!, 
    //         $lastname: String!, 
    //         $email: String!, 
    //         $password: String!, 
    //         $phone: String!, 
    //         $birthdate: DateTime!, 
    //         $fav_sport: Int!, 
    //         $profilePic: String!, 
    //         $country: String!){
    //         updateUser(
    //             firstname: $firstname,
    //             lastname: $lastname,
    //             email: $email,
    //             password: $password,
    //             phone: $phone,
    //             birthdate: $birthdate,
    //             fav_sport: $fav_sport,
    //             profilePic: $profilePic,
    //             country: $country
    //         ),{
    //             token
    //         }
    //     }`, 
    //     {
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //         password: password,
    //         phone: phone,
    //         birthdate: birthdate,
    //         fav_sport: fav_sport,
    //         profilePic: profilePic === null ? "" : profilePic,
    //         country: country,
    //     }
    // )
};

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
            country: `{"callingCode": [
                "33"
              ],
              "cca2": "FR",
              "currency": [
                "EUR"
              ],
              "flag": "flag-fr",
              "name": "France",
              "region": "Europe",
              "subregion": "Western Europe"
            }`,
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
            friends: [
                {
                    id: 1,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                },
                {
                    id: 2,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                }
            ]
        }
    })
}

/**
 * fetch user by firstname/lastname
 * 
 * @param {string} value lastname, firstname value
 * @param {number} offset for results
 */
export const fetchUsersByName = (value, offset) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return [
            {
                id: 1,
                firstname: "Ta",
                lastname: "gueule",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                friends: [{
                    id: 1,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                },
                {
                    id: 2,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                }],
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
                    }]
                }],
                groups: [{
                    id: 1,
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
                    }]
                }]
            },
            {
                id: 2,
                firstname: "yooo",
                lastname: "efgzesrgr",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                friends: [{
                    id: 1,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                }],
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
                    }]
                }],
                groups: [{
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
                    }]
                }]
            }
        ]
    })
}

/**
 * fetch connected user
 * 
 * @returns 
 */
export const fetchConnectedUser = () => {
    let myId = 2; ///TODO replace with real connected user id
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {
            id: 2,
            fav_sport: 1,
            firstname: "Lucas",
            lastname: "Estrade",
            profilePic: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
            friends: [{
                id: 1,
                firstname: "eofj",
                lastname: "pekjifoe",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            },
            {
                id: 2,
                firstname: "brulux",
                lastname: "joooe",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
            }],
            bookmarks: [
                {
                    id: 6,
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
                    roles: [{
                        id: 1,
                        name: "le rooooole",
                        rights: [{
                            id: 1
                        },
                        {
                            id: 3
                        }]
                    }],
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
                            id: 1,
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
                    }]
                },
                {
                    id: 8,
                    name: "l'event 5",
                    description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
                    sportId: 2,
                    postalCode: 93340,
                    owner: {
                        id: 2
                    },
                    location: {
                        latitude: 48.90049103281167, 
                        longitude: 3.510714120997393
                    },
                    roles: [{
                        id: 1,
                        name: "le rooooole",
                        rights: [{
                            id: 1
                        },
                        {
                            id: 3
                        }]
                    }],
                    address: "84 ta mere road",
                    startHour: "2021-01-01 22:30:00",
                    endHour: "2021-01-01 23:30:00",
                    date: "2021-05-19 00:00:00",
                    users: [{
                        id: 2,
                        firstname: "Ta",
                        lastname: "gueule",
                        src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                        roles: [{
                            id: 2,
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
                    }]
                }
            ]
        }
    })
}