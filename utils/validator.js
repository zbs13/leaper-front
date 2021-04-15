import global from '../providers/global';

export default Validator = {
    /**
     * check if string contains or not any XSS vulnerability 
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkXSS: (val) => {
        return !(val.includes("javascript") || val.match(/[":();<>%]/g)) 
    },
    /**
     * check if string match with password constraints
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkPassword: (val) => {
        let regexCheckNum = global.validator.regex.PASSWORD_REQUIRMENT_NUM;
        let regexCheckMaj = global.validator.regex.PASSWORD_REQUIRMENT_MAJ;
        return !(!val.match(regexCheckNum) || !val.match(regexCheckMaj) || val.length < global.validator.PASSWORD_MIN_LENGTH)   
    },
    /**
     * check if string match with mail constraints 
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkMail: (val) => {
        return val.match(global.validator.regex.MAIL) 
    },
    /**
     * check if string match with min length constraints 
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkMinLength: (val, min) => {
        return val.length >= min
    },
    /**
     * check if string match with max length constraints
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkMaxLength: (val, max) => {
        return val.length <= max
    },
    /**
     * check if string contains letters only
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkOnlyLetters: (val) => {
        return !val.match(global.validator.regex.ONLY_LETTERS)
    },
    /**
     * check if string match with username constraints
     * 
     * @param {string} val value
     * @returns {boolean}
     */
    checkUsername: (val) => {
        return !val.match(global.validator.regex.USERNAME)
    }
}