import { req } from './apiCall';
import gql from 'graphql-tag';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import RolesContext from '../rolesContext';

/**
 * create a role
 * 
 * @param {boolean} isEvent is an event's role
 * @param {string} geId group/event id
 * @param {object} role role object => name, rights (format -> [1,2...])
 * @returns 
 */
export const createRole = (isEvent, geId, role) => {
    let mutation = {
        mutation: {
            createRole: {
                __args: {
                    data: {
                        name: role.name,
                        [isEvent ? "event" : "group"]: {
                            connect: {
                                id: geId
                            }
                        },
                        rights: {
                            connect: [
                                ...role.rights.map(right => ({id: right}))
                            ]
                        }
                    }
                },
                id: true
            }
        }
    };

    const graphql_mutation = jsonToGraphQLQuery(mutation, { pretty: true });

    return req(
        'mutation',
        gql`${graphql_mutation}`,
        null,
        true
    );
}

/**
 * update a role
 * 
 * @param {string} roleId role id to update
 * @param {object} role role object => id, name, rights (format -> [1,2...])
 * @returns 
 */
export const updateRole = (roleId, role) => {
    let mutation = {
        mutation: {
            updateRole: {
                __args: {
                    data: {
                        name: role.name,
                        rights: {
                            set: [
                                ...role.rights.map(right => ({id: right}))
                            ]
                        }
                    },
                    where: {
                        id: roleId
                    }
                },
                id: true
            }
        }
    };

    const graphql_mutation = jsonToGraphQLQuery(mutation, { pretty: true });
    
    return req(
        'mutation',
        gql`${graphql_mutation}`,
        null,
        true
    );
}

/**
 * delete a role by id
 * 
 * @param {string} id role id to delete
 * @returns 
 */
export const deleteRole = (id) => {
    return req(
        'mutation',
        gql`mutation($roleId: ID){
            deleteRole(
                where: {
                    id: $roleId
                }
            ),{
                id
            }
        }`, 
        {
            roleId: id,
        },
        true
    )
}

/**
 * add a role to an user
 * 
 * @param {string} roleId role to add to user
 * @param {string} userId user id
 */
export const addRoleToUser = (roleId, userId) => {
    return req(
        'mutation',
        gql`mutation($roleId: ID!, $userId: ID!){
            addUsersToRole(
                idRole: $roleId,
                users: [
                    {id: $userId}
                ]
            ),{
                id
            }
        }`, 
        {
            roleId: roleId,
            userId: userId
        },
        true
    )
}

/**
 * remove user role
 * 
 * @param {string} roleId role id to remove from user
 * @param {string} userId user id
 */
export const removeUserRole = (roleId, userId) => {
    return req(
        'mutation',
        gql`mutation($roleId: ID!, $userId: ID!){
            removeUsersToRole(
                idRole: $roleId,
                users: [
                    {id: $userId}
                ]
            ),{
                id
            }
        }`, 
        {
            roleId: roleId,
            userId: userId
        },
        true
    )
}