import useApp from "./hooks/useApp";

export function getUserLang(){
    const { selectors } = useApp();
    return selectors.getUserParameters().lang;
}