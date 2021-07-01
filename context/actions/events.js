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
                    first: global.MAX_RESULT_PER_LOADED_PAGE + 2,
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
        }
    )
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
    return req(
        'mutation',
        gql`mutation($idEvent: ID!, $userId: ID!){
            removeUsersToEvent(
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

/**
 * delete an event by id
 * 
 * @param {string} id event id to delete
 */
export const deleteById = (id) => {
    return req(
        'mutation',
        gql`mutation($id: ID){
            deleteEvent(
                where: {
                    id: $id
                }
            ),{
                id
            }
        }`, 
        {
            id: id,
        },
        true
    )
}