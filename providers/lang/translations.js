const l = {
    fr: {
        ADD: "Ajouter",
        FRIENDS: "Amis",
        HOME: "Accueil",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favoris",
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Course"
        }
    },
    en: {
        ADD: "Add",
        FRIENDS: "Friends",
        HOME: "Home",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favorites",
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Running"
        }
    }
}

export default t = (lang) => {
    return l[lang];
}