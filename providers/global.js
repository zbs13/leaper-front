import t from './lang/translations';
import { 
    GOOGLE_MAP_API_KEY,
    FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_STORAGE_BUCKET
} from '@env';

export default global = {
    screens: {
        LOGIN: "Login",
        REGISTRATION: "Registration",
        WELCOME_LANGUAGE_SELECTION: "WelcomeLanguageSelection",
        HOME: "Home",
        BOOKMARKS: "Bookmarks",
        FRIENDS: "Friends",
        NOTIFICATIONS: "Notifications",
        SETTINGS: "Settings",
        SPORT_EVENTS: "SportEvents",
        MY_GROUPS: "MyGroups",
        MY_EVENTS: "MyEvents",
        SPORT_EVENT_DETAILS: "SportEventDetails",
        TCHAT: "Tchat",
        SHARED_CONTENT: "SharedContent",
        EDIT_GROUP_EVENT: "EditGroupEvent",
        CREATE_GROUP_EVENT: "CreateGroupEvent",
        PEOPLE_LIST: "PeopleList",
        USER_PROFILE: "UserProfile",
        MANAGE_ROLE: "ManageRole",
        CREATE_EDIT_ROLE: "CreateEditRole",
        ALLOCATE_ROLE: "AllocateRole",
        ADD_PERSON: "AddPerson",
        APP_SETTINGS: "AppSettings",
        CHANGE_LANGUAGE: "ChangeLanguage",
        CHANGE_NOTIFICATIONS: "ChangeNotifications",
        ABOUT: "About",
        PROFILE_SETTINGS: "ProfileSettings",
        PINNED_MESSAGES: "PinnedMessages"
    },
    routing: {
        HOME_ROUTING: "HomeRouting",
        BOTTOM_MENU_ROUTING: "BottomMenuRouting",
        ADD_ROUTING: "AddRouting",
        FRIENDS_ROUTING: "FriendsRouting",
        NOTIFICATIONS_ROUTING: "NotificationsRouting",
        BOOKMARKS_ROUTING: "BookmarksRouting",
    },
    colors: {
        MAIN_COLOR: '#BDE023',
        LIGHT_MAIN_COLOR: "#DDEF91",
        VERY_LIGHT_MAIN_COLOR: "#EEF3D6",
        ANTHRACITE: "#293231",
        GREY: "#9E9E9E",
        LIGHT_GREY: '#C6C6C6',
        RED_LIKE: "#D45B5B",
        VERY_LIGHT_GREY: '#EAEAEA',
        GREEN_SUCCESS: '#BDE023',
        GREEN_SUCCESS_TEXT: '#32682B',
        RED_ERROR: '#B75A5A',
        RED_ERROR_TEXT: '#6A2626',
        RED_NOTIFS: "#FF6363",
        WHITE: "#FFFFFF",
        URI: "#4C5EBF"
    },
    rights: {
        REMOVE_USER: "1",
        ADD_USER: "2",
        DELETE_MESSAGE: "3",
        EDIT_INFOS: "4",
        ALL: ["1", "2", "3", "4"]
    },
    map: {
        DEFAULT_ZOOM_LATITUDE_DELTA: 0.0222, 
        DEFAULT_ZOOM_LONGITUDE_DELTA: 0.0021,
        DEFAULT_NOT_ZOOM_LATITUDE_DELTA: 10.0222, 
        DEFAULT_NOT_ZOOM_LONGITUDE_DELTA: 0.0021,
        DEFAULT_NOT_ZOOM_LONGITUDE: 2.47890900866457,
        DEFAULT_NOT_ZOOM_LATITUDE: 47.04374701872397,
        DEFAULT_FAVS_NOT_ZOOM_LATITUDE_DELTA: 3.0222,
        DEFAULT_FAVS_NOT_ZOOM_LONGITUDE_DELTA: 0.0021,
        GOOGLE_MAP_API_KEY: GOOGLE_MAP_API_KEY
    },
    api: {
        API_ENDPOINT: "https://pa-5iw-prodd.herokuapp.com/",
        WS_API_ENDPOINT: "wss://pa-5iw-prodd.herokuapp.com/"
    },
    firebase: {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID
    },
    MAX_RESULT_PER_LOADED_PAGE: 20,
    MAX_RESULT_PER_LOADED_TCHAT: 30,
    AVAILABLE_LANGUAGES: [
        {
            lang: "fr", 
            flag: "FR"
        }, 
        {
            lang: "en",
            flag: "GB"
        }
    ],
    validator: {
        PASSWORD_MIN_LENGTH: 7,
        regex : {
            PASSWORD_REQUIRMENT_NUM: /[(0-9)]/,
            PASSWORD_REQUIRMENT_MAJ: /[(A-Z)]/,
            ONLY_LETTERS: /[^A-Za-z]/,
            USERNAME: /[^A-Za-z0-9_*!$^]/,
            MAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            URI: /(https?:\/\/(www\.))?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm
        }
    },
    notifications: {
        ASK_EVENT: "askEvent",
        ASK_GROUP: "askGroup",
        ADD_EVENT: "addEvent",
        ADD_GROUP: "addGroup",
        ASK_FRIEND: "askFriend"
    },
    listSports : (lang) => ( 
        [
            {
                name: t(lang).sports.BIATHLON,
                icon: 'md-stopwatch',
                id: 1
            },{
                name: t(lang).sports.RUNNING,
                icon: 'md-stopwatch',
                id: 2
            },{
                name: t(lang).sports.CYCLING,
                icon: 'md-stopwatch',
                id: 3
            },{
                name: t(lang).sports.SHOT_PUT,
                icon: 'md-stopwatch',
                id: 4
            },{
                name: t(lang).sports.WALK,
                icon: 'md-stopwatch',
                id: 5
            },{
                name: t(lang).sports.MARATHON,
                icon: 'md-stopwatch',
                id: 6
            },{
                name: t(lang).sports.JUMPS,
                icon: 'md-stopwatch',
                id: 7
            },{
                name: t(lang).sports.TRIATHLON,
                icon: 'md-stopwatch',
                id: 8
            },{
                name: t(lang).sports.CROSSFIT,
                icon: 'md-barbell',
                id: 9
            },{
                name: t(lang).sports.WEIGHTLIFTING,
                icon: 'md-barbell',
                id: 10
            },{
                name: t(lang).sports.PARKOUR,
                icon: 'md-barbell',
                id: 11
            },{
                name: t(lang).sports.PILATES,
                icon: 'md-barbell',
                id: 12
            },{
                name: t(lang).sports.STEP,
                icon: 'md-barbell',
                id: 13
            },{
                name: t(lang).sports.YOGA,
                icon: 'md-barbell',
                id: 14
            },{
                name: t(lang).sports.GYMNASTICS,
                icon: 'md-medal',
                id: 15
            },{
                name: t(lang).sports.AIRSOFT,
                icon: 'md-pint',
                id: 16
            },{
                name: t(lang).sports.FOOSBALL,
                icon: 'md-pint',
                id: 17
            },{
                name: t(lang).sports.POOL,
                icon: 'md-pint',
                id: 18
            },{
                name: t(lang).sports.BOWLING,
                icon: 'md-pint',
                id: 19
            },{
                name: t(lang).sports.DANCE,
                icon: 'md-pint',
                id: 20
            },{
                name: t(lang).sports.CHESS,
                icon: 'md-pint',
                id: 21
            },{
                name: t(lang).sports.HORSEBACK_RIDING,
                icon: 'md-pint',
                id: 22
            },{
                name: t(lang).sports.KARTING,
                icon: 'md-pint',
                id: 23
            },{
                name: t(lang).sports.PAINTBALL,
                icon: 'md-pint',
                id: 24
            },{
                name: t(lang).sports.BOCCE,
                icon: 'md-pint',
                id: 25
            },{
                name: t(lang).sports.ARCHERY,
                icon: 'md-pint',
                id: 26
            },{
                name: t(lang).sports.FRISBEE,
                icon: 'md-pint',
                id: 27
            },{
                name: t(lang).sports.BADMINTON,
                icon: 'md-football',
                id: 28
            },{
                name: t(lang).sports.BASEBALL,
                icon: 'md-football',
                id: 29
            },{
                name: t(lang).sports.BASKETBALL,
                icon: 'md-football',
                id: 30
            },{
                name: t(lang).sports.CRICKET,
                icon: 'md-football',
                id: 31
            },{
                name: t(lang).sports.FOOTBALL,
                icon: 'md-football',
                id: 32
            },{
                name: t(lang).sports.AMERICAN_FOOTBALL,
                icon: 'md-football',
                id: 33
            },{
                name: t(lang).sports.FUTSAL,
                icon: 'md-football',
                id: 34
            },{
                name: t(lang).sports.GOLF,
                icon: 'md-football',
                id: 35
            },{
                name: t(lang).sports.HANDBALL,
                icon: 'md-football',
                id: 36
            },{
                name: t(lang).sports.HOCKEY,
                icon: 'md-football',
                id: 37
            },{
                name: t(lang).sports.SQUASH,
                icon: 'md-football',
                id: 38
            },{
                name: t(lang).sports.BASQUE_PELOTA,
                icon: 'md-football',
                id: 39
            },{
                name: t(lang).sports.TENNIS,
                icon: 'md-football',
                id: 40
            },{
                name: t(lang).sports.TABLE_TENNIS,
                icon: 'md-football',
                id: 41
            },{
                name: t(lang).sports.POLO,
                icon: 'md-football',
                id: 42
            },{
                name: t(lang).sports.RUGBY,
                icon: 'md-football',
                id: 43
            },{
                name: t(lang).sports.VOLLEYBALL,
                icon: 'md-football',
                id: 44
            },{
                name: t(lang).sports.WATER_POLO,
                icon: 'md-football',
                id: 45
            },{
                name: t(lang).sports.AIKIDO,
                icon: 'md-shield',
                id: 46
            },{
                name: t(lang).sports.BOXING,
                icon: 'md-shield',
                id: 47
            },{
                name: t(lang).sports.CAPOEIRA,
                icon: 'md-shield',
                id: 48
            },{
                name: t(lang).sports.CATCH,
                icon: 'md-shield',
                id: 49
            },{
                name: t(lang).sports.FENCING,
                icon: 'md-shield',
                id: 50
            },{
                name: t(lang).sports.JUJITSU,
                icon: 'md-shield',
                id: 51
            },{
                name: t(lang).sports.JUDO,
                icon: 'md-shield',
                id: 52
            },{
                name: t(lang).sports.KARATE,
                icon: 'md-shield',
                id: 53
            },{
                name: t(lang).sports.KENDO,
                icon: 'md-shield',
                id: 54
            },{
                name: t(lang).sports.KENJUTSU,
                icon: 'md-shield',
                id: 55
            },{
                name: t(lang).sports.KICK_BOXING,
                icon: 'md-shield',
                id: 56
            },{
                name: t(lang).sports.KUNG_FU,
                icon: 'md-shield',
                id: 57
            },{
                name: t(lang).sports.KRAV_MAGA,
                icon: 'md-shield',
                id: 58
            },{
                name: t(lang).sports.MMA,
                icon: 'md-shield',
                id: 59
            },{
                name: t(lang).sports.TAEKWONDO,
                icon: 'md-shield',
                id: 60
            },{
                name: t(lang).sports.BMX,
                icon: 'md-trending-down',
                id: 61
            },{
                name: t(lang).sports.ICE_HOCKEY,
                icon: 'md-trending-down',
                id: 62
            },{
                name: t(lang).sports.KITESURFING_BOARD,
                icon: 'md-trending-down',
                id: 63
            },{
                name: t(lang).sports.ICE_SKATING,
                icon: 'md-trending-down',
                id: 64
            },{
                name: t(lang).sports.WINDSURFING,
                icon: 'md-trending-down',
                id: 65
            },{
                name: t(lang).sports.ROLLERSKATING,
                icon: 'md-trending-down',
                id: 66
            },{
                name: t(lang).sports.SKATEBOARDING,
                icon: 'md-trending-down',
                id: 67
            },{
                name: t(lang).sports.ALPINE_SKIING,
                icon: 'md-trending-down',
                id: 68
            },{
                name: t(lang).sports.WATER_SKIING,
                icon: 'md-trending-down',
                id: 69
            },{
                name: t(lang).sports.SNOWBOARDING,
                icon: 'md-trending-down',
                id: 70
            },{
                name: t(lang).sports.SURFING,
                icon: 'md-trending-down',
                id: 71
            },{
                name: t(lang).sports.WAKEBOARDING,
                icon: 'md-trending-down',
                id: 72
            },{
                name: t(lang).sports.ROWING,
                icon: 'md-boat',
                id: 73
            },{
                name: t(lang).sports.CANOEING,
                icon: 'md-boat',
                id: 74
            },{
                name: t(lang).sports.CANYONING,
                icon: 'md-boat',
                id: 75
            },{
                name: t(lang).sports.KAYAKING,
                icon: 'md-boat',
                id: 76
            },{
                name: t(lang).sports.SWIMMING,
                icon: 'md-boat',
                id: 77
            },{
                name: t(lang).sports.FISHING,
                icon: 'md-boat',
                id: 78
            },{
                name: t(lang).sports.SNORKELLING,
                icon: 'md-boat',
                id: 79
            },{
                name: t(lang).sports.RAFTING,
                icon: 'md-boat',
                id: 80
            },{
                name: t(lang).sports.BASE_JUMPING,
                icon: 'md-warning',
                id: 81
            },{
                name: t(lang).sports.ROCK_CLIMBING,
                icon: 'md-warning',
                id: 82
            },{
                name: t(lang).sports.SKYDIVING,
                icon: 'md-warning',
                id: 83
            },{
                name: t(lang).sports.PARAGLIDING,
                icon: 'md-warning',
                id: 84
            },{
                name: t(lang).sports.QUAD_BIKING,
                icon: 'md-warning',
                id: 85
            },{
                name: t(lang).sports.CAR_RALLY,
                icon: 'md-warning',
                id: 86
            }
        ]
    )
}