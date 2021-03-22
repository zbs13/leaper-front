// export const fetchBoards = () =>
//   fetch("http://localhost:3002/boards").then((res) => res.json());
export const fetchUserParameters = () => {
    return fetch("https://sdgdfghrdh.fr").then().catch(() => {
        return "failed"
    });
    // return {
    //     lang: "en"
    // }
}

export const updateUserParameters = () => {
    return {
        lang: "en"
    }
}