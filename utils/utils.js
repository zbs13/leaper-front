import { format, isToday, parseISO, isYesterday, isBefore, addDays } from 'date-fns';
import t from '../providers/lang/translations';
import global from '../providers/global';
import _ from "lodash";

/**
 * generate an uniq id
 * @returns {string}
 */
export const randId = () => '_' + Math.random().toString(36).substr(2, 9);

/**
 * sort list sports by name => ex: listSport.sort(sortListSport)
 * @returns 
 */
export const sortListSport = (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)

/**
 * split url to remove params
 * 
 * @param {string} url url to split and dont have params 
 * @returns 
 */
export const urlNoParams = (url) => url.split('?')[0];

/**
 * split content type to get only the file type
 * 
 * @param {string} contentType content type
 * @returns 
 */
export const getTypeFromContentType = (contentType) => contentType.split('/')[1];

/**
 * extract exact file name from path
 * 
 * @param {string} path file path
 * @returns 
 */
export const getExactFileNameFromPath = (path) => {
    let splitted = path.split('/');
    return splitted[splitted.length - 1];
}

/**
 * create a text ellipse
 * 
 * @param {string} text value
 * @param {number} max max char before ellipsis 
 * @returns {string}
 */
export const ellipsisText = (text, max) => ((text || "").length > max) ? (((text).substring(0, max - 3)) + '...') : text

/**
 * return dates between two dates
 * 
 * @param {string} start format: yyyy-MM-dd +> ex : "2021-03-11"
 * @param {string} end format: yyyy-MM-dd => ex : "2021-03-15"
 * @returns {object} => ex : ["2021-03-12", "2021-03-13", "2021-03-14"]
 */
export const getDatesBetweenTwoDates = function(start, end) {
    for(var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1 )){
        let strDate = format(dt, 'yyyy-MM-dd');
        if(strDate !== start && strDate !== end){
            arr.push(strDate);
        }
    }
    return arr;
};

/**
 * return an uri's extension
 * 
 * @param {string} uri uri to get ext
 * @returns {string} extension
 */
 export const ext = function(uri) {
    let arr = uri.split(".");
    let extIdx = arr.length - 1;
    return arr[extIdx].toLowerCase();
};

/**
 * convert bytes to kbytes
 * 
 * @param {number} bytes bytes to convert
 * @returns {string} converted bytes to kBytes
 */
 export const convertBytesToKBytes = function(bytes) {
    return Math.round((bytes / 1000) * 100) / 100;
};

/**
 * format date for messages
 * 
 * @param {object} date message date to format
 * @param {string} lang lang for format
 * @returns {string} correct date format
 */
export const messageDateFormat = function(date, lang) {
    if(isToday(date)){
        return `${t(lang).datetime.AT_MAJ} ${t(lang).datetime.formats.hour(date)}`;
    }else if(isYesterday(date)){
        return `${t(lang).datetime.YESTERDAY_AT} ${t(lang).datetime.formats.hour(date)}`;
    }

    return `${t(lang).datetime.formats.date(format(date, "yyyy-MM-dd"))} ${t(lang).datetime.AT_MIN} ${t(lang).datetime.formats.hour(date)}`;
}

/**
 * check if value is an uri
 * 
 * @param {string} value value to check
 * @returns {boolean} true if value is an uri
 */
export const isUri = function(value){
    return value.match(global.validator.regex.URI);
}

/**
 * check if first hour argument is less than the second one
 * 
 * @param {string} lessValue value that should be less than the other
 * @param {string} greaterValue value that should be greater than the other
 * @return {boolean} true if lessValue is less than greaterValue
 */
export const lessThanHour = function(lessValue, greaterValue){
    let regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
    return parseInt(greaterValue .replace(regExp, "$1$2$3")) > parseInt(lessValue .replace(regExp, "$1$2$3"))
}

/**
 * check if first date argument is less than the second one
 * 
 * @param {string} lessValue value that should be less than the other
 * @param {string} greaterValue value that should be greater than the other
 * @return {boolean} true if lessValue is less than greaterValue
 */
 export const lessThanDate = function(lessValue, greaterValue){
    return isBefore(parseISO(lessValue), parseISO(greaterValue));
}

/**
 * get exact address (with google api) by latitude and longitude
 * 
 * @param {number} latitude latitude
 * @param {number} longitude longitude
 * @param {function} callback function called after end of promise
 */
export const getAddressByLatLng = function(latitude, longitude, callback){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${global.map.GOOGLE_MAP_API_KEY}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(function(res){
            if(res.results.length !== 0){
                callback(res.results[0].formatted_address);
            }
        })
        .catch(function(error){
            callback({error: true});
        })
}

/**
 * get latitude + longitude (with google api) by address
 * 
 * @param {string} address address
 * @param {function} callback function called after end of promise
 * @param {function} callbackNoResults function called when no results
 */
 export const getLatLngByAddress = function(address, callback, callbackNoResults = null){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${global.map.GOOGLE_MAP_API_KEY}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(function(res){
            if(res.results.length !== 0){
                callback({latitude: res.results[0].geometry.location.lat, longitude: res.results[0].geometry.location.lng});
            }else{
                callbackNoResults !== null && callbackNoResults();
            }
        })
        .catch(function(error){
            callback({error: true});
        })
}

/**
 * return sport object by its id
 * 
 * @param {string} lang lang for sport label
 * @param {number} id sport id to find
 * @returns 
 */
export const getSportById = function(lang, id){
    let sportList = global.listSports(lang);
    let sportIndex = sportList.findIndex(sport => sport.id === id);
    return sportList[sportIndex];
}

/**
 * check if user is a connected user's friend
 * 
 * @param {string} connectedUserId connected user id
 * @param {object} userFriends user friends
 * @returns 
 */
export const isMyFriend = function(connectedUserId, userFriends){
    return userFriends.findIndex((user) => user.id === connectedUserId) !== -1;
}

/**
 * check if connected user is group/event owner
 * 
 * @param {object} ge group/event object
 * @returns 
 */
 export const isGEOwner = function(connectedUserId, ge){
    return ge.owner.id === connectedUserId;
}

/**
 * check if user is in event/group
 * 
 * @param {object} userGE user groups/events
 * @param {string} geId group/event id to check 
 * @returns 
 */
export const isUserInEventGroup = (userGE, geId) => {
    return userGE.findIndex((ge) => ge.id === geId) !== -1;
}

/**
 * check if role has a specific right
 * 
 * @param {object} roleRights role rights
 * @param {string} rightId right to check
 * @returns 
 */
export const roleHasRight = (roleRights, rightId) => {
    return roleRights.findIndex(right => right.id == rightId) !== -1;
}

/**
 * sort my groups/events results by search value
 * 
 * @param {object} array my events/groups in array
 * @param {string} value search value
 * @return {object} sorted array
 */
export const sortMyGEBySearchCriteria = (array, value) => {
    let res = _.filter(array, function(item){
      return item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase())
    });
    return res.length !== 0 ? res : null;
}

/**
 * sort users results by search value
 * 
 * @param {object} array users in array
 * @param {string} value search value
 * @return {object} sorted array
 */
export const sortUsersSearchCriteria = (array, value) => {
    let res = _.filter(array, function(item){
      return item.firstname.toLowerCase().includes(value.toLowerCase()) || item.lastname.toLowerCase().includes(value.toLowerCase())
    });
    return res.length !== 0 ? res : null;
}

/**
 * sort sports results by search value
 * 
 * @param {object} array sports in array
 * @param {string} value search value
 * @return {object} sorted array
 */
 export const sortSportsSearchCriteria = (array, value) => {
    let res = _.filter(array, function(item){
      return item.name.toLowerCase().includes(value.toLowerCase())
    });
    return res.length !== 0 ? res : null;
}

/**
 * check if event is in connected user bookmarks
 * 
 * @param {object} userBookmarks user bookmarks
 * @param {*} eventId id of event to check
 * @returns 
 */
export const isInFav = (userBookmarks, eventId) => {
    return userBookmarks.findIndex((fav) => fav.id === eventId) !== -1;
}

/**
 * get file blob from uri
 * 
 * @param {string} uri file uri 
 * @param {function} callback function called to get blob
 */
export const blobFromUri = (uri, callback) => {
    fetch(uri).then(function(response){
        response.blob().then(function(blob){
            callback(blob);
        })
    });
}

/**
 * convert dateTime to graphQL date format => "2020-05-05 05:00:00" -> "2020-05-05T05:00:00Z"
 * 
 * @param {string} date datetime to convert
 * @param {number} daysToAdd days to add to date
 * @return {string} converted datetime
 */
export const toGQLDateTimeFormat = (date, daysToAdd = null) => {
    if(daysToAdd !== null){
        return addDays(parseISO(date), daysToAdd).toISOString();
    }
    return parseISO(date).toISOString();
}