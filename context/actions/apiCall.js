import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import t from '../../providers/lang/translations';
import global from '../../providers/global';
import * as SecureStore from 'expo-secure-store';

/**
 * main graphql request method
 * 
 * @param {string} type request method => subscription, query, mutation
 * @param {*} req graphql request
 * @param {object|null} vars request variables
 * @param {boolean} needAuth is beiing authentificated needed for request
 * @param {boolean} multiple multiple queries in one request
 * @returns 
 */
 export async function req(type, req, vars = null, needAuth = false, multiple = false){
    
    if(type === 'subscription'){
        const httpLink = new HttpLink({
            // You should use an absolute URL here
            uri: global.api.API_ENDPOINT,
        })

        // Create the subscription websocket link
        const wsLink = new WebSocketLink({
            uri: global.api.WS_API_ENDPOINT,
            options: {
                reconnect: true,
            },
        })
        
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
            // split based on operation type
            ({ query }) => {
            const definition = getMainDefinition(query)
            return definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            },
            wsLink,
            httpLink
        )
        
        // Create the apollo client
        const graphQLClient = new ApolloClient({
            link,
            cache: new InMemoryCache(),
            connectToDevTools: true,
        })

        return queryDef = graphQLClient.subscribe({
            query: req,
            variables: vars
        })
    }else{
        let options = {
            headers: {}
        };

        needAuth ? options = {
            headers: {
                Authorization: await SecureStore.getItemAsync("token")
            },
        } : null;

        const graphQLClient = new ApolloClient({
            link: new HttpLink({
                uri: global.api.API_ENDPOINT,
                ...options
            }),
            cache: new InMemoryCache(),
        });

        let queryDef;
        switch(type){
            case 'query':
                queryDef = graphQLClient.query({
                    query: req,
                    variables: vars
                })
                break;
            case 'mutation':
                queryDef = graphQLClient.mutate({
                    mutation: req,
                    variables: vars
                })
                break;
                
        }

        return queryDef
            .then(function(res){
                if(multiple) return res.data;
                let firstProp;
                for(let key in res.data) {
                    if(res.data.hasOwnProperty(key)) {
                        firstProp = key;
                        break;
                    }
                }
                return res.data[firstProp];
            }).catch(error => {
                console.log(error);
                return {isError: true, type: "global"};
                let jsonStr = JSON.stringify(error, undefined, 2);
                let errorCode = JSON.parse(jsonStr).response.errors[0].code || null;
                switch(errorCode){
                    case 3010:
                        return {isError: true, type: "user"};
                    default:
                        return {isError: true, type: "global"};
                }
            });
    }
}

/**
 * return result or error according to response
 * 
 * @param {object} data response to check
 * @param {function|null} callback function called after success rendering
 * @returns {object} error or response
 */
export function response(data, callback = null){
    if(typeof data.isError !== "undefined"){
        if(data.isError){
            return data;
        }
    }

    callback !== null && callback(data);
    return data;
}

/**
 * manage reponse on UI according to response method return
 * 
 * @param {object} data response to check 
 * @param {string} lang lang for response message translation
 * @param {function} callbackSuccess function called if success
 * @param {function} callbackError function called if error
 */
export function manageResponseUI(data, lang, callbackSuccess, callbackError){
    if(typeof data.isError !== "undefined"){
        let message;
        switch(data.type){
            case "user":
                message = t(lang).USER_ALREADY_EXISTS;
                break;
            default:
                message = t(lang).errors.ERROR_API;
        }
        callbackError({
            type: "error",
            message: message
        })
    }else{
        callbackSuccess(data);
    }
}