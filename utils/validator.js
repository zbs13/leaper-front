export default Validator = {
    checkXSS: (val) => {
        return !(val.includes("javascript") || val.match(/[":();<>%]/g)) 
    }
}