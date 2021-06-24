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
 * fetch messages in group
 * 
 * @param {number} id group id 
 * @param {number} offset offset for getting results
 * @returns 
 */
 export const fetchMessages = (id, offset) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {

        if(offset == 40){
            return [{
                id: 41,
                content: "lets gooooo",
                attachment: {},
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2020-04-28 10:03:54"
            },{
                id: 42,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            }
            ]
        }

        if(offset == 20){
            return [{
                id: 21,
                content: "",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "image",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/830803906027454514/1585832659398.png"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2020-04-28 10:03:54"
            },{
                id: 22,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 23,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 24,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 25,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 26,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 27,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 28,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 29,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 30,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 31,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 32,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 33,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 34,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 35,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 36,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 37,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 38,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },{
                id: 39,
                content: "ta mere la pute 2",
                attachment: {
                    size: 11000,
                    name: "le mega file",
                    type: "video",
                    uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
                },
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            },
            {
                id: 40,
                content: "rooooh",
                attachment: {},
                sentBy: {
                    id: 1,
                    firstname: "Lucas",
                    lastname: "Estrade",
                    username: "lucasestrade",
                    profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
                },
                date: "2021-03-12 21:03:54"
            }]
        }

        return [{
            id: 1,
            content: "",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/830803906027454514/1585832659398.png"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2020-04-28 10:03:54"
        },{
            id: 2,
            content: "ta mere la pute 2",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "video",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 3,
            content: "ta mere la pute",
            attachment: {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://media.giphy.com/media/l396Uasr95XqhSFJm/giphy.gif"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 4,
            content: "voila le pdf",
            attachment: {
                size: 51422,
                name: "le pdf ifjie jfeijfi ejfiej feij feif jeifjeifjeiiiie fj i",
                type: "pdf",
                uri: "https://www.tesla.com/sites/default/files/model_3_owners_manual_north_america_fr_ca.pdf"
            },
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 5,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 6,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 7,
            content: "va voir ici https://www.youtube.com/watch?v=SDdfIqJLrq4&t=2735s tu verra",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 8,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 9,
            content: `tema le bail     
            
            https://wallstreetenglish.ch/blog/fr/grammaire-anglaise/date#:~:text=En%20anglais%20britannique%20le%20format,%3A%20jour%20%2F%20mois%20%2F%20ann%C3%A9e.`,
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-03-12 21:03:54"
        },{
            id: 10,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 1,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-27 04:03:54"
        },{
            id: 11,
            content: "ta mere la pute pkeeozg jkeozg jrog jri gjrig jrigjeripog jerig jerig jrg irej iorj giorej gior gjrei gjrei gjrig jri gjri gjri fle plf pel fpel fpefl pef lep flepl fpezl fpelf epflez^plzplgplgprkgpok oko kgork gork gork",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 14:03:54"
        },{
            id: 12,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 13,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 14,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 15,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 16,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 17,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 18,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 19,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        },{
            id: 20,
            content: "non",
            attachment: {},
            sentBy: {
                id: 2,
                firstname: "Lucas",
                lastname: "Estrade",
                username: "lucasestrade",
                profilePic: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            date: "2021-04-28 10:03:54"
        }]
    })
}

/**
 * fetch shared content in group
 * 
 * @param {number} id group id 
 * @param {number} offset offset for getting results
 * @returns 
 */
 export const fetchAllSharedContent = (id, offset) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return [
            {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/828685727218925588/Roti-de-cotes-Angus-Maison-Lascours-big.png"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "image",
                uri: "https://media.giphy.com/media/l396Uasr95XqhSFJm/giphy.gif"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "pdf",
                uri: "https://www.tesla.com/sites/default/files/model_3_owners_manual_north_america_fr_ca.pdf"
            },
            {
                size: 11000,
                name: "le mega file",
                type: "video",
                uri: "https://cdn.discordapp.com/attachments/500026022150930443/811957082537459714/video0.mp4"
            }
        ]
    })
}

/**
 * update group
 * 
 * @param {string} id group id to update
 * @param {object} datas datas to update
 */
 export const update = (id, datas) => {
     console.log(datas);
     console.log(id);
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
 * send a message
 * 
 * @param {string} userId user id (owner of message)
 * @param {string} groupId group id
 * @param {string} value text value 
 * @param {object} attachment message attachment => 
 *                                        if image/video : height, type, uri, width 
 *                                        if file        : name, size, type, uri
 */
export const sendMessage = (userId, groupId, value, attachment) => {
    return fetch("https://sdgdfghrdh.fr").then(() => {
        return {
            id: 2
        }
    }).catch(() => {
        return {};
        return {isError: true}
    })
}