export const initialState = {
    user: {},
    connectedUser: {
        id: 2,
        src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
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
        }],
        bookmarks: [
            {
                id: 6,
                name: "l'event 3",
                description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
                sportId: 2,
                postalCode: 93340,
                owner: {
                    id: 2
                },
                location: {
                    latitude: 48.90049103281167, 
                    longitude: 2.510714120997393
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
                address: "85 ter boulevard de l'ouest, 93340 Le Raincy",
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
                }]
            },
            {
                id: 8,
                name: "l'event 5",
                description: "la descrip  lf,jekfjekfjf ozejf oezerko ozej oezj eofj eo fjez fjz fjzepo fjezop fjezfop jezof pezjf oezjfoezjf ozejf oezj foze fjozefj zepjfezpf jezp fejf pejpi",
                sportId: 2,
                postalCode: 93340,
                owner: {
                    id: 2
                },
                location: {
                    latitude: 48.90049103281167, 
                    longitude: 3.510714120997393
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
                address: "84 ta mere road",
                startHour: "2021-01-01 22:30:00",
                endHour: "2021-01-01 23:30:00",
                date: "2021-05-19 00:00:00",
                users: [{
                    id: 2,
                    firstname: "Ta",
                    lastname: "gueule",
                    src: "https://media.discordapp.net/attachments/500026022150930443/822075080162934844/image0.jpg?width=457&height=609",
                    roles: [{
                        id: 2,
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
                }]
            }
        ]
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
  