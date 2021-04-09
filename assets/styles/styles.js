import { StyleSheet, Dimensions } from 'react-native';
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

export const home = StyleSheet.create({
    view: {
        margin: 20
    }  
})

export const card = StyleSheet.create({
    view: {
        marginTop: 10,
        marginBottom: 10
    },  
    cardContainer: {
        width: "100%",
        height: 150,
        backgroundColor: global.colors.WHITE,
        borderRadius: 5,
        shadowColor: global.colors.LIGHT_GREY,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    pic: {
        width: "100%",
        aspectRatio: 1
    }
})

export const tag = StyleSheet.create({
    container: {
        padding: 5,
        minWidth: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "red"
    },
    groupsEvents: {
        backgroundColor: global.colors.LIGHT_GREY
    },
    groupsEventsText: {
        color: global.colors.ANTHRACITE
    },
    notifs: {
        backgroundColor: global.colors.RED_NOTIFS,
    },
    notifsText: {
        color: global.colors.WHITE
    }
})

export const toggleLeftMenu = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        padding: 16,
        backgroundColor: '#F3F4F9',
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHandle: {
        width: 50,
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4,
        marginBottom: 20
    },
    item: {
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
});

export const pageTitle = StyleSheet.create({
    main: {
        color: global.colors.ANTHRACITE,
        fontSize: 25,
        fontWeight: "bold"
    },
    second: {
        color: global.colors.ANTHRACITE,
        fontSize: 20,
    },
    third: {
        color: global.colors.ANTHRACITE,
        fontSize: 18,
    }
});

export const filtersModal = StyleSheet.create({
    ctaTitle: {
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        height: 40, 
        backgroundColor: global.colors.MAIN_COLOR,
        shadowColor: global.colors.LIGHT_GREY,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 20,
        shadowOpacity: 1.0,
        elevation: 1
    },
    contentContainer: {
        backgroundColor: global.colors.WHITE,
        borderWidth: 1,
        borderColor: global.colors.MAIN_COLOR,
        height: Dimensions.get("window").height * 0.70 - 40,
        padding: 5
    }
})

export const fields = StyleSheet.create({
    text: {
        backgroundColor: "transparent",
        padding: 5,
        height: 50,
        fontSize: 15,
        borderBottomWidth: 2,
        borderBottomColor: global.colors.MAIN_COLOR
    }
})

export const calendarFilter = StyleSheet.create({
    container: {
        height: 320, 
        marginTop: 10, 
        marginBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: global.colors.LIGHT_GREY,
        borderTopColor: global.colors.LIGHT_GREY,
    }
})