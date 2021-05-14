import { format, parseISO } from "date-fns";
const frLocale = require('date-fns/locale/fr');

const l = {
    fr: {
        ADD: "Ajouter",
        FRIENDS: "Amis",
        HOME: "Accueil",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favoris",
        CANCEL: "Annuler",
        ADD_CONTACT_PERSON: "Ajouter un contact",
        SEARCH: "Recherche",
        USER_ALREADY_EXISTS: "Cet utilisateur existe déja",
        CLOSE: "Fermer",
        FILTERS: "Filtres",
        JOIN: "Rejoindre",
        RESULTS: "Résultats",
        PLACE_FILTER_PLACEHOLDER: "Adresse, ville, pays, code postal...",
        FILTER_BY: "Filtrer par",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Lieu",
        NO_DATA: "Aucun résultat",
        OK: "Ok",
        ADDRESS: "Adresse",
        HOURS: "Heures",
        FROM: "de",
        TO: "à",
        DETAILS: "Détails",
        SEE_DETAILS: "Voir détails",
        BOOKMARK_THIS_PLACE: "Mettre le lieu en favori",
        PARAMETERS: "Paramètres",
        MUTE: "Mettre en sourdine",
        PEOPLE_LIST: "Liste des personnes",
        SHARED_CONTENT: "Contenu partagé",
        COPY_TEXT: "Copier le texte",
        EDIT_INFOS: "Modifier les informations",
        COPY_ATTACHMENT_LINK: "Copier le lien de la pièce jointe",
        SAVE_ATTACHMENT: "Sauvegarder la pièce jointe",
        SHARE_ATTACHMENT: "Partager la pièce jointe",
        COPY_TO_CLIPBOARD: "Copié dans le presse-papiers",
        NO_GRANTED_ACCESS: "Accès non accordé",
        PHONE_ACCESS_NOT_GRANTED_TO_MEDIA: "L'accès à la bibliothèque du téléphone n'est pas autorisé. Vous pouvez accorder l'accès dans les paramètres du téléphone",
        CAMERA: "Caméra",
        PHOTO_VIDEO_LIBRARY: "Bibliothèque photos/vidéos",
        FILE: "Fichier",
        SHARED_CONTENT: "Contenu partagé",
        NO_SHARED_CONTENT: "Aucun contenu partagé",
        EDITING: "Edition",
        START: "Début",
        END: "Fin",
        SPORT: "Sport",
        DESCRIPTION: "Description",
        NAME: "Nom",
        GENERAL: "Général",
        success: {
            SUCCESS_DOWNLOAD_FILE: "Téléchargement terminé avec succès"
        },
        errors: {
            ERROR_API: "Oups, une erreur est survenue",
            ERROR_DOWNLOAD_FILE: "Une erreur est survenue lors du téléchargement du fichier",
            ERROR_IMPORTING_FILE: "Une erreur est survenue lors de l'importation du document",
            ERROR_SHARE_FILE: "Une erreur est survenue lors du partage du fichier"
        },
        message: {
            WRITE_A_MESSAGE: "Ecrire un message...",
            DELETE_MESSAGE: "Supprimer le message",
            PIN_MESSAGE: "Epingler le message"
        },
        group: {
            LEAVE_THIS_GROUP: "Quitter ce groupe",
            LEAVE_GROUP: "Quitter le groupe",
            SURE_TO_LEAVE_GROUP: "Vous êtes sur le point de quitter le groupe",
            FIND_A_GROUP: "Chercher un groupe",
            MY_GROUPS: "Mes groupes",
            CONFIRM_JOIN_GROUP: "Vous vous apprétez à rejoindre ce groupe",
            CREATE_GROUP: "Créer un groupe",
            ADD_TO_GROUP: "Ajouter au groupe"
        },
        event: {
            LEAVE_THIS_EVENT: "Quitter cet évènement",
            LEAVE_EVENT: "Quitter l'évènement",
            SURE_TO_LEAVE_EVENT: "Vous êtes sur le point de quitter l'évènement",
            CONFIRM_JOIN_EVENT: "Vous vous apprétez à rejoindre cet évènement",
            FIND_EVENT_BY: "Chercher un évènement par",
            EVENTS: "Evènements",
            HERE_EVENT_PLACE: "C'est ici que l'évènement aura lieu",
            MY_EVENTS: "Mes évènements",
            FIND_AN_EVENT: "Chercher un évènement",
            CREATE_EVENT: "Créer un évènement",
            ADD_TO_EVENT: "Ajouter à l'évènement"
        },
        fields: {
            PASSWORD: "Mot de passe",
            MAIL: "Mail",
            USERNAME : "Nom d'utilisateur",
            FIRSTNAME : "Prénom",
            LASTNAME : "Nom",
            FIELD_INCORRECT_VALUES: "Ce champ contient des caractères interdit",
            FIELD_INCORRECT_PASSWORD: "Le mot de passe doit contenir au moins 7 caractères, un numéro et une majuscule",
            FIELD_INCORRECT_MAIL: "Le format du mail est invalide",
            FIELD_INCORRECT_MAX_LENGTH: "La valeur dépasse la longueur autorisée",
            FIELD_INCORRECT_MIN_LENGTH: "La valeur ne contient pas assez de caractères",
            FIELD_INCORRECT_LETTERS_ONLY: "Ce champ ne doit contenir que des lettres",
            FIELD_INCORRECT_LESS_THAN_HOUR: "Cette heure doit être plus petite",
            FIELD_INCORRECT_LESS_THAN_DATE: "Cette date doit être plus petite",
            FIELD_INCORRECT_GREATER_THAN_HOUR: "Cette heure doit être plus grande",
            FIELD_INCORRECT_GREATER_THAN_DATE: "Cette date doit être plus grande",
            FIELD_INCORRECT_ADDRESS: "Adresse incorrect. Le champ est vide ou contient des caractères non valide ou bien l'adresse est trop longue",
            MONTHS: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            SHORT_MONTHS: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            DAYS: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            SHORT_DAYS: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            TODAY: "Aujourd'hui"
        },
        search: {
            GLOBAL: "Rechercher un sport, un évènement, un groupe...",
            SEARCH_A_SPORT: "Chercher un sport"
        },
        datetime: {
            TODAY_AT: "Aujourd'hui à",
            AT_MAJ: "À",
            AT_MIN: "à",
            YESTERDAY_AT: "Hier à",
            formats: {
                date: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'dd/MM/yyyy');
                },
                readableDate: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'EEEE, dd LLLL yyyy', {locale: frLocale});
                },
                hour: (hour) => {
                    if(!(hour instanceof Date)){
                        hour = parseISO(hour);
                    }
                    return format(hour, 'HH:mm');
                }
            }
        },
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Course",
            CYCLING: "Cyclisme",
            SHOT_PUT: "Lancer",
            WALK: "Marche",
            MARATHON: "Marathon",
            JUMPS: "Sauts",
            TRIATHLON: "Triathlon",
            CROSSFIT: "Crossfit",
            WEIGHTLIFTING: "Haltérophilie",
            PARKOUR: "Parkour",
            PILATES: "Pilate",
            STEP: "Step",
            YOGA: "Yoga",
            GYMNASTICS: "Gymnastique",
            AIRSOFT: "Airsoft",
            FOOSBALL: "Baby-foot",
            POOL: "Billard",
            BOWLING: "Bowling",
            DANCE: "Danse",
            CHESS: "Echecs",
            HORSEBACK_RIDING: "Equitation",
            KARTING: "Karting",
            PAINTBALL: "Paintball",
            BOCCE: "Pétanque",
            ARCHERY: "Tir à l'arc",
            FRISBEE: "Ultimate",
            BADMINTON: "Badminton",
            BASEBALL: "Baseball",
            BASKETBALL: "Basketball",
            CRICKET: "Cricket",
            FOOTBALL: "Football",
            AMERICAN_FOOTBALL: "Football américain",
            FUTSAL: "Futsal",
            GOLF: "Golf",
            HANDBALL: "Handball",
            HOCKEY: "Hockey sur gazon",
            SQUASH: "Squash",
            BASQUE_PELOTA: "Pelote Basque",
            TENNIS: "Tennis",
            TABLE_TENNIS: "Tennis de table",
            POLO: "Polo",
            RUGBY: "Rugby",
            VOLLEYBALL: "Volleyball",
            WATER_POLO: "Water-polo",
            AIKIDO: "Aïkido",
            BOXING: "Boxe",
            CAPOEIRA: "Capoeira",
            CATCH: "Catch",
            FENCING: "Escrime",
            JUJITSU: "Ju-jitsu",
            JUDO: "Judo",
            KARATE: "Karaté",
            KENDO: "Kendo",
            KENJUTSU: "Kenjutsu",
            KICK_BOXING: "Kick boxing",
            KUNG_FU: "Kung-fu",
            KRAV_MAGA: "Krav-maga",
            MMA: "MMA",
            TAEKWONDO: "Taekwondo",
            BMX: "BMX",
            ICE_HOCKEY: "Hockey sur glace",
            KITESURFING_BOARD: "Kitesurf",
            ICE_SKATING: "Patin sur glace",
            WINDSURFING: "Planche à voile",
            ROLLERSKATING: "Roller",
            SKATEBOARDING: "Skateboard",
            ALPINE_SKIING: "Ski alpin",
            WATER_SKIING: "Ski nautique",
            SNOWBOARDING: "Snowboard",
            SURFING: "Surf",
            WAKEBOARDING: "Wakeboard",
            ROWING: "Aviron",
            CANOEING: "Canoë",
            CANYONING: "Canyoning",
            KAYAKING: "Kayak",
            SWIMMING: "Natation",
            FISHING: "Pêche",
            SNORKELLING: "Plongée sous marine",
            RAFTING: "Rafting",
            BASE_JUMPING: "Base jump",
            ROCK_CLIMBING: "Escalade",
            SKYDIVING: "Parachute",
            PARAGLIDING: "Parapente",
            QUAD_BIKING: "Quad",
            CAR_RALLY: "Rallye automobile"
        },
        settings: {
            PROFIL: 'Gestion du profil',
            APPLY: 'Gestion de l\'application',
            ABOUT: 'A propos',
            TITLE: 'Paramètres',
            LOG_OUT: "Déconnexion"
        }
    },
    en: {
        ADD: "Add",
        FRIENDS: "Friends",
        HOME: "Home",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favorites",
        CANCEL: "Cancel",
        ADD_CONTACT_PERSON: "Add a contact person",
        SEARCH: "Search",
        USER_ALREADY_EXISTS: "This user already exists",
        CLOSE: "Close",
        FILTERS: "Filters",
        JOIN: "Join",
        RESULTS: "Results",
        PLACE_FILTER_PLACEHOLDER: "Address, city, country, postal code...",
        FILTER_BY: "Filter by",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Place",
        NO_DATA: "No results",
        OK: "Ok",
        ADDRESS: "Address",
        HOURS: "Hours",
        FROM: "from",
        TO: "to",
        DETAILS: "Details",
        SEE_DETAILS: "See details",
        BOOKMARK_THIS_PLACE: "Bookmark this place",
        PARAMETERS: "Parameters",
        MUTE: "Mute",
        PEOPLE_LIST: "People list",
        SHARED_CONTENT: "Shared content",
        COPY_TEXT: "Copy text",
        EDIT_INFOS: "Edit information",
        COPY_ATTACHMENT_LINK: "Copy attachment link",
        SAVE_ATTACHMENT: "Save attachment",
        SHARE_ATTACHMENT: "Share attachment",
        COPY_TO_CLIPBOARD: "Copy to clipboard",
        NO_GRANTED_ACCESS: "No granted access",
        PHONE_ACCESS_NOT_GRANTED_TO_MEDIA: "Access to phone library not granted. You can granted the access in phone settings",
        CAMERA: "Camera",
        PHOTO_VIDEO_LIBRARY: "Photo/video library",
        FILE: "File",
        SHARED_CONTENT: "Shared content",
        NO_SHARED_CONTENT: "No shared content",
        EDITING: "Editing",
        START: "Start",
        END: "End",
        SPORT: "Sport",
        DESCRIPTION: "Description",
        NAME: "Name",
        GENERAL: "General",
        success: {
            SUCCESS_DOWNLOAD_FILE: "Download completed successfully"
        },
        errors: {
            ERROR_API: "Oops, an error has occurred !",
            ERROR_DOWNLOAD_FILE: "An error occured while downloading file",
            ERROR_IMPORTING_FILE: "An error occured while importing file",
            ERROR_SHARE_FILE: "An error occured while sharing file"
        },
        message: {
            WRITE_A_MESSAGE: "Write a message...",
            DELETE_MESSAGE: "Delete message",
            PIN_MESSAGE: "Pin message"
        },
        group: {
            ADD_TO_GROUP: "Add to group",
            SURE_TO_LEAVE_GROUP: "You are going to leave the group",
            LEAVE_GROUP: "Leave group",
            LEAVE_THIS_GROUP: "Leave this group",
            CONFIRM_JOIN_GROUP: "You are going to join this group",
            FIND_A_GROUP: "Find a group",
            MY_GROUPS: "My groups",
            CREATE_GROUP: "Create a group"
        },
        event: {
            EVENTS: "Events",
            ADD_TO_EVENT: "Add to event",
            LEAVE_THIS_EVENT: "Leave this event",
            LEAVE_EVENT: "Leave event",
            SURE_TO_LEAVE_EVENT: "You are going to leave the event",
            CONFIRM_JOIN_EVENT: "You are going to join this event",
            FIND_AN_EVENT: "Find an event",
            FIND_EVENT_BY: "Find an event by",
            MY_EVENTS: "My events",
            CREATE_EVENT: "Create an event",
            HERE_EVENT_PLACE: "This is here event take place"
        },
        fields: {
            PASSWORD: "Password",
            MAIL: "eMail",
            USERNAME : "Username",
            FIRSTNAME : "Firstname",
            LASTNAME : "Lastname",
            FIELD_INCORRECT_VALUES: "This field contains forbidden caracters",
            FIELD_INCORRECT_PASSWORD: "The password must contain at least 7 caracters, 1 number and 1 capital letter",
            FIELD_INCORRECT_MAIL: "Mail format is not valid",
            FIELD_INCORRECT_MAX_LENGTH: "Value exceeds allowable length",
            FIELD_INCORRECT_MIN_LENGTH: "The value does not contain enough caracters",
            FIELD_INCORRECT_LETTERS_ONLY: "This field must only contain letters",
            FIELD_INCORRECT_LESS_THAN_HOUR: "This time should be smaller",
            FIELD_INCORRECT_LESS_THAN_DATE: "This date should be smaller",
            FIELD_INCORRECT_GREATER_THAN_HOUR: "This time should be greater",
            FIELD_INCORRECT_GREATER_THAN_DATE: "This date should be greater",
            FIELD_INCORRECT_ADDRESS: "Address not valid. Contains incorrect caracters or is too long or field is empty",
            MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            SHORT_MONTHS: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
            DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            SHORT_DAYS: ['Sun.','Mon.','Tues.','Wed.','Thu.','Fri.','Sat.'],
            TODAY: "Today"
        },
        search: {
            GLOBAL: "Search a sport, an event, a group...",
            SEARCH_A_SPORT: "Search a sport"
        },
        datetime: {
            TODAY_AT: "Today at",
            AT_MAJ: "At",
            AT_MIN: "at",
            YESTERDAY_AT: "Yesterday at",
            formats: {
                date: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'dd/MM/yyyy');
                },
                readableDate: (date) => {
                    if(!(date instanceof Date)){
                        date = parseISO(date);
                    }
                    return format(date, 'EEEE, dd LLLL yyyy');
                },
                hour: (hour) => {
                    if(!(hour instanceof Date)){
                        hour = parseISO(hour);
                    }
                    hour = format(hour, 'HH:mm');
                    hour = hour.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [hour];
                    if (hour.length > 1) {
                        hour = hour.slice(1);
                        hour[5] = +hour[0] < 12 ? ' AM' : ' PM';
                        hour[0] = +hour[0] % 12 || 12;
                    }
                    return hour.join('');
                }
            }
        },
        sports: {
            BIATHLON: "Biathlon",
            RUNNING: "Running",
            CYCLING: "Cycling",
            SHOT_PUT: "Shot put",
            WALK: "Walk",
            MARATHON: "Marathon",
            JUMPS: "Jumps",
            TRIATHLON: "Triathlon",
            CROSSFIT: "Crossfit",
            WEIGHTLIFTING: "Weightlifting",
            PARKOUR: "Parkour",
            PILATES: "Pilates",
            STEP: "Step",
            YOGA: "Yoga",
            GYMNASTICS: "Gymnastics",
            AIRSOFT: "Airsoft",
            FOOSBALL: "Foosball",
            POOL: "Pool",
            BOWLING: "Bowling",
            DANCE: "Dance",
            CHESS: "Chess",
            HORSEBACK_RIDING: "Horseback riding",
            KARTING: "Karting",
            PAINTBALL: "Paintball",
            BOCCE: "Bocce",
            ARCHERY: "Archery",
            FRISBEE: "Frisbee",
            BADMINTON: "Badminton",
            BASEBALL: "Baseball",
            BASKETBALL: "Basketball",
            CRICKET: "Cricket",
            FOOTBALL: "Football",
            AMERICAN_FOOTBALL: "American football",
            FUTSAL: "Futsal",
            GOLF: "Golf",
            HANDBALL: "Handball",
            HOCKEY: "Hockey",
            SQUASH: "Squash",
            BASQUE_PELOTA: "Basque pelota",
            TENNIS: "Tennis",
            TABLE_TENNIS: "Table tennis",
            POLO: "Polo",
            RUGBY: "Rugby",
            VOLLEYBALL: "Volleyball",
            WATER_POLO: "Water polo",
            AIKIDO: "Aikido",
            BOXING: "Boxing",
            CAPOEIRA: "Capoeira",
            CATCH: "Catch",
            FENCING: "Fencing",
            JUJITSU: "Jujitsu",
            JUDO: "Judo",
            KARATE: "Karate",
            KENDO: "Kendo",
            KENJUTSU: "Kenjutsu",
            KICK_BOXING: "Kick boxing",
            KUNG_FU: "Kung fu",
            KRAV_MAGA: "Krav maga",
            MMA: "MMA",
            TAEKWONDO: "Taekwondo",
            BMX: "BMX",
            ICE_HOCKEY: "Ice hockey",
            KITESURFING_BOARD: "Kitesurfing board",
            ICE_SKATING: "Ice skating",
            WINDSURFING: "Windsurfing",
            ROLLERSKATING: "Rollerskating",
            SKATEBOARDING: "Skateboarding",
            ALPINE_SKIING: "Alpine skiing",
            WATER_SKIING: "Water skiing",
            SNOWBOARDING: "Snowboarding",
            SURFING: "Surfing",
            WAKEBOARDING: "Wakeboarding",
            ROWING: "Rowing",
            CANOEING: "Canoeing",
            CANYONING: "Canyoning",
            KAYAKING: "Kayaking",
            SWIMMING: "Swimming",
            FISHING: "Fishing",
            SNORKELLING: "Snorkelling",
            RAFTING: "Rafting",
            BASE_JUMPING: "Base jumping",
            ROCK_CLIMBING: "Rock climbing",
            SKYDIVING: "Skydiving",
            PARAGLIDING: "Paragliding",
            QUAD_BIKING: "Quad biking",
            CAR_RALLY: "Car rally"
        },
        settings: {
            PROFIL: 'Profile settings',
            APPLY: 'Application settings',
            ABOUT: 'About',
            TITLE: 'Settings',
            LOG_OUT: "Log out"
        }
    }
}

/**
 * to target good translation according to language
 * 
 * @param {string} lang "fr" or "en"
 * @return {object} translations for targeted language
 */
export default t = (lang) => {
    return l[lang];
}