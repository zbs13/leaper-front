import global from '../providers/global';

export default Validator = {
    checkXSS: (val) => {
        return !(val.includes("javascript") || val.match(/[":();<>%]/g)) 
    },
    checkPassword: (val) => {
        let regexCheckNum = global.validator.regex.PASSWORD_REQUIRMENT_NUM;
        let regexCheckMaj = global.validator.regex.PASSWORD_REQUIRMENT_MAJ;
        return !(!val.match(regexCheckNum) || !val.match(regexCheckMaj) || val.length < global.validator.PASSWORD_MIN_LENGTH)   
    },
    checkMail: (val) => {
        return val.match(global.validator.regex.MAIL) 
    },
    checkMinLength: (val, min) => {
        return val.length >= min
    },
    checkMaxLength: (val, max) => {
        return val.length <= max
    },
    checkOnlyLetters: (val) => {
        return !val.match(global.validator.regex.ONLY_LETTERS)
    },
    checkUsername: (val) => {
        return !val.match(global.validator.regex.USERNAME)
    }
}