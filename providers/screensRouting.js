import HomeScreen from '../screens/HomeScreen';
import global from './global';
import mainHeader from '../components/headers/mainHeader';

export default screensRouting = [
    {
        name: global.pages.HOME,
        component: HomeScreen,
        header: mainHeader
    }
]