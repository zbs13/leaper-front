import { StyleSheet } from 'react-native';
import global from '../../providers/global';

export default globalStyles = StyleSheet.create({
    mpm: {
        flex: 1,
        margin: 5
    },  
    pos_a: {
        position: "absolute",
        zIndex: 1
    },
    p_5: {
        padding: 5
    },
    p_10: {
        padding: 10
    },
    pl_5: {
        paddingLeft: 5
    },
    m_5: {
        margin: 5
    },
    mr_5: {
        marginRight: 5
    },
    m_10: {
        margin: 10
    },
    mt_10: {
        marginTop: 10
    },
    mt_20: {
        marginTop: 20
    },
    mb_10: {
        marginBottom: 10
    },
    mb_20: {
        marginBottom: 20
    },
    mb_50: {
        marginBottom: 50
    },
    br_50: {
        borderRadius: 50
    },
    w_100: {
        width: "100%"
    },
    h_100: {
        height: "100%"
    },
    mh_100: {
        minHeight: "100%"
    },
    h_50p: {
        height: 50
    },  
    ta_c: {
        textAlign: "center"
    },
    ta_j: {
        textAlign: "justify"
    },
    ta_r: {
        textAlign: "right"
    },
    ta_l: {
        textAlign: "left"
    },
    fs_10: {
        fontSize: 10
    },
    flex: {
        display: "flex",
        flexWrap: "wrap"
    },
    flexRow: {
        flexDirection: "row"
    },
    flexColumn: {
        flexDirection: "column"
    },
    flexBetween: {
        justifyContent: "space-between"
    },
    flexAround: {
        justifyContent: "space-around"
    },
    justifyCenter: {
        justifyContent: "center"
    },
    justifyStart: {
        justifyContent: "flex-start"
    },
    justifyEnd: {
        alignItems: "flex-end"
    },
    alignCenter: {
        alignItems: "center"
    },
    alignEnd: {
        alignItems: "flex-end"
    },
    alignStretch: {
        alignItems: "stretch"
    },  
    alignAround: {
        alignContent: "space-around"
    },
    c_main: {
        color: global.colors.MAIN_COLOR
    },
    c_anth: {
        color: global.colors.ANTHRACITE
    },
    c_light_g: {
        color: global.colors.LIGHT_GREY
    },
    f_bold: {
        fontWeight: "bold"
    },
    title_size: {
        fontSize: 20
    },
    separator: {
        margin: 5,
        width: 2,
        height: "70%",
        backgroundColor: global.colors.LIGHT_GREY
    }
});