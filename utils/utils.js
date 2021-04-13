import { format } from 'date-fns';

export const randId = () => '_' + Math.random().toString(36).substr(2, 9);

export const ellipsisText = (text, max) => ((text || "").length > max) ? (((text).substring(0, max - 3)) + '...') : text

export const getDatesBetweenTwoDates = function(start, end) {
    for(var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1 )){
        let strDate = format(dt, 'yyyy-MM-dd');
        if(strDate !== start && strDate !== end){
            arr.push(strDate);
        }
    }
    return arr;
};