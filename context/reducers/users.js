export const initialState = {
    user: {},
    connectedUser: {
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
        }]
    }
};
  
  /**
   * action = {type: String, payload: any}
   */
  export const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload
            }
        case "UPDATE_CONNECTED_USER":
            return {
                ...state,
                connectedUser: action.payload
            }
        default:
            return state;
    }
  };
  