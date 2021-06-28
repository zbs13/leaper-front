import { req } from './apiCall';
import gql from 'graphql-tag';
import global from '../../providers/global';

/**
 * fetch global
 * 
 * @param {object} search search value
 * @param {number} offsetEvents offset events for search
 * @param {number} offsetGroups offset groups for search
 * @returns 
 */
export const fetchGlobal = (search, offsetEvents, offsetGroups) => {
    return req(
        'query',
        gql`query(
                $search: String,
                $offsetEvents: Int,
                $offsetGroups: Int,
                $first: Int
            ){
            events(
                where: {
                    OR: [
                        {name_contains: $search},
                        {description_contains: $search}
                    ]
                },
                first: $first,
                skip: $offsetEvents
            ),{
                id,
                name,
                owner{
                    id
                },
                description,
                sportId,
                users{
                    id
                }
            },
            groups(
                where: {
                    OR: [
                        {name_contains: $search},
                        {description_contains: $search}
                    ]
                },
                first: $first,
                skip: $offsetGroups
            ),{
                id,
                name,
                owner{
                    id
                },
                description,
                users{
                    id
                }
            }
        }`, 
        {
            search: search,
            offsetEvents: offsetEvents,
            offsetGroups: offsetGroups,
            first: global.MAX_RESULT_PER_LOADED_PAGE + 2
        },
        true,
        true
    )
}