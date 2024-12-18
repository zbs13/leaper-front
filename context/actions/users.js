import { req } from './apiCall';
import gql from 'graphql-tag';
import global from '../../providers/global';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import * as SecureStore from 'expo-secure-store';

export const login = (mail, password) => {
    return req(
        'mutation',
        gql`mutation($mail: String!, $password: String!){
            login(
                email: $mail,
                password: $password
            ),{
                token,
                user{
                    id,
                    firstname,
                    lastname,
                    email,
                    phone,
                    is_verified,
                    is_ban,
                    create_at,
                    groups{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        description,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        },
                        users{
                            id
                        }
                    },
                    groupsOwner{
                        id,
                        name,
                        description
                    },
                    events{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        description,
                        start_hour,
                        end_hour,
                        date,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        },
                        users{
                            id
                        },
                        sportId
                    },
                    eventsOwner{
                        id,
                        name,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        description,
                        start_hour,
                        end_hour,
                        date
                    },
                    roles{
                        id,
                        name,
                        rights{
                            id,
                            name
                        },
                        group{
                            id,
                            name,
                            description
                        },
                        event{
                            id,
                            name,
                            address,
                            location{
                                latitude,
                                longitude
                            },
                            description,
                            start_hour,
                            end_hour,
                            date
                        }
                    },
                    is_notif_accept,
                    is_notif_message_group,
                    is_notif_message_event,
                    is_notif_add_group,
                    is_notif_add_event,
                    is_notif_add_friend,
                    is_remind_event,
                    birthdate,
                    fav_sport,
                    country,
                    friends{
                        id,
                        firstname,
                        lastname,
                    },
                    bookmarks{
                        id,
                        name,
                        description,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        users{
                            id
                        }
                    }
                }
            }
        }`, 
        {
            mail: mail,
            password: password
        }
    )
}

/**
 * create user profile
 * 
 * @param {string} firstname user firstname
 * @param {string} lastname user lastname
 * @param {string} email user email
 * @param {string} password user password
 * @param {string} phone user phone
 * @param {string} country user phone country
 * @param {string} birthdate user birthdate
 * @param {number} fav_sport user favorite sport
 */
 export const signup = ({firstname, lastname, email, password, phone, country, birthdate, fav_sport}) => {
    return req(
        'mutation',
        gql`mutation( 
            $firstname: String!, 
            $lastname: String!, 
            $email: String!, 
            $password: String!, 
            $phone: String!, 
            $birthdate: DateTime!, 
            $fav_sport: Int!, 
            $profilePic: String!, 
            $country: String!){
            signup(
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password,
                phone: $phone,
                birthdate: $birthdate,
                fav_sport: $fav_sport,
                profilePic: $profilePic,
                country: $country
            ),{
                user{
                    id
                }
            }
        }`, 
        {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            birthdate: birthdate,
            fav_sport: fav_sport,
            profilePic: "",
            country: country,
        }
    )
};

/**
 * edit user profile
 * 
 * @param {string} firstname user firstname
 * @param {string} lastname user lastname
 * @param {string} email user email
 * @param {string} phone user phone
 * @param {string} country user phone country
 * @param {string} birthdate user birthdate
 * @param {number} fav_sport user favorite sport
 */
export const editProfile = ({firstname, lastname, email, phone, country, birthdate, fav_sport}) => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'mutation',
            gql`mutation(
                $userId: ID,
                $firstname: String,
                $lastname: String,
                $email: String,
                $phone: String,
                $birthdate: DateTime,
                $fav_sport: Int,
                $country: String
                ){
                updateUser(
                    data: {
                        firstname: $firstname,
                        lastname: $lastname,
                        email: $email,
                        phone: $phone,
                        birthdate: $birthdate,
                        fav_sport: $fav_sport,
                        country: $country
                    },
                    where: {
                        id: $userId
                    }
                ),{
                    id,
                    firstname,
                    lastname,
                    email,
                    phone,
                    birthdate,
                    fav_sport,
                    country
                }
            }`, 
            {
                userId: userId,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                birthdate: birthdate,
                fav_sport: fav_sport,
                country: country
            },
            true
        )
    })
};

/**
 * get user datas by id
 * 
 * @param {string} id user id
 * @returns 
 */
export const fetchUserById = (id) => {
    return req(
        'query',
        gql`query($id: ID){
            user(
                where: {
                    id: $id
                }
            ),{
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
                    },
                    sportId
                },
                friends{
                    id
                }
            }
        }`,
        {
            id: id
        }
    );
}

/**
 * fetch user by firstname/lastname
 * 
 * @param {string} value lastname, firstname value
 * @param {number} offset for results
 */
export const fetchUsersByName = (value, offset) => {
    return req(
        'query',
        gql`query($value: String, $offset: Int, $max: Int){
            users(
                where: {
                    OR: [
                        {firstname_contains: $value},
                        {lastname_contains: $value}
                    ]
                },
                first: $max,
                skip: $offset
            ),{
                id,
                firstname,
                lastname,
                roles{
                    id,
                    name,
                    group{
                        id
                    },
                    event{
                        id
                    }
                },
                events{
                    id
                },
                groups{
                    id
                },
                friends{
                    id
                }
            }
        }`,
        {
            value: value,
            offset: offset,
            max: global.MAX_RESULT_PER_LOADED_PAGE + 2
        },
        true
    );
}

/**
 * fetch connected user
 * 
 * @returns 
 */
export const fetchConnectedUser = () => {
    return SecureStore.getItemAsync("token").then(token => {
        return req(
            'mutation',
            gql`mutation($token: String!){
                verifToken(
                    token: $token,
                ),{
                    isConnected
                }
            }`,{
                token: token
            }
        ).then(result => {
            if(result.isConnected){
                return SecureStore.getItemAsync("connectedUserId").then(connectedUserId => {
                    return req(
                        'query',
                        gql`query($id: ID){
                            user(
                                where: {
                                    id: $id
                                }
                            ),{
                                id,
                                firstname,
                                lastname,
                                email,
                                phone,
                                is_verified,
                                is_ban,
                                create_at,
                                groups{
                                    id,
                                    owner{
                                        id
                                        firstname,
                                        lastname
                                    },
                                    name,
                                    description,
                                    roles{
                                        id,
                                        name,
                                        rights{
                                            id,
                                            name
                                        }
                                    },
                                    users{
                                        id
                                    }
                                },
                                groupsOwner{
                                    id,
                                    name,
                                    description
                                },
                                events{
                                    id,
                                    owner{
                                        id
                                        firstname,
                                        lastname
                                    },
                                    name,
                                    address,
                                    location{
                                        latitude,
                                        longitude
                                    },
                                    description,
                                    start_hour,
                                    end_hour,
                                    date,
                                    roles{
                                        id,
                                        name,
                                        rights{
                                            id,
                                            name
                                        }
                                    },
                                    users{
                                        id
                                    },
                                    sportId
                                },
                                eventsOwner{
                                    id,
                                    name,
                                    address,
                                    location{
                                        latitude,
                                        longitude
                                    },
                                    description,
                                    start_hour,
                                    end_hour,
                                    date
                                },
                                roles{
                                    id,
                                    name,
                                    rights{
                                        id,
                                        name
                                    },
                                    group{
                                        id,
                                        name,
                                        description
                                    },
                                    event{
                                        id,
                                        name,
                                        address,
                                        location{
                                            latitude,
                                            longitude
                                        },
                                        description,
                                        start_hour,
                                        end_hour,
                                        date
                                    }
                                },
                                is_notif_accept,
                                is_notif_message_group,
                                is_notif_message_event,
                                is_notif_add_group,
                                is_notif_add_event,
                                is_notif_add_friend,
                                is_remind_event,
                                birthdate,
                                fav_sport,
                                country,
                                friends{
                                    id,
                                    firstname,
                                    lastname,
                                },
                                bookmarks{
                                    id,
                                    name,
                                    description,
                                    address,
                                    location{
                                        latitude,
                                        longitude
                                    },
                                    users{
                                        id
                                    }
                                }
                            }
                        }`, 
                        {
                            id: connectedUserId,
                        }
                    )
                })
            }

            return {isError: true, type: "global"}
        })
    });
}

/**
 * add bookmark
 * 
 * @param {string} id event id
 */
 export const addBookmark = (id) => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'mutation',
            gql`mutation($userId: ID, $eventId: ID){
                updateUser(
                    data: {
                        bookmarks: {
                            connect: {
                                id: $eventId
                            }
                        }
                    },
                    where: {
                        id: $userId
                    }
                ),{
                    bookmarks{
                        id,
                        name,
                        description,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        users{
                            id
                        }
                    }
                }
            }`, 
            {
                userId: userId,
                eventId: id
            },
            true
        )
    })
}

/**
 * remove bookmark
 * 
 * @param {string} id event id
 */
 export const removeBookmark = (id) => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'mutation',
            gql`mutation($userId: ID, $eventId: ID){
                updateUser(
                    data: {
                        bookmarks: {
                            disconnect: {
                                id: $eventId
                            }
                        }
                    },
                    where: {
                        id: $userId
                    }
                ),{
                    bookmarks{
                        id,
                        name,
                        description,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        users{
                            id
                        }
                    }
                }
            }`, 
            {
                userId: userId,
                eventId: id
            },
            true
        )
    })
}

/**
 * add friend
 * 
 * @param {string} id friend id
 */
 export const addFriend = (id) => {
    return req(
        'mutation',
        gql`mutation($friendId: ID!){
            addFriendsToUser(
                users: [
                    {
                        id: $friendId
                    }
                ]
            ),{
                id
            }
        }`, 
        {
            friendId: id
        },
        true
    )
}

/**
 * delete friend
 * 
 * @param {string} id friend id
 */
 export const deleteFriend = (id) => {
    return req(
        'mutation',
        gql`mutation($friendId: ID!){
            removeFriendsToUser(
                users: [
                    {
                        id: $friendId
                    }
                ]
            ),{
                id
            }
        }`, 
        {
            friendId: id
        },
        true
    )
}

/**
 * fetch connected user groups
 * 
 * @returns 
 */
export const fetchConnectedUserGroups = () => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'query',
            gql`query($userId: ID){
                user(
                    where: {
                        id: $userId
                    }
                ),{
                    groups{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        description,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        },
                        users{
                            id
                        }
                    }
                }
            }`, 
            {
                userId: userId,
            },
            true
        )
    })
}

/**
 * fetch connected user events
 * 
 * @returns 
 */
 export const fetchConnectedUserEvents = () => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'query',
            gql`query($userId: ID){
                user(
                    where: {
                        id: $userId
                    }
                ),{
                    events{
                        id,
                        owner{
                            id
                            firstname,
                            lastname
                        },
                        name,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        description,
                        start_hour,
                        end_hour,
                        date,
                        roles{
                            id,
                            name,
                            rights{
                                id,
                                name
                            }
                        },
                        users{
                            id
                        },
                        sportId
                    }
                }
            }`, 
            {
                userId: userId,
            },
            true
        )
    })
}

/**
 * fetch connected user friends
 * 
 * @returns 
 */
 export const fetchConnectedUserFriends = () => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'query',
            gql`query($userId: ID){
                user(
                    where: {
                        id: $userId
                    }
                ),{
                    friends{
                        id,
                        firstname,
                        lastname,
                    }
                }
            }`, 
            {
                userId: userId,
            },
            true
        )
    })
}

/**
 * fetch connected user bookmarks
 * 
 * @returns 
 */
 export const fetchConnectedUserBookmarks = () => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'query',
            gql`query($userId: ID){
                user(
                    where: {
                        id: $userId
                    }
                ),{
                    bookmarks{
                        id,
                        name,
                        description,
                        address,
                        location{
                            latitude,
                            longitude
                        },
                        users{
                            id
                        }
                    }
                }
            }`, 
            {
                userId: userId,
            },
            true
        )
    })
}

/**
 * update user password
 * 
 * @param {string} oldPassword old password
 * @param {string} newPassword new password
 */
 export const updateUserPassword = (oldPassword, newPassword) => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        return req(
            'mutation',
            gql`mutation($userId: ID, $password: String!, $oldPassword: String!){
                updatePassword(
                    password: $oldPassword,
                    newPassword: $password,
                    where: {
                        id: $userId
                    }
                ),{
                    isUpdated
                }
            }`, 
            {
                userId: userId,
                oldPassword: oldPassword,
                password: newPassword
            },
            true
        )
    })
}

/**
 * edit connected user notifications
 * 
 * @param {object} notification name and new value of notification
 */
 export const editConnectedUserNotification = (notification) => {
    return SecureStore.getItemAsync("connectedUserId").then(userId => {
        const notif = Object.keys(notification)[0];
        const mutation = {
            mutation: {
                updateUser: {
                    __args: {
                        where: {
                            id: userId
                        },
                        data: {
                            [notif]: notification[notif]
                        }
                    },
                    [notif]: true
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
    })
}

/**
 * add user to a group
 * 
 * @param {string} userId user id
 * @param {string} groupId group id
 * @returns 
 */
export const addUserToGroup = (userId, groupId) => {
    return req(
        'mutation',
        gql`mutation($groupId: ID!, $userId: ID!){
            addUsersToGroup(
                idGroup: $groupId,
                users: [
                    {id: $userId}
                ]
            ),{
                id
            }
        }`, 
        {
            userId: userId,
            groupId: groupId
        },
        true
    )
}

/**
 * add user to an event
 * 
 * @param {string} userId user id
 * @param {string} eventId event id
 * @returns 
 */
export const addUserToEvent = (userId, eventId) => {
    return req(
        'mutation',
        gql`mutation($eventId: ID!, $userId: ID!){
            addUsersToEvent(
                idEvent: $eventId,
                users: [
                    {id: $userId}
                ]
            ),{
                id
            }
        }`, 
        {
            userId: userId,
            eventId: eventId
        },
        true
    )
}