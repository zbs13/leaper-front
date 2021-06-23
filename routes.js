import global from "./providers/global";
import MyEventsScreen from "./screens/MyEventsScreen";
import SportEventScreen from "./screens/SportEventScreen";
import MyGroupsScreen from "./screens/MyGroupsScreen";
import SportEventDetailsScreen from "./screens/SportEventDetailsScreen";
import SharedContentScreen from "./screens/SharedContentScreen";
import TchatScreen from "./screens/TchatScreen";
import EditGroupEventScreen from "./screens/EditGroupEventScreen";
import CreateGroupEventScreen from "./screens/CreateGroupEventScreen";
import PeopleListScreen from "./screens/PeopleListScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import ManageRoleScreen from "./screens/ManageRoleScreen";
import CreateEditRoleScreen from "./screens/CreateEditRoleScreen";
import AllocateRoleScreen from "./screens/AllocateRoleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import WelcomeLanguageSelectionScreen from "./screens/auth/WelcomeLanguageSelectionScreen";
import headerType from "./components/headers/headers";
import AppSettingsScreen from "./screens/AppSettingsScreen";
import ChangeLanguageScreen from "./screens/ChangeLanguageScreen";
import ChangeNotificationsScreen from "./screens/ChangeNotificationsScreen";
import AboutScreen from "./screens/AboutScreen";
import ProfilSettingsScreen from "./screens/ProfilSettingsScreen";



export const auth = [
    {
        name: global.screens.LOGIN,
        component: LoginScreen
    },
    {
        name: global.screens.REGISTRATION,
        component: RegistrationScreen
    },
    {
        name: global.screens.WELCOME_LANGUAGE_SELECTION,
        component: WelcomeLanguageSelectionScreen
    }
]

// routes with home/custom Header and Bottom menu displayed
export const withBottomMenu = [
    {
        name: global.screens.MY_GROUPS,
        component: MyGroupsScreen
    },
    {
        name: global.screens.MY_EVENTS,
        component: MyEventsScreen
    },
    {
        name: global.screens.SPORT_EVENTS,
        component: SportEventScreen,
        header: ({navigation}) => (headerType.back())
    }
]

// routes with only custom Header displayed
export const withCustomHeaderOnly = [
    {
        name: global.screens.SPORT_EVENT_DETAILS,
        component: SportEventDetailsScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.TCHAT,
        component: TchatScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.SHARED_CONTENT,
        component: SharedContentScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.EDIT_GROUP_EVENT,
        component: EditGroupEventScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.CREATE_GROUP_EVENT,
        component: CreateGroupEventScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.PEOPLE_LIST,
        component: PeopleListScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.USER_PROFILE,
        component: UserProfileScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.MANAGE_ROLE,
        component: ManageRoleScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.CREATE_EDIT_ROLE,
        component: CreateEditRoleScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.ALLOCATE_ROLE,
        component: AllocateRoleScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.ADD_PERSON,
        component: AddPersonScreen,
        header: ({navigation}) => (headerType.back())
    }, 
    { 
        name: global.screens.APP_SETTINGS,
        component: AppSettingsScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.CHANGE_LANGUAGE,
        component: ChangeLanguageScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.CHANGE_NOTIFICATIONS,
        component: ChangeNotificationsScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.ABOUT,
        component: AboutScreen,
        header: ({navigation}) => (headerType.back())
    },
    {
        name: global.screens.PROFIL_SETTINGS,
        component: ProfilSettingsScreen,
        header: ({navigation}) => (headerType.back())
    },
]