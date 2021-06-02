import { cacheSlot } from '@apollo/client/cache';
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
        padding: 10
    },
    first: {
        borderRadius: 20,
        backgroundColor: global.colors.MAIN_COLOR,
        color: global.colors.ANTHRACITE,
    },
    first_nr: {
        backgroundColor: global.colors.MAIN_COLOR,
        color: global.colors.ANTHRACITE,
    },
    b_red: {
        borderRadius: 20,
        backgroundColor: global.colors.RED_ERROR,
        color: global.colors.WHITE,
    },
    b_red_nr: {
        backgroundColor: global.colors.RED_ERROR,
        color: global.colors.WHITE,
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
    info: {
        backgroundColor: global.colors.LIGHT_GREY
    },
    info_text: {
        color: global.colors.ANTHRACITE
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
    },
    icon_info: {
        color: global.colors.ANTHRACITE
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

export const personCard = StyleSheet.create({
    view: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: global.colors.VERY_LIGHT_GREY
    },
    profilePic: {
        width: 50,
        height: 50
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
    },
    textarea: {
        backgroundColor: "transparent",
        padding: 5,
        marginTop: 10,
        fontSize: 15,
        borderBottomWidth: 2,
        borderBottomColor: global.colors.MAIN_COLOR,
        margin: 0
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

export const eventDetailsMap = StyleSheet.create({
    container: {
        width: "100%", 
        height: 300
    }
})

export const ctaJoinEventDetails = StyleSheet.create({
    container: {
        position: "absolute", 
        bottom: 0, 
        width: "100%"
    }
})

export const optionsModal = StyleSheet.create({
    container: {
      backgroundColor: global.colors.WHITE,
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    containerTitle: {
      borderBottomColor: global.colors.LIGHT_GREY, 
      borderBottomWidth: 1, 
      marginBottom: 10
    },
    title: {
      padding: 20, 
      fontSize: 20, 
      color: global.colors.ANTHRACITE
    },
    optionCta: {
      color: global.colors.ANTHRACITE, 
      fontSize: 20
    },
    cancel: {
      color: global.colors.MAIN_COLOR, 
      fontSize: 20
    }
});

export const tchatBar = StyleSheet.create({
    container: {
        backgroundColor: global.colors.WHITE,
        bottom: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: global.colors.MAIN_COLOR,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5
    },
    input: {
        padding: 10,
        backgroundColor: global.colors.VERY_LIGHT_GREY,
        borderRadius: 5,
        maxHeight: 100
    },
    imagePreviewContainer: {
        backgroundColor: global.colors.VERY_LIGHT_GREY,
        borderRadius: 5,
        maxHeight: 100
    },
    imagePreview: {
        width: "100%",
        height: 200
    },
    imagePreviewDelete: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        margin: 10
    }
});
export const settings =  StyleSheet.create({
    bg: {
      backgroundColor: 'white',
      height: 750, 
      display: "flex"
    },
    borderPic: {
      borderRadius: 100,
      width: 106,
      height: 106,
      borderWidth: 3,
      borderColor: global.colors.MAIN_COLOR
    },
    pic: {
      alignContent: "center",
      alignItems: "center",
      marginTop: 30,
    },
    titleParams:{
      fontSize: 25,
      margin: 10
    },
    settings:{
      marginTop: 50
    },
    buttonStyle: {
      backgroundColor: 'white',
      margin: 10
    },
    buttonFont: {
      color: "black",
      fontSize: 15,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    name: {
      fontSize: 15
    },
    buttonLogout: {
        marginTop: 170
    }

  });

export const messageCard = StyleSheet.create({
    container: {
        margin: 5
    },
    content: {
        marginLeft: 5,
        padding: 10,
        borderRadius: 5,
        maxWidth: Dimensions.get('window').width - 55
    },
    contentMy: {
        backgroundColor: global.colors.MAIN_COLOR,
    },
    contentNotMy: {
        backgroundColor: global.colors.VERY_LIGHT_GREY,
    },
    profilePicContainer: {
        height: 40, 
        width: 40
    },
    profilePic: {
        borderRadius: 50
    },
    date: {
        fontSize: 11,
        fontStyle: "italic",
        color: global.colors.GREY
    },
    firstname: {
        fontSize: 13
    }
});

export const video = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    containerPreview: {
        alignSelf: 'center',
        width: "100%",
        height: "100%"
    }
});

export const uri = StyleSheet.create({
    main: {
        color: global.colors.URI
    }
});

export const fileDownload = StyleSheet.create({
    block: {
        position: "absolute", 
        zIndex: 1, width: "100%", 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center"
    },
    loaderBlock: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: global.colors.ANTHRACITE, 
        alignItems: "center", 
        justifyContent: "center"
    },
    innerLoader: {
        backgroundColor: global.colors.MAIN_COLOR, 
        height: "100%", 
        borderRadius: 50
    },
    pourcent: {
        position: "absolute", 
        fontWeight: "bold", 
        fontSize: 18
    },
});

export const image = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    containerPreview: {
        alignSelf: 'center',
        width: "100%",
        height: "100%"
    }
});

export const fullscreen = StyleSheet.create({
    cta: {
        color: global.colors.WHITE
    }
})

export const select = StyleSheet.create({
    cta: {
        borderBottomWidth: 2, 
        borderBottomColor: global.colors.MAIN_COLOR, 
        padding: 10
    },
    list: {
        height: 300, 
        width: "100%", 
        backgroundColor: global.colors.WHITE
    },
    separator: {
        width: "100%", 
        height: 2, 
        backgroundColor: global.colors.VERY_LIGHT_GREY
    }
})

export const fieldDate = StyleSheet.create({
    container: {
        height: 100, 
        backgroundColor: global.colors.ANTHRACITE
    },
    cta: {
        borderBottomWidth: 2, 
        borderBottomColor: global.colors.MAIN_COLOR, 
        height: 40, 
        textAlign: "left"
    }
})

export const profile = StyleSheet.create({
    header: {
        borderBottomWidth: 1, 
        borderBottomColor: 
        global.colors.LIGHT_GREY
    },
    headerPicContainer: {
        width: 120, 
        height: 120
    },
    headerPic: {
        borderWidth: 2, 
        borderColor: global.colors.MAIN_COLOR
    },
    headerName: {
        fontSize: 15
    }
})

export const roleCard = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: global.colors.LIGHT_GREY
    }
})

export const mapFavs = StyleSheet.create({
    container: {
        width: "100%",
        height: 250
    }
})

export const bookmarkCard = StyleSheet.create({
    view: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: global.colors.VERY_LIGHT_GREY
    }
})