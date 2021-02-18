import { langs, getUserLang } from './langs';

export default global = {
    screens: {
        HOME: "Home",
        ADD: "Add",
        FAVORITES: "Favorites",
        FRIENDS: "Friends",
        NOTIFICATIONS: "Notifications",
        SETTINGS: "Settings",
        SPORT_EVENTS: "SportEvents"
    },
    colors: {
        MAIN_COLOR: '#BDE023',
        ANTHRACITE: "#293231",
        LIGHT_GREY: '#C6C6C6'
    },
    listSports: 
    [
        {
            name: 'Home',
            icon: 'md-home',
            component: 'Home'
        },{
            name: 'Biathlon',
            icon: 'md-stopwatch',
            id: 1
        },{
            name: 'Courses',
            icon: 'md-stopwatch',
            id: 2
        },{
            name: 'Cyclisme',
            icon: 'md-stopwatch',
            id: 3
        },{
            name: 'Lancers',
            icon: 'md-stopwatch',
            id: 4
        },{
            name: 'Marche',
            icon: 'md-stopwatch',
            id: 5
        },{
            name: 'Marathon',
            icon: 'md-stopwatch',
            id: 6
        },{
            name: 'Sauts',
            icon: 'md-stopwatch',
            id: 7
        },{
            name: 'Triathlon',
            icon: 'md-stopwatch',
            id: 8
        },{
            name: 'Crossfit',
            icon: 'md-barbell',
            id: 9
        },{
            name: 'Halterophilie',
            icon: 'md-barbell',
            id: 10
        },{
            name: 'Parkour',
            icon: 'md-barbell',
            id: 11
        },{
            name: 'Pilate',
            icon: 'md-barbell',
            id: 12
        },{
            name: 'Step',
            icon: 'md-barbell',
            id: 13
        },{
            name: 'Yoga',
            icon: 'md-barbell',
            id: 14
        },{
            name: 'Gymnastique',
            icon: 'md-medal',
            id: 15
        },{
            name: 'Airsoft',
            icon: 'md-pint',
            id: 16
        },{
            name: 'Baby-foot',
            icon: 'md-pint',
            id: 17
        },{
            name: 'Billard',
            icon: 'md-pint',
            id: 18
        },{
            name: 'Bowling',
            icon: 'md-pint',
            id: 19
        },{
            name: 'Danse',
            icon: 'md-pint',
            id: 20
        },{
            name: 'Echecs',
            icon: 'md-pint',
            id: 21
        },{
            name: 'Equitation',
            icon: 'md-pint',
            id: 22
        },{
            name: 'Karting',
            icon: 'md-pint',
            id: 23
        },{
            name: 'Paintball',
            icon: 'md-pint',
            id: 24
        },{
            name: 'Pétanque',
            icon: 'md-pint',
            id: 25
        },{
            name: 'Tir à l’arc',
            icon: 'md-pint',
            id: 26
        },{
            name: 'Ultimate',
            icon: 'md-pint',
            id: 27
        },{
            name: 'Badminton',
            icon: 'md-football',
            id: 28
        },{
            name: 'Baseball',
            icon: 'md-football',
            id: 29
        },{
            name: 'Basketball',
            icon: 'md-football',
            id: 30
        },{
            name: 'Cricket',
            icon: 'md-football',
            id: 31
        },{
            name: 'Football',
            icon: 'md-football',
            id: 32
        },{
            name: 'Football americain',
            icon: 'md-football',
            id: 33
        },{
            name: 'Futsal',
            icon: 'md-football',
            id: 34
        },{
            name: 'Golf',
            icon: 'md-football',
            id: 35
        },{
            name: 'Handball',
            icon: 'md-football',
            id: 36
        },{
            name: 'Hockey sur gazon',
            icon: 'md-football',
            id: 37
        },{
            name: 'Squash',
            icon: 'md-football',
            id: 38
        },{
            name: 'Pelote basque',
            icon: 'md-football',
            id: 39
        },{
            name: 'Tennis',
            icon: 'md-football',
            id: 40
        },{
            name: 'Tennis de table',
            icon: 'md-football',
            id: 41
        },{
            name: 'Polo',
            icon: 'md-football',
            id: 42
        },{
            name: 'Rugby',
            icon: 'md-football',
            id: 43
        },{
            name: 'Volley ball',
            icon: 'md-football',
            id: 44
        },{
            name: 'Water polo',
            icon: 'md-football',
            id: 45
        },{
            name: 'Aikido',
            icon: 'md-shield',
            id: 46
        },{
            name: 'Boxe',
            icon: 'md-shield',
            id: 47
        },{
            name: 'Capoeira',
            icon: 'md-shield',
            id: 48
        },{
            name: 'Catch',
            icon: 'md-shield',
            id: 49
        },{
            name: 'Escrime',
            icon: 'md-shield',
            id: 50
        },{
            name: 'Ju-jitsu',
            icon: 'md-shield',
            id: 51
        },{
            name: 'Judo',
            icon: 'md-shield',
            id: 52
        },{
            name: 'Karaté',
            icon: 'md-shield',
            id: 53
        },{
            name: 'Kendo',
            icon: 'md-shield',
            id: 54
        },{
            name: 'Kenjutsu',
            icon: 'md-shield',
            id: 55
        },{
            name: 'Kick boxing',
            icon: 'md-shield',
            id: 56
        },{
            name: 'Kung-fu',
            icon: 'md-shield',
            id: 57
        },{
            name: 'Krav maga',
            icon: 'md-shield',
            id: 58
        },{
            name: 'MMA',
            icon: 'md-shield',
            id: 59
        },{
            name: 'Taekwondo',
            icon: 'md-shield',
            id: 60
        },{
            name: 'Bmx',
            icon: 'md-trending-down',
            id: 61
        },{
            name: 'Hockey sur glace',
            icon: 'md-trending-down',
            id: 62
        },{
            name: 'Kitesurfing',
            icon: 'md-trending-down',
            id: 63
        },{
            name: 'Patinage',
            icon: 'md-trending-down',
            id: 64
        },{
            name: 'Planche à voile',
            icon: 'md-trending-down',
            id: 65
        },{
            name: 'Roller',
            icon: 'md-trending-down',
            id: 66
        },{
            name: 'Skateboard',
            icon: 'md-trending-down',
            id: 67
        },{
            name: 'Ski alpin',
            icon: 'md-trending-down',
            id: 68
        },{
            name: 'Ski nautique',
            icon: 'md-trending-down',
            id: 69
        },{
            name: 'Snowboard',
            icon: 'md-trending-down',
            id: 70
        },{
            name: 'Surf',
            icon: 'md-trending-down',
            id: 71
        },{
            name: 'Wakeboard',
            icon: 'md-trending-down',
            id: 72
        },{
            name: 'Aviron',
            icon: 'md-boat',
            id: 73
        },{
            name: 'Canoe',
            icon: 'md-boat',
            id: 74
        },{
            name: 'Canyoning',
            icon: 'md-boat',
            id: 75
        },{
            name: 'Kayak',
            icon: 'md-boat',
            id: 76
        },{
            name: 'Natation',
            icon: 'md-boat',
            id: 77
        },{
            name: 'Pêche',
            icon: 'md-boat',
            id: 78
        },{
            name: 'Plongée',
            icon: 'md-boat',
            id: 79
        },{
            name: 'Rafting',
            icon: 'md-boat',
            id: 80
        },{
            name: 'Base jump',
            icon: 'md-warning',
            id: 81
        },{
            name: 'Escalade',
            icon: 'md-warning',
            id: 82
        },{
            name: 'Parachutisme',
            icon: 'md-warning',
            id: 83
        },{
            name: 'Parapente',
            icon: 'md-warning',
            id: 84
        },{
            name: 'Quad',
            icon: 'md-warning',
            id: 85
        },{
            name: 'Rallye Automobile',
            icon: 'md-warning',
            id: 86
        }
    ]
}