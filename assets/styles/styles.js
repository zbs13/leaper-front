import { StyleSheet } from 'react-native';
import global from '../../providers/global';

export const header = StyleSheet.create({
    headerRightContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcons: {
        fontSize: 30,
        borderRadius: 50,
        color: global.colors.ANTHRACITE
    },
    headerProfilePic: {
        borderRadius: 50,
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: global.colors.MAIN_COLOR
    },
    headerBackIcon: {
        color: global.colors.MAIN_COLOR,
        marginLeft: 10
    }
});

export const logo = StyleSheet.create({
    loading: {
        width: 250
    },
    header: {
        width: 150
    }
});

export const cta = StyleSheet.create({
    main: {
        borderRadius: 20,
        padding: 10
    },
    first: {
        backgroundColor: global.colors.MAIN_COLOR,
        color: global.colors.ANTHRACITE,
    }
});

export const text = StyleSheet.create({
    searchTitle: {
        color: global.colors.ANTHRACITE,
        fontWeight: "bold",
        fontSize: 20,
        maxWidth: "75%"
    }
})