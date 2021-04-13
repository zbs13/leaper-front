import { format } from "date-fns";

const l = {
    fr: {
        ADD: "Ajouter",
        FRIENDS: "Amis",
        HOME: "Accueil",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favoris",
        CANCEL: "Annuler",
        CREATE_GROUP: "Créer un groupe",
        CREATE_EVENT: "Créer un évènement",
        ADD_CONTACT_PERSON: "Ajouter un contact",
        SEARCH: "Recherche",
        ERROR_API: "Oups, une erreur est survenue",
        USER_ALREADY_EXISTS: "Cet utilisateur existe déja",
        MY_GROUPS: "Mes groupes",
        MY_EVENTS: "Mes évènements",
        CLOSE: "Fermer",
        EVENTS: "Evènements",
        FILTERS: "Filtres",
        FIND_EVENT_BY: "Chercher un évènement par",
        FIND_AN_EVENT: "Chercher un évènement",
        FIND_A_GROUP: "Chercher un groupe",
        JOIN: "Rejoindre",
        RESULTS: "Résultats",
        PLACE_FILTER_PLACEHOLDER: "Adresse, ville, pays, code postal...",
        FILTER_BY: "Filtrer par",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Lieu",
        NO_DATA: "Aucun résultat",
        HERE_EVENT_PLACE: "C'est ici que l'évènement aura lieu",
        OK: "Ok",
        CONFIRM_JOIN_EVENT: "Vous vous apprétez à rejoindre cet évènement",
        CONFIRM_JOIN_GROUP: "Vous vous apprétez à rejoindre ce groupe",
        ADDRESS: "Adresse",
        HOURS: "Heures",
        FROM: "de",
        TO: "à",
        DETAILS: "Détails",
        LEAVE_THIS_EVENT: "Quitter cet évènement",
        LEAVE_EVENT: "Quitter l'évènement",
        SURE_TO_LEAVE_EVENT: "Vous êtes sur le point de quitter l'évènement",
        LEAVE_THIS_GROUP: "Quitter ce groupe",
        LEAVE_GROUP: "Quitter le groupe",
        SURE_TO_LEAVE_GROUP: "Vous êtes sur le point de quitter le groupe",
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
            MONTHS: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            SHORT_MONTHS: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            DAYS: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            SHORT_DAYS: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            TODAY: "Aujourd'hui"
        },
        search: {
            GLOBAL: "Rechercher un sport, un évènement, un groupe..."
        },
        formats: {
            date: (date) => {
                return format(new Date(date), 'dd/MM/yyyy');
            },
            hour: (hour) => {
                return hour;
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
        }
    },
    en: {
        ADD: "Add",
        FRIENDS: "Friends",
        HOME: "Home",
        NOTIFICATIONS: "Notifications",
        FAVORITES: "Favorites",
        CANCEL: "Cancel",
        CREATE_GROUP: "Create a group",
        CREATE_EVENT: "Create an event",
        ADD_CONTACT_PERSON: "Add a contact person",
        SEARCH: "Search",
        ERROR_API: "Oops, an error has occurred !",
        USER_ALREADY_EXISTS: "This user already exists",
        MY_GROUPS: "My groups",
        MY_EVENTS: "My events",
        CLOSE: "Close",
        EVENTS: "Events",
        FIND_EVENT_BY: "Find an event by",
        FIND_AN_EVENT: "Find an event",
        FIND_A_GROUP: "Find a group",
        FILTERS: "Filters",
        JOIN: "Join",
        RESULTS: "Results",
        PLACE_FILTER_PLACEHOLDER: "Address, city, country, postal code...",
        FILTER_BY: "Filter by",
        DATE: "Date",
        DATES: "Dates",
        PLACE: "Place",
        NO_DATA: "No results",
        HERE_EVENT_PLACE: "This is here event take place",
        OK: "Ok",
        CONFIRM_JOIN_EVENT: "You are going to join this event",
        CONFIRM_JOIN_GROUP: "You are going to join this group",
        ADDRESS: "Address",
        HOURS: "Hours",
        FROM: "from",
        TO: "to",
        DETAILS: "Details",
        LEAVE_THIS_EVENT: "Leave this event",
        LEAVE_EVENT: "Leave event",
        SURE_TO_LEAVE_EVENT: "You are going to leave the event",
        LEAVE_THIS_GROUP: "Leave this group",
        LEAVE_GROUP: "Leave group",
        SURE_TO_LEAVE_GROUP: "You are going to leave the group",
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
            MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            SHORT_MONTHS: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
            DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            SHORT_DAYS: ['Sun.','Mon.','Tues.','Wed.','Thu.','Fri.','Sat.'],
            TODAY: "Today"
        },
        search: {
            GLOBAL: "Search a sport, an event, a group..."
        },
        formats: {
            date: (date) => {
                return format(new Date(date), 'yyyy-MM-dd');
            },
            hour: (hour) => {
                hour = hour.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [hour];
                if (hour.length > 1) {
                    hour = hour.slice(1);
                    hour[5] = +hour[0] < 12 ? ' AM' : ' PM';
                    hour[0] = +hour[0] % 12 || 12;
                }
                return hour.join('');
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
        }
    }
}

export default t = (lang) => {
    return l[lang];
}