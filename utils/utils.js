import { format } from 'date-fns';

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