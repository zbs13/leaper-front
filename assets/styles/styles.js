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
    },
    mini: {
        width: 40
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

export const popup = StyleSheet.create({
    global: {
        position: "absolute",
        zIndex: 10000,
        bottom: 0,
        width: "100%",
    },
    success: {
        backgroundColor: global.colors.GREEN_SUCCESS
    },
    success_text: {
        color: global.colors.GREEN_SUCCESS_TEXT
    },
    error: {
        backgroundColor: global.colors.RED_ERROR
    },
    error_text: {
        color: global.colors.RED_ERROR_TEXT
    },
    wait: {
        backgroundColor: global.colors.ANTHRACITE
    },
    icon: {
        fontSize: 20,
        padding: 5,
    },
    icon_success: {
        color: global.colors.GREEN_SUCCESS_TEXT
    },
    icon_error: {
        color: global.colors.RED_ERROR_TEXT
    }
})

export const miniLoader = StyleSheet.create({
    main: {
        position: "absolute",
        top: 0
    }
})