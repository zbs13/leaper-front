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