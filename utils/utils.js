import { format, isToday, parseISO, isYesterday, isBefore } from 'date-fns';
import t from '../providers/lang/translations';
import global from '../providers/global';
import _ from "lodash";

/**
 * generate an uniq id
 * @returns {string}
 */
export const randId = () => '_' + Math.random().toString(36).substr(2, 9);

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
 * @param {string} date message date to format
 * @param {string} lang lang for format
 * @returns {string} correct date format
 */
export const messageDateFormat = function(date, lang) {
    let formDate = parseISO(date);
    if(isToday(formDate)){
        return `${t(lang).datetime.AT_MAJ} ${t(lang).datetime.formats.hour(formDate)}`;
    }else if(isYesterday(formDate)){
        return `${t(lang).datetime.YESTERDAY_AT} ${t(lang).datetime.formats.hour(formDate)}`;
    }

    return `${t(lang).datetime.formats.date(format(formDate, "yyyy-MM-dd"))} ${t(lang).datetime.AT_MIN} ${t(lang).datetime.formats.hour(formDate)}`;
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
 */
 export const getLatLngByAddress = function(address, callback){
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
 * @param {object} userFriends user firends
 * @returns 
 */
export const isMyFriend = function(connectedUserId, userFriends){
    return userFriends.findIndex((user) => user.id === connectedUserId) !== -1;
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
 * get base64 from file uri
 * 
 * @param {string} uri file uri 
 * @returns 
 */
//  export const toDataUrl = (uri, callback) => {
//     var xhr = new XMLHttpRequest(),
//         fileReader = new FileReader();

//     xhr.open("GET", uri, true);
//     // Set the responseType to blob
//     xhr.responseType = "blob";

//     xhr.addEventListener("load", function () {
//         console.log(xhr.status);
//         if (xhr.status === 200) {
//             // onload needed since Google Chrome doesn't support addEventListener for FileReader
//             fileReader.onload = function (evt) {
//                 // Read out file contents as a Data URL
//                 var result = evt.target.result;
//                 // Set image src to Data URL
//                 // Store Data URL in localStorage
//                 try {
//                     callback(result);
//                 }
//                 catch (e) {
//                     console.log("Storage failed: " + e);
//                 }
//             };
//             // Load blob as Data URL
//             fileReader.readAsDataURL(xhr.response);
//         }
//     }, false);
//     // Send XHR
//     xhr.send();
// }