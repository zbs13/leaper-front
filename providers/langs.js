import useApp from "../hooks/useApp";

export const langs = {
    fr: {
        ADD: "Ajouter",
        FRIENDS: "Amis",
        HOME: "Accueil",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favoris",
        sports: {

        }
    },
    en: {
        ADD: "Add",
        FRIENDS: "Friends",
        HOME: "Home",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favorites",
        sports: {
            
        }
    }
}

export function getUserLang(){
    const { selectors } = useApp();
    return selectors.getUserParameters().lang;
}