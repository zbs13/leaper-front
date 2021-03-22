export default function combineReducers(reducerDict) {
    return function (state = {}, action) {
        return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...stateGlobal, [curr]: slice };
        }, state);
    };
}