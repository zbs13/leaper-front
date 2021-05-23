import t from './lang/translations';

export default global = {
    screens: {
        HOME: "Home",
        FAVORITES: "Favorites",
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
        USER_PROFILE: "UserProfile"
    },
    routing: {
        HOME_ROUTING: "HomeRouting",
        BOTTOM_MENU_ROUTING: "BottomMenuRouting",
        ADD_ROUTING: "AddRouting",
        FRIENDS_ROUTING: "FriendsRouting",
        NOTIFICATIONS_ROUTING: "NotificationsRouting",
        FAVORITES_ROUTING: "FavoritesRouting",
    },
    colors: {
        MAIN_COLOR: '#BDE023',
        LIGHT_MAIN_COLOR: "#DDEF91",
        ANTHRACITE: "#293231",
        GREY: "#9E9E9E",
        LIGHT_GREY: '#C6C6C6',
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
        REMOVE_USER: 1,
        ADD_USER: 2,
        DELETE_MESSAGE: 3,
        EDIT_INFOS: 4,
        ALL: [1, 2, 3, 4]
    },
    map: {
        DEFAULT_ZOOM_LATITUDE_DELTA: 0.0222, 
        DEFAULT_ZOOM_LONGITUDE_DELTA: 0.0021,
        DEFAULT_NOT_ZOOM_LATITUDE_DELTA: 10.0222, 
        DEFAULT_NOT_ZOOM_LONGITUDE_DELTA: 0.0021,
        DEFAULT_NOT_ZOOM_LONGITUDE: 2.47890900866457,
        DEFAULT_NOT_ZOOM_LATITUDE: 47.04374701872397,
        GOOGLE_MAP_API_KEY: "AIzaSyBiHTxaw_bmw2Mt4Y9xWrWzLJkmUD7shPg"
    },
    MAX_RESULT_PER_LOADED_PAGE: 20,
    validator: {
        PASSWORD_MIN_LENGTH: 7,
        regex : {
            PASSWORD_REQUIRMENT_NUM: /[(0-9)]/,
            PASSWORD_REQUIRMENT_MAJ: /[(A-Z)]/,
            ONLY_LETTERS: /[^A-Za-z]/,
            USERNAME: /[^A-Za-z0-9_*!$^]/,
            MAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            URI: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm
        }
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
    ),
    countries: [ { "name": "Afghanistan", "dial_code": "+93", "code": "AF", "flag": "🇦🇫" }, { "name": "Albania", "dial_code": "+355", "code": "AL", "flag": "🇦🇱" }, { "name": "Algeria", "dial_code": "+213", "code": "DZ", "flag": "🇩🇿" }, { "name": "AmericanSamoa", "dial_code": "+1684", "code": "AS", "flag": "🇦🇸" }, { "name": "Andorra", "dial_code": "+376", "code": "AD", "flag": "🇦🇩" }, { "name": "Angola", "dial_code": "+244", "code": "AO", "flag": "🇦🇴" }, { "name": "Anguilla", "dial_code": "+1264", "code": "AI", "flag": "🇦🇮" }, { "name": "Antarctica", "dial_code": "+672", "code": "AQ", "flag": "🇦🇶" }, { "name": "Antigua and Barbuda", "dial_code": "+1268", "code": "AG", "flag": "🇦🇬" }, { "name": "Argentina", "dial_code": "+54", "code": "AR", "flag": "🇦🇷" }, { "name": "Armenia", "dial_code": "+374", "code": "AM", "flag": "🇦🇲" }, { "name": "Aruba", "dial_code": "+297", "code": "AW", "flag": "🇦🇼" }, { "name": "Australia", "dial_code": "+61", "code": "AU", "preferred": true, "flag": "🇦🇺" }, { "name": "Austria", "dial_code": "+43", "code": "AT", "flag": "🇦🇹" }, { "name": "Azerbaijan", "dial_code": "+994", "code": "AZ", "flag": "🇦🇿" }, { "name": "Bahamas", "dial_code": "+1242", "code": "BS", "flag": "🇧🇸" }, { "name": "Bahrain", "dial_code": "+973", "code": "BH", "flag": "🇧🇭" }, { "name": "Bangladesh", "dial_code": "+880", "code": "BD", "flag": "🇧🇩" }, { "name": "Barbados", "dial_code": "+1246", "code": "BB", "flag": "🇧🇧" }, { "name": "Belarus", "dial_code": "+375", "code": "BY", "flag": "🇧🇾" }, { "name": "Belgium", "dial_code": "+32", "code": "BE", "flag": "🇧🇪" }, { "name": "Belize", "dial_code": "+501", "code": "BZ", "flag": "🇧🇿" }, { "name": "Benin", "dial_code": "+229", "code": "BJ", "flag": "🇧🇯" }, { "name": "Bermuda", "dial_code": "+1441", "code": "BM", "flag": "🇧🇲" }, { "name": "Bhutan", "dial_code": "+975", "code": "BT", "flag": "🇧🇹" }, { "name": "Bolivia, Plurinational State of", "dial_code": "+591", "code": "BO", "flag": "🇧🇴" }, { "name": "Bosnia and Herzegovina", "dial_code": "+387", "code": "BA", "flag": "🇧🇦" }, { "name": "Botswana", "dial_code": "+267", "code": "BW", "flag": "🇧🇼" }, { "name": "Brazil", "dial_code": "+55", "code": "BR", "flag": "🇧🇷" }, { "name": "British Indian Ocean Territory", "dial_code": "+246", "code": "IO", "flag": "🇮🇴" }, { "name": "Brunei Darussalam", "dial_code": "+673", "code": "BN", "flag": "🇧🇳" }, { "name": "Bulgaria", "dial_code": "+359", "code": "BG", "flag": "🇧🇬" }, { "name": "Burkina Faso", "dial_code": "+226", "code": "BF", "flag": "🇧🇫" }, { "name": "Burundi", "dial_code": "+257", "code": "BI", "flag": "🇧🇮" }, { "name": "Cambodia", "dial_code": "+855", "code": "KH", "flag": "🇰🇭" }, { "name": "Cameroon", "dial_code": "+237", "code": "CM", "flag": "🇨🇲" }, { "name": "Canada", "dial_code": "+1", "code": "CA", "flag": "🇨🇦" }, { "name": "Cape Verde", "dial_code": "+238", "code": "CV", "flag": "🇨🇻" }, { "name": "Cayman Islands", "dial_code": "+345", "code": "KY", "flag": "🇰🇾" }, { "name": "Central African Republic", "dial_code": "+236", "code": "CF", "flag": "🇨🇫" }, { "name": "Chad", "dial_code": "+235", "code": "TD", "flag": "🇹🇩" }, { "name": "Chile", "dial_code": "+56", "code": "CL", "flag": "🇨🇱" }, { "name": "China", "dial_code": "+86", "code": "CN", "flag": "🇨🇳" }, { "name": "Christmas Island", "dial_code": "+61", "code": "CX", "flag": "🇨🇽" }, { "name": "Cocos (Keeling) Islands", "dial_code": "+61", "code": "CC", "flag": "🇨🇨" }, { "name": "Colombia", "dial_code": "+57", "code": "CO", "flag": "🇨🇴" }, { "name": "Comoros", "dial_code": "+269", "code": "KM", "flag": "🇰🇲" }, { "name": "Congo", "dial_code": "+242", "code": "CG", "flag": "🇨🇬" }, { "name": "Congo, The Democratic Republic of the", "dial_code": "+243", "code": "CD", "flag": "🇨🇩" }, { "name": "Cook Islands", "dial_code": "+682", "code": "CK", "flag": "🇨🇰" }, { "name": "Costa Rica", "dial_code": "+506", "code": "CR", "flag": "🇨🇷" }, { "name": "Cote d'Ivoire", "dial_code": "+225", "code": "CI", "flag": "🇨🇮" }, { "name": "Croatia", "dial_code": "+385", "code": "HR", "flag": "🇭🇷" }, { "name": "Cuba", "dial_code": "+53", "code": "CU", "flag": "🇨🇺" }, { "name": "Cyprus", "dial_code": "+537", "code": "CY", "flag": "🇨🇾" }, { "name": "Czech Republic", "dial_code": "+420", "code": "CZ", "flag": "🇨🇿" }, { "name": "Denmark", "dial_code": "+45", "code": "DK", "flag": "🇩🇰" }, { "name": "Djibouti", "dial_code": "+253", "code": "DJ", "flag": "🇩🇯" }, { "name": "Dominica", "dial_code": "+1767", "code": "DM", "flag": "🇩🇲" }, { "name": "Dominican Republic", "dial_code": "+1849", "code": "DO", "flag": "🇩🇴" }, { "name": "Ecuador", "dial_code": "+593", "code": "EC", "flag": "🇪🇨" }, { "name": "Egypt", "dial_code": "+20", "code": "EG", "flag": "🇪🇬" }, { "name": "El Salvador", "dial_code": "+503", "code": "SV", "flag": "🇸🇻" }, { "name": "Equatorial Guinea", "dial_code": "+240", "code": "GQ", "flag": "🇬🇶" }, { "name": "Eritrea", "dial_code": "+291", "code": "ER", "flag": "🇪🇷" }, { "name": "Estonia", "dial_code": "+372", "code": "EE", "flag": "🇪🇪" }, { "name": "Ethiopia", "dial_code": "+251", "code": "ET", "flag": "🇪🇹" }, { "name": "Falkland Islands (Malvinas)", "dial_code": "+500", "code": "FK", "flag": "🇫🇰" }, { "name": "Faroe Islands", "dial_code": "+298", "code": "FO", "flag": "🇫🇴" }, { "name": "Fiji", "dial_code": "+679", "code": "FJ", "flag": "🇫🇯" }, { "name": "Finland", "dial_code": "+358", "code": "FI", "flag": "🇫🇮" }, { "name": "France", "dial_code": "+33", "code": "FR", "flag": "🇫🇷" }, { "name": "French Guiana", "dial_code": "+594", "code": "GF", "flag": "🇬🇫" }, { "name": "French Polynesia", "dial_code": "+689", "code": "PF", "flag": "🇵🇫" }, { "name": "Gabon", "dial_code": "+241", "code": "GA", "flag": "🇬🇦" }, { "name": "Gambia", "dial_code": "+220", "code": "GM", "flag": "🇬🇲" }, { "name": "Georgia", "dial_code": "+995", "code": "GE", "flag": "🇬🇪" }, { "name": "Germany", "dial_code": "+49", "code": "DE", "flag": "🇩🇪" }, { "name": "Ghana", "dial_code": "+233", "code": "GH", "flag": "🇬🇭" }, { "name": "Gibraltar", "dial_code": "+350", "code": "GI", "flag": "🇬🇮" }, { "name": "Greece", "dial_code": "+30", "code": "GR", "flag": "🇬🇷" }, { "name": "Greenland", "dial_code": "+299", "code": "GL", "flag": "🇬🇱" }, { "name": "Grenada", "dial_code": "+1473", "code": "GD", "flag": "🇬🇩" }, { "name": "Guadeloupe", "dial_code": "+590", "code": "GP", "flag": "🇬🇵" }, { "name": "Guam", "dial_code": "+1671", "code": "GU", "flag": "🇬🇺" }, { "name": "Guatemala", "dial_code": "+502", "code": "GT", "flag": "🇬🇹" }, { "name": "Guernsey", "dial_code": "+44", "code": "GG", "flag": "🇬🇬" }, { "name": "Guinea", "dial_code": "+224", "code": "GN", "flag": "🇬🇳" }, { "name": "Guinea-Bissau", "dial_code": "+245", "code": "GW", "flag": "🇬🇼" }, { "name": "Guyana", "dial_code": "+595", "code": "GY", "flag": "🇬🇾" }, { "name": "Haiti", "dial_code": "+509", "code": "HT", "flag": "🇭🇹" }, { "name": "Holy See (Vatican City State)", "dial_code": "+379", "code": "VA", "flag": "🇻🇦" }, { "name": "Honduras", "dial_code": "+504", "code": "HN", "flag": "🇭🇳" }, { "name": "Hong Kong", "dial_code": "+852", "code": "HK", "flag": "🇭🇰" }, { "name": "Hungary", "dial_code": "+36", "code": "HU", "flag": "🇭🇺" }, { "name": "Iceland", "dial_code": "+354", "code": "IS", "flag": "🇮🇸" }, { "name": "India", "dial_code": "+91", "code": "IN", "preferred": true, "flag": "🇮🇳" }, { "name": "Indonesia", "dial_code": "+62", "code": "ID", "flag": "🇮🇩" }, { "name": "Iran, Islamic Republic of", "dial_code": "+98", "code": "IR", "flag": "🇮🇷" }, { "name": "Iraq", "dial_code": "+964", "code": "IQ", "flag": "🇮🇶" }, { "name": "Ireland", "dial_code": "+353", "code": "IE", "flag": "🇮🇪" }, { "name": "Isle of Man", "dial_code": "+44", "code": "IM", "flag": "🇮🇲" }, { "name": "Israel", "dial_code": "+972", "code": "IL", "flag": "🇮🇱" }, { "name": "Italy", "dial_code": "+39", "code": "IT", "flag": "🇮🇹" }, { "name": "Jamaica", "dial_code": "+1876", "code": "JM", "flag": "🇯🇲" }, { "name": "Japan", "dial_code": "+81", "code": "JP", "flag": "🇯🇵" }, { "name": "Jersey", "dial_code": "+44", "code": "JE", "flag": "🇯🇪" }, { "name": "Jordan", "dial_code": "+962", "code": "JO", "flag": "🇯🇴" }, { "name": "Kazakhstan", "dial_code": "+77", "code": "KZ", "flag": "🇰🇿" }, { "name": "Kenya", "dial_code": "+254", "code": "KE", "flag": "🇰🇪" }, { "name": "Kiribati", "dial_code": "+686", "code": "KI", "flag": "🇰🇮" }, { "name": "Korea, Democratic People's Republic of", "dial_code": "+850", "code": "KP", "flag": "🇰🇵" }, { "name": "Korea, Republic of", "dial_code": "+82", "code": "KR", "flag": "🇰🇷" }, { "name": "Kuwait", "dial_code": "+965", "code": "KW", "flag": "🇰🇼" }, { "name": "Kyrgyzstan", "dial_code": "+996", "code": "KG", "flag": "🇰🇬" }, { "name": "Lao People's Democratic Republic", "dial_code": "+856", "code": "LA", "flag": "🇱🇦" }, { "name": "Latvia", "dial_code": "+371", "code": "LV", "flag": "🇱🇻" }, { "name": "Lebanon", "dial_code": "+961", "code": "LB", "flag": "🇱🇧" }, { "name": "Lesotho", "dial_code": "+266", "code": "LS", "flag": "🇱🇸" }, { "name": "Liberia", "dial_code": "+231", "code": "LR", "flag": "🇱🇷" }, { "name": "Libyan Arab Jamahiriya", "dial_code": "+218", "code": "LY", "flag": "🇱🇾" }, { "name": "Liechtenstein", "dial_code": "+423", "code": "LI", "flag": "🇱🇮" }, { "name": "Lithuania", "dial_code": "+370", "code": "LT", "flag": "🇱🇹" }, { "name": "Luxembourg", "dial_code": "+352", "code": "LU", "flag": "🇱🇺" }, { "name": "Macao", "dial_code": "+853", "code": "MO", "flag": "🇲🇴" }, { "name": "Macedonia, The Former Yugoslav Republic of", "dial_code": "+389", "code": "MK", "flag": "🇲🇰" }, { "name": "Madagascar", "dial_code": "+261", "code": "MG", "flag": "🇲🇬" }, { "name": "Malawi", "dial_code": "+265", "code": "MW", "flag": "🇲🇼" }, { "name": "Malaysia", "dial_code": "+60", "code": "MY", "flag": "🇲🇾" }, { "name": "Maldives", "dial_code": "+960", "code": "MV", "flag": "🇲🇻" }, { "name": "Mali", "dial_code": "+223", "code": "ML", "flag": "🇲🇱" }, { "name": "Malta", "dial_code": "+356", "code": "MT", "flag": "🇲🇹" }, { "name": "Marshall Islands", "dial_code": "+692", "code": "MH", "flag": "🇲🇭" }, { "name": "Martinique", "dial_code": "+596", "code": "MQ", "flag": "🇲🇶" }, { "name": "Mauritania", "dial_code": "+222", "code": "MR", "flag": "🇲🇷" }, { "name": "Mauritius", "dial_code": "+230", "code": "MU", "flag": "🇲🇺" }, { "name": "Mayotte", "dial_code": "+262", "code": "YT", "flag": "🇾🇹" }, { "name": "Mexico", "dial_code": "+52", "code": "MX", "flag": "🇲🇽" }, { "name": "Micronesia, Federated States of", "dial_code": "+691", "code": "FM", "flag": "🇫🇲" }, { "name": "Moldova, Republic of", "dial_code": "+373", "code": "MD", "flag": "🇲🇩" }, { "name": "Monaco", "dial_code": "+377", "code": "MC", "flag": "🇲🇨" }, { "name": "Mongolia", "dial_code": "+976", "code": "MN", "flag": "🇲🇳" }, { "name": "Montenegro", "dial_code": "+382", "code": "ME", "flag": "🇲🇪" }, { "name": "Montserrat", "dial_code": "+1664", "code": "MS", "flag": "🇲🇸" }, { "name": "Morocco", "dial_code": "+212", "code": "MA", "flag": "🇲🇦" }, { "name": "Mozambique", "dial_code": "+258", "code": "MZ", "flag": "🇲🇿" }, { "name": "Myanmar", "dial_code": "+95", "code": "MM", "flag": "🇲🇲" }, { "name": "Namibia", "dial_code": "+264", "code": "NA", "flag": "🇳🇦" }, { "name": "Nauru", "dial_code": "+674", "code": "NR", "flag": "🇳🇷" }, { "name": "Nepal", "dial_code": "+977", "code": "NP", "flag": "🇳🇵" }, { "name": "Netherlands", "dial_code": "+31", "code": "NL", "flag": "🇳🇱" }, { "name": "Netherlands Antilles", "dial_code": "+599", "code": "AN", "flag": "🇦🇳" }, { "name": "New Caledonia", "dial_code": "+687", "code": "NC", "flag": "🇳🇨" }, { "name": "New Zealand", "dial_code": "+64", "code": "NZ", "flag": "🇳🇿" }, { "name": "Nicaragua", "dial_code": "+505", "code": "NI", "flag": "🇳🇮" }, { "name": "Niger", "dial_code": "+227", "code": "NE", "flag": "🇳🇪" }, { "name": "Nigeria", "dial_code": "+234", "code": "NG", "flag": "🇳🇬" }, { "name": "Niue", "dial_code": "+683", "code": "NU", "flag": "🇳🇺" }, { "name": "Norfolk Island", "dial_code": "+672", "code": "NF", "flag": "🇳🇫" }, { "name": "Northern Mariana Islands", "dial_code": "+1670", "code": "MP", "flag": "🇲🇵" }, { "name": "Norway", "dial_code": "+47", "code": "NO", "flag": "🇳🇴" }, { "name": "Oman", "dial_code": "+968", "code": "OM", "flag": "🇴🇲" }, { "name": "Pakistan", "dial_code": "+92", "code": "PK", "flag": "🇵🇰" }, { "name": "Palau", "dial_code": "+680", "code": "PW", "flag": "🇵🇼" }, { "name": "Palestinian Territory, Occupied", "dial_code": "+970", "code": "PS", "flag": "🇵🇸" }, { "name": "Panama", "dial_code": "+507", "code": "PA", "flag": "🇵🇦" }, { "name": "Papua New Guinea", "dial_code": "+675", "code": "PG", "flag": "🇵🇬" }, { "name": "Paraguay", "dial_code": "+595", "code": "PY", "flag": "🇵🇾" }, { "name": "Peru", "dial_code": "+51", "code": "PE", "flag": "🇵🇪" }, { "name": "Philippines", "dial_code": "+63", "code": "PH", "flag": "🇵🇭" }, { "name": "Pitcairn", "dial_code": "+872", "code": "PN", "flag": "🇵🇳" }, { "name": "Poland", "dial_code": "+48", "code": "PL", "flag": "🇵🇱" }, { "name": "Portugal", "dial_code": "+351", "code": "PT", "flag": "🇵🇹" }, { "name": "Puerto Rico", "dial_code": "+1939", "code": "PR", "flag": "🇵🇷" }, { "name": "Qatar", "dial_code": "+974", "code": "QA", "flag": "🇶🇦" }, { "name": "Romania", "dial_code": "+40", "code": "RO", "flag": "🇷🇴" }, { "name": "Russia", "dial_code": "+7", "code": "RU", "flag": "🇷🇺" }, { "name": "Rwanda", "dial_code": "+250", "code": "RW", "flag": "🇷🇼" }, { "name": "Réunion", "dial_code": "+262", "code": "RE", "flag": "🇷🇪" }, { "name": "Saint Barthélemy", "dial_code": "+590", "code": "BL", "flag": "🇧🇱" }, { "name": "Saint Helena, Ascension and Tristan Da Cunha", "dial_code": "+290", "code": "SH", "flag": "🇸🇭" }, { "name": "Saint Kitts and Nevis", "dial_code": "+1869", "code": "KN", "flag": "🇰🇳" }, { "name": "Saint Lucia", "dial_code": "+1758", "code": "LC", "flag": "🇱🇨" }, { "name": "Saint Martin", "dial_code": "+590", "code": "MF", "flag": "🇲🇫" }, { "name": "Saint Pierre and Miquelon", "dial_code": "+508", "code": "PM", "flag": "🇵🇲" }, { "name": "Saint Vincent and the Grenadines", "dial_code": "+1784", "code": "VC", "flag": "🇻🇨" }, { "name": "Samoa", "dial_code": "+685", "code": "WS", "flag": "🇼🇸" }, { "name": "San Marino", "dial_code": "+378", "code": "SM", "flag": "🇸🇲" }, { "name": "Sao Tome and Principe", "dial_code": "+239", "code": "ST", "flag": "🇸🇹" }, { "name": "Saudi Arabia", "dial_code": "+966", "code": "SA", "flag": "🇸🇦" }, { "name": "Senegal", "dial_code": "+221", "code": "SN", "flag": "🇸🇳" }, { "name": "Serbia", "dial_code": "+381", "code": "RS", "flag": "🇷🇸" }, { "name": "Seychelles", "dial_code": "+248", "code": "SC", "flag": "🇸🇨" }, { "name": "Sierra Leone", "dial_code": "+232", "code": "SL", "flag": "🇸🇱" }, { "name": "Singapore", "dial_code": "+65", "code": "SG", "flag": "🇸🇬" }, { "name": "Slovakia", "dial_code": "+421", "code": "SK", "flag": "🇸🇰" }, { "name": "Slovenia", "dial_code": "+386", "code": "SI", "flag": "🇸🇮" }, { "name": "Solomon Islands", "dial_code": "+677", "code": "SB", "flag": "🇸🇧" }, { "name": "Somalia", "dial_code": "+252", "code": "SO", "flag": "🇸🇴" }, { "name": "South Africa", "dial_code": "+27", "code": "ZA", "flag": "🇿🇦" }, { "name": "South Georgia and the South Sandwich Islands", "dial_code": "+500", "code": "GS", "flag": "🇬🇸" }, { "name": "Spain", "dial_code": "+34", "code": "ES", "flag": "🇪🇸" }, { "name": "Sri Lanka", "dial_code": "+94", "code": "LK", "flag": "🇱🇰" }, { "name": "Sudan", "dial_code": "+249", "code": "SD", "flag": "🇸🇩" }, { "name": "Suriname", "dial_code": "+597", "code": "SR", "flag": "🇸🇷" }, { "name": "Svalbard and Jan Mayen", "dial_code": "+47", "code": "SJ", "flag": "🇸🇯" }, { "name": "Swaziland", "dial_code": "+268", "code": "SZ", "flag": "🇸🇿" }, { "name": "Sweden", "dial_code": "+46", "code": "SE", "flag": "🇸🇪" }, { "name": "Switzerland", "dial_code": "+41", "code": "CH", "flag": "🇨🇭" }, { "name": "Syrian Arab Republic", "dial_code": "+963", "code": "SY", "flag": "🇸🇾" }, { "name": "Taiwan, Province of China", "dial_code": "+886", "code": "TW", "flag": "🇹🇼" }, { "name": "Tajikistan", "dial_code": "+992", "code": "TJ", "flag": "🇹🇯" }, { "name": "Tanzania, United Republic of", "dial_code": "+255", "code": "TZ", "flag": "🇹🇿" }, { "name": "Thailand", "dial_code": "+66", "code": "TH", "flag": "🇹🇭" }, { "name": "Timor-Leste", "dial_code": "+670", "code": "TL", "flag": "🇹🇱" }, { "name": "Togo", "dial_code": "+228", "code": "TG", "flag": "🇹🇬" }, { "name": "Tokelau", "dial_code": "+690", "code": "TK", "flag": "🇹🇰" }, { "name": "Tonga", "dial_code": "+676", "code": "TO", "flag": "🇹🇴" }, { "name": "Trinidad and Tobago", "dial_code": "+1868", "code": "TT", "flag": "🇹🇹" }, { "name": "Tunisia", "dial_code": "+216", "code": "TN", "flag": "🇹🇳" }, { "name": "Turkey", "dial_code": "+90", "code": "TR", "flag": "🇹🇷" }, { "name": "Turkmenistan", "dial_code": "+993", "code": "TM", "flag": "🇹🇲" }, { "name": "Turks and Caicos Islands", "dial_code": "+1649", "code": "TC", "flag": "🇹🇨" }, { "name": "Tuvalu", "dial_code": "+688", "code": "TV", "flag": "🇹🇻" }, { "name": "Uganda", "dial_code": "+256", "code": "UG", "flag": "🇺🇬" }, { "name": "Ukraine", "dial_code": "+380", "code": "UA", "flag": "🇺🇦" }, { "name": "United Arab Emirates", "dial_code": "+971", "code": "AE", "preferred": true, "flag": "🇦🇪" }, { "name": "United Kingdom", "dial_code": "+44", "code": "GB", "preferred": true, "flag": "🇬🇧" }, { "name": "United States", "dial_code": "+1", "code": "US", "preferred": true, "flag": "🇺🇸" }, { "name": "Uruguay", "dial_code": "+598", "code": "UY", "flag": "🇺🇾" }, { "name": "Uzbekistan", "dial_code": "+998", "code": "UZ", "flag": "🇺🇿" }, { "name": "Vanuatu", "dial_code": "+678", "code": "VU", "flag": "🇻🇺" }, { "name": "Venezuela, Bolivarian Republic of", "dial_code": "+58", "code": "VE", "flag": "🇻🇪" }, { "name": "Viet Nam", "dial_code": "+84", "code": "VN", "flag": "🇻🇳" }, { "name": "Virgin Islands, British", "dial_code": "+1284", "code": "VG", "flag": "🇻🇬" }, { "name": "Virgin Islands, U.S.", "dial_code": "+1340", "code": "VI", "flag": "🇻🇮" }, { "name": "Wallis and Futuna", "dial_code": "+681", "code": "WF", "flag": "🇼🇫" }, { "name": "Yemen", "dial_code": "+967", "code": "YE", "flag": "🇾🇪" }, { "name": "Zambia", "dial_code": "+260", "code": "ZM", "flag": "🇿🇲" }, { "name": "Zimbabwe", "dial_code": "+263", "code": "ZW", "flag": "🇿🇼" }, { "name": "Åland Islands", "dial_code": "+358", "code": "AX", "flag": "🇦🇽" } ]
}