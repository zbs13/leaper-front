/**
 * create a role
 * 
 * @param {boolean} isEvent is an event's role
 * @param {string} geId group/event id
 * @param {object} role role object => name, rights (format -> [1,2...])
 * @returns 
 */
export const createRole = (isEvent, geId, role) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {error: true}
    })
}

/**
 * update a role
 * 
 * @param {boolean} isEvent is an event's role
 * @param {string} geId group/event id
 * @param {object} role role object => id, name, rights (format -> [1,2...])
 * @returns 
 */
 export const updateRole = (isEvent, geId, role) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {error: true}
    })
}

/**
 * delete a role by id
 * 
 * @param {string} id role id to delete
 * @returns 
 */
export const deleteRole = (id) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {error: true}
    })
}

/**
 * add a role to an user
 * 
 * @param {string} roleId role to add to user
 * @param {string} userId user id
 */
export const addRoleToUser = (roleId, userId) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {error: true}
    })
}

/**
 * remove user role
 * 
 * @param {string} roleId role id to remove from user
 * @param {string} userId user id
 */
export const removeUserRole = (roleId, userId) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {error: true}
    })
}