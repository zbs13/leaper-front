import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import t from '../../providers/lang/translations';

export async function req(type, req, vars = null, waitMessage = null, needAuth = false, callback = null){
    
    if(type === 'subscription'){
        const httpLink = new HttpLink({
            // You should use an absolute URL here
            uri: provider.url.GRAPHQL,
        })

        // Create the subscription websocket link
        const wsLink = new WebSocketLink({
            uri: provider.url.WEBSOCKET_GRAPHQL,
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
                Authorization: await AsyncStorage.getItem("api_token")
            },
        } : null;

        const graphQLClient = new ApolloClient({
            link: new HttpLink({
                uri: provider.url.GRAPHQL,
                ...options
            }),
            cache: new InMemoryCache(),
        });
        
        let waitPopupId;
        if(waitMessage !== null){
            

        }

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
                if(callback !== null)
                    return callback(res.data);
            }).catch(error => {
                //console.log(error);
                let jsonStr = JSON.stringify(error, undefined, 2);
                let errorCode = JSON.parse(jsonStr).response.errors[0].code || null;
                switch(errorCode){
                    case 3010:
                        return {isError: true, type: "user"}
                    default:
                        return {isError: true, type: "global"}
                }
            });
    }
}

export function response(data, callback){
    if(typeof data.isError !== "undefined"){
        if(data.isError){
            return data;
        }
    }

    callback(data);
    return data;
}

export function manageResponseUI(data, lang, callbackSuccess, callbackError){
    if(typeof data.isError !== "undefined"){
        let message;
        switch(data.type){
            case "user":
                message = t(lang).USER_ALREADY_EXISTS;
                break;
            default:
                message = t(lang).ERROR_API;
        }
        callbackError({
            type: "error",
            message: message
        })
    }else{
        callbackSuccess(data);
    }
}