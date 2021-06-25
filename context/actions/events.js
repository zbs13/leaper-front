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
 * fetch events by id
 * 
 * @param {number} id event id 
 * @returns 
 */
export const fetchById = (id) => {  
    return req(
        'query',
        gql`query($id: ID){
            event(
                where: {
                    id: $id
                }
            ),{
                id,
                name,
                description,
                sportId,
                location{
                    latitude,
                    longitude
                }
                owner{
                    id
                },
                address,
                start_hour,
                end_hour,
                date,
                roles{
                    id,
                    name,
                    rights{
                        id
                    }
                },
                users{
                    id,
                    firstname,
                    lastname,
                    birthdate,
                    fav_sport,
                    create_at,
                    email,
                    country,
                    phone,
                    events{
                        id,
                        name,
                        owner{
                            id
                        },
                        description,
                        users{
                            id
                        }
                    },
                    friends{
                        id
                    },
                    roles{
                        id,
                        name,
                        group{
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
        }
    )
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
                size: "11000",
                name: "le mega file",
                contentType: "video/mp4",
                downloadUrl: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
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
                size: "11000",
                name: "le mega file",
                contentType: "video/mp4",
                downloadUrl: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
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
                size: "11000",
                name: "le mega file",
                contentType: "video/mp4",
                downloadUrl: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
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
                size: "11000",
                name: "le mega file",
                contentType: "image/png",
                downloadUrl: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            {
                size: "11000",
                name: "le mega file",
                contentType: "image/gif",
                downloadUrl: "https://media.giphy.com/media/l396Uasr95XqhSFJm/giphy.gif"
            },
            {
                size: "11000",
                name: "le mega file",
                contentType: "application/pdf",
                downloadUrl: "https://www.tesla.com/sites/default/files/model_3_owners_manual_north_america_fr_ca.pdf"
            },
            {
                size: "11000",
                name: "le mega file",
                contentType: "video/mp4",
                downloadUrl: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
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
    return req(
        'mutation',
        gql`mutation(
            $id: ID, 
            $name: String!,
            $description: String,
            $address: String,
            $latitude: Float,
            $longitude: Float,
            $start_hour: DateTime,
            $end_hour: DateTime,
            $date: DateTime,
            $sportId: Int
            ){
            updateEvent(
                data: {
                    name: $name,
                    description: $description,
                    address: $address,
                    location: {
                        create: {
                            latitude: $latitude,
                            longitude: $longitude
                        }
                    },
                    start_hour: $start_hour,
                    end_hour: $end_hour,
                    date: $date,
                    sportId: $sportId
                },
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
                    firstname,
                    lastname,
                    roles{
                        event{
                            id
                        },
                        rights{
                            id
                        }
                    }
                },
                roles{
                    id,
                    name,
                    rights{
                        id
                    }
                }
            }
        }`, 
        {
            id: id, 
            name: datas.name,
            description: datas.description,
            address: datas.address,
            latitude: datas.location.latitude,
            longitude: datas.location.longitude,
            start_hour: datas.startHour,
            end_hour: datas.endHour,
            date: datas.date,
            sportId: datas.sportId
        },
        true
    )
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