import AsyncStorage from '@react-native-async-storage/async-storage';
import { req } from './apiCall';
import gql from 'graphql-tag';

/**
 * fetch my groups by id
 * 
 * @param {number} id group id  
 * @returns 
 */
export const fetchById = (id) => {
    return req(
        'query',
        gql`query($id: ID){
            group(
                where: {
                    id: $id
                }
            ),{
                id,
                name,
                description,
                owner{
                    id
                },
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
 * update group
 * 
 * @param {string} id group id to update
 * @param {object} datas datas to update
 */
 export const update = (id, datas) => {
    return req(
        'mutation',
        gql`mutation(
            $id: ID, 
            $name: String,
            $description: String){
            updateGroup(
                data: {
                    name: $name,
                    description: $description
                },
                where: {
                    id: $id
                }
            ),{
                id, 
                name,
                description,
                owner{
                    id
                },
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
            id: id, 
            name: datas.name,
            description: datas.description
        },
        true
    )
}

/**
 * create group
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
                $description: String){
                createGroup(
                    data: {
                        owner: {
                            connect: {
                                id: $owner
                            }
                        },
                        name: $name,
                        description: $description
                    }
                ),{
                    id
                }
            }`, 
            {
                owner: userId, 
                name: datas.name,
                description: datas.description
            },
            true
        )
    })
}

/**
 * remove an user from a group
 * 
 * @param {*} userId user id to remove from a group
 * @param {*} groupId group id
 */
export const removeUser = (userId, groupId) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {isError: true}
    })
}

/**
 * delete a group by id
 * 
 * @param {string} id group id to delete
 */
export const deleteById = (id) => {
    return req(
        'mutation',
        gql`mutation($id: ID){
            deleteGroup(
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