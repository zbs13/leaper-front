import global from "./providers/global";
import HomeScreen from "./screens/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ListFavoritesScreen from "./src/screens/ListFavoritesScreen";
import ListFriendsScreen from "./src/screens/ListFriendsScreen";
import AddListScreen from "./screens/AddListScreen";
import MyEventsScreen from "./src/screens/MyEventsScreen";
import MyGroupsScreen from "./src/screens/MyGroupsScreen";
import TestScreen from "./screens/TestScreen";
import headerType from "./components/headers/headers";

// routes with home/custom Header and Bottom menu displayed
export const HOME_withBottomMenu = [
    {
        name: global.screens.HOME,
        component: HomeScreen
    },
    {
        name: global.screens.MY_GROUPS,
        component: MyGroupsScreen
    },
    {
        name: global.screens.MY_EVENTS,
        component: MyEventsScreen
    },
    {
        name: "test",
        component: TestScreen,
        header: ({ navigation }) => (headerType.back(navigation, "aaa"))
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
        header: ({ navigation }) => (headerType.back(navigation, "aaa"))
    }
]