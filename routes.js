import global from "./providers/global";
import MyEventsScreen from "./screens/MyEventsScreen";
import SportEventScreen from "./screens/SportEventScreen";
import MyGroupsScreen from "./screens/MyGroupsScreen";
import SportEventDetailsScreen from "./screens/SportEventDetailsScreen";
import SharedContentScreen from "./screens/SharedContentScreen";
import TchatScreen from "./screens/TchatScreen";
import TestScreen from "./screens/TestScreen";
import EditGroupEventScreen from "./screens/EditGroupEventScreen";
import CreateGroupEventScreen from "./screens/CreateGroupEventScreen";
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
    }
]

// routes with only custom Header displayed
export const withCustomHeaderOnly = [
    {
        name: "test",
        component: TestScreen,
        header: ({navigation}) => (headerType.back(navigation, "aaa"))
    },
    {
        name: global.screens.SPORT_EVENT_DETAILS,
        component: SportEventDetailsScreen,
        header: ({navigation}) => (headerType.back(navigation, ""))
    },
    {
        name: global.screens.TCHAT,
        component: TchatScreen,
        header: ({navigation}) => (headerType.back(navigation, ""))
    },
    {
        name: global.screens.SHARED_CONTENT,
        component: SharedContentScreen,
        header: ({navigation}) => (headerType.back(navigation, ""))
    },
    {
        name: global.screens.EDIT_GROUP_EVENT,
        component: EditGroupEventScreen,
        header: ({navigation}) => (headerType.back(navigation, ""))
    },
    {
        name: global.screens.CREATE_GROUP_EVENT,
        component: CreateGroupEventScreen,
        header: ({navigation}) => (headerType.back(navigation, ""))
    }
]