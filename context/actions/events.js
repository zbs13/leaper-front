import AsyncStorage from '@react-native-async-storage/async-storage';
import { req } from './apiCall';
import gql from 'graphql-tag';
import { toGQLDateTimeFormat } from '../../utils/utils';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import global from '../../providers/global';

/**
 * fetch my events by criterias
 * 
 * @param {object} criteria criterias
 * @returns 
 */
export const fetchByCriteria = (criteria) => {
    let searchValue = criteria.searchValue !== "" && criteria.searchValue !== null ? criteria.searchValue : null;
    let where = {
        sportId: criteria.criteria.sportId
    };

    if(criteria.criteria.place !== null) {
        where = {
            ...where,
            location_every: {
                AND: [
                    {latitude_gt: criteria.criteria.place.latitude - 0.1},
                    {latitude_lt: criteria.criteria.place.latitude + 0.1},
                    {longitude_gt: criteria.criteria.place.longitude - 0.1},
                    {longitude_lt: criteria.criteria.place.longitude + 0.1},
                ]
            }
        }
    }

    if(criteria.criteria.startDate !== null && criteria.criteria.endDate !== null) {
        where = {
            ...where,
            AND: [
                {date_gt: toGQLDateTimeFormat(criteria.criteria.startDate.dateString)},
                {date_lt: toGQLDateTimeFormat(criteria.criteria.endDate.dateString, 1)}
            ]
        }
    }

    if(searchValue !== null){
        where = {
            ...where,
            OR: [
                {description_contains: searchValue},
                {name_contains: searchValue}
            ]
        }
    }

    const query = {
        query: {
            events: {
                __args: {
                    where: where,
                    first: global.MAX_RESULT_PER_LOADED_PAGE + 2 ,
                    skip: criteria.criteria.offset
                },
                id: true,
                name: true,
                owner: {
                    id: true
                },
                sportId: true,
                description: true,
                users: {
                    id: true
                }
            }
        }
    };

    const graphql_query = jsonToGraphQLQuery(query, { pretty: true });

    return req(
        'query',
        gql`${graphql_query}`,
        null,
        true
    );
}

/**
 * fetch event details by id
 * 
 * @param {number} id event id 
 * @returns 
 */
export const fetchEventDetailsById = (id) => {
    return req(
        'query',
        gql`query($id: ID){
            event(
                where: {
                    id: $id
                }
            ),{
                id,
                location{
                    latitude,
                    longitude
                },
                name,
                address,
                description,
                start_hour,
                end_hour,
                date,
                sportId,
                owner{
                    id
                },
                users{
                    id,
                    roles{
                        event{
                            id
                        },
                        rights{
                            id
                        }
                    }
                }
            }
        }`, 
        {
            id: id
        },
        true
    ) 
}

/**
 * fetch events by id
 * 
 * @param {number} id event id 
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
            name: "l'event 3",
            description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
            sportId: 2,
            postalCode: 93340,
            owner: {
                id: 2
            },
            location: {
                latitude: 46.90049103281167, 
                longitude: 1.510714120997393
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
            address: "2 rue de ta mere",
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
            },{
                id: 3,
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
            },{
                id: 4,
                firstname: "ezf",
                lastname: "gueuffffffffffffffle",
                src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                roles: [{
                    id: 1,
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
            },{
                id: 6,
                firstname: "efsofgsdoàif",
                lastname: "gueuleds^pfgiosdàogisçoghiujhçg",
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
            },{
                id: 7,
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
            }],
            src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609"
        }
    })
}

/**
 * fetch messages in event
 * 
 * @param {number} id event id 
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
                uri: "https://tenor.com/byHW4.gif"
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
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 5,
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
        },]
    })
}

/**
 * fetch shared content in event
 * 
 * @param {number} id event id 
 * @param {number} offset offset for getting results
 * @returns 
 */
export const fetchAllSharedContent = (id, offset) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return [
            {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://media.giphy.com/media/l396Uasr95XqhSFJm/giphy.gif"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "pdf",
                uri: "https://www.tesla.com/sites/default/files/model_3_owners_manual_north_america_fr_ca.pdf"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "video",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
            }
        ]
    })
}

/**
 * update event
 * 
 * @param {string} id event id to update
 * @param {object} datas datas to update
 */
export const update = (id, datas) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {isError: true}
    })
}

/**
 * create event
 * 
 * @param {object} datas datas to update
 */
 export const create = (datas) => {
    return AsyncStorage.getItem("connectedUserId").then(userId => {
        return req(
            'mutation',
            gql`mutation(
                $owner: ID, 
                $name: String!,
                $address: String,
                $latitude: Float,
                $longitude: Float,
                $description: String,
                $startHour: DateTime,
                $endHour: DateTime,
                $date: DateTime,
                $sportId: Int){
                createEvent(
                    data: {
                        owner: {
                            connect: {
                                id: $owner
                            }
                        },
                        name: $name,
                        address: $address,
                        location: {
                            create: {
                                latitude: $latitude,
                                longitude: $longitude
                            }
                        },
                        description: $description,
                        start_hour: $startHour,
                        end_hour: $endHour,
                        date: $date,
                        sportId: $sportId
                    }
                ),{
                    id
                }
            }`, 
            {
                owner: userId, 
                name: datas.name,
                address: datas.address,
                latitude: datas.location.latitude,
                longitude: datas.location.longitude,
                description: datas.description,
                startHour: toGQLDateTimeFormat(datas.startHour),
                endHour: toGQLDateTimeFormat(datas.endHour),
                date: toGQLDateTimeFormat(datas.date),
                sportId: datas.sportId
            },
            true
        )
    })
}

/**
 * remove an user from an event
 * 
 * @param {*} userId user id to remove from an event
 * @param {*} eventId event id
 */
 export const removeUser = (userId, eventId) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {isError: true}
    })
}

/**
 * send a message
 * 
 * @param {string} userId user id (owner of message)
 * @param {string} eventId event id
 * @param {string} value text value 
 * @param {object} attachment message attachment => 
 *                                        if image/video : height, type, uri, width 
 *                                        if file        : name, size, type, uri
 */
 export const sendMessage = (userId, eventId, value, attachment) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {};
        return {isError: true}
    })
}

/**
 * add user to event
 * 
 * @param {string} eventId event id
 * @param {string} userId user id to add
 */
 export const addUserToEvent = (eventId, userId) => {
    return req(
        'mutation',
        gql`mutation($idEvent: ID, $userId: ID){
            addUsersToEvent(
                idEvent: $idEvent,
                users: [
                    {id: $userId}
                ]
            ),{
                id
            }
        }`, 
        {
            idEvent: eventId,
            userId: userId
        },
        true
    )
  }