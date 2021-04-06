import global from "./providers/global";
import HomeScreen from "./screens/HomeScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ListFavoritesScreen from "./screens/ListFavoritesScreen";
import ListFriendsScreen from "./screens/ListFriendsScreen";
import AddListScreen from "./screens/AddListScreen";
import MyEventsScreen from "./screens/MyEventsScreen";
import SportEventScreen from "./screens/SportEventScreen";
import MyGroupsScreen from "./screens/MyGroupsScreen";
import TestScreen from "./screens/TestScreen";
import headerType from "./components/headers/headers";

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
        header: ({navigation}) => (headerType.back(navigation, ""))
    },
    {
        name: "test",
        component: TestScreen,
        header: ({navigation}) => (headerType.back(navigation, "aaa"))
    }
]

export const HOME_withBottomMenu = [
    {
        name: global.screens.HOME,
        component: HomeScreen
    }
]

export const NOTIFICATIONS_withBottomMenu = [
    {
        name: global.screens.NOTIFICATIONS,
        component: NotificationsScreen
    }
]

export const FAVORITES_withBottomMenu = [
    {
        name: global.screens.FAVORITES,
        component: ListFavoritesScreen
    }
]

export const FRIENDS_withBottomMenu = [
    {
        name: global.screens.FRIENDS,
        component: ListFriendsScreen
    }
]

export const ADD_withBottomMenu = [
    {
        name: global.screens.ADD,
        component: AddListScreen
    }
]

// routes with only custom Header displayed
export const withCustomHeaderOnly = [
    {
        name: "test",
        component: TestScreen,
        header: ({navigation}) => (headerType.back(navigation, "aaa"))
    }
]