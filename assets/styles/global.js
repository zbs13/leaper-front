import { StyleSheet } from 'react-native';
import global from '../../providers/global';

export default globalStyles = StyleSheet.create({
    p_5: {
        padding: 5
    },
    p_10: {
        padding: 10
    },
    m_10: {
        margin: 10
    },
    br_50: {
        borderRadius: 50
    },
    flex: {
        display: "flex",
        flexWrap: "wrap"
    },
    flexRow: {
        flexDirection: "row"
    },
    flexBetween: {
        justifyContent: "space-between"
    },
    justifyCenter: {
        justifyContent: "center"
    },
    alignCenter: {
        alignItems: "center"
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
    }
});