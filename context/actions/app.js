/**
 * fetch user paramters
 * @returns 
 */
export const fetchUserParameters = () => {
    return fetch("https://sdgdfghrdh.fr").then().catch(() => {
        return "failed"
    });
}

/**
 * update user parameters
 * @returns 
 */
export const updateUserParameters = () => {
    return {
        lang: "en"
    }
}