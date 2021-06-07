import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import globalStyles from '../../assets/styles/global';
import Field from "../../components/fields/Field";
import Cta from '../../components/cta/Cta';
import { cta } from '../../assets/styles/styles';
import Txt from '../../components/Txt';
import global from '../../providers/global';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * login screen
 * 
 * @returns 
 */
export default function LoginScreen({navigation}) {

    const {actions: actionsApp, selectors: selectorsApp} = useApp();
    const {actions: actionsUser} = useUsers();

    const [loginState, setLoginState] = useState({
        mail: "",
        password: "",
        mailError: true,
        passwordError: true
    })

    return (
        <ScrollView>
            <View style={[globalStyles.w_100, globalStyles.h_100, globalStyles.flexColumn, globalStyles.alignCenter, globalStyles.justifyCenter, globalStyles.mpp]}>
                <View style={[{width: "60%", height: 100}, globalStyles.mt_20, globalStyles.mb_20]}>
                    <BackgroundImage resizeMode="contain" image={require("../../assets/img/logos/Full_Leaper_Logo_Small.png")} />
                </View>
                <View>
                    <View style={globalStyles.mb_20}>
                        <Field
                            type="mail"
                            placeholder={t(selectorsApp.getLang()).fields.MAIL}
                            isError={error => setLoginState({...loginState, mailError: error})}
                            onChange={value => setLoginState({...loginState, mail: value})}
                        />
                    </View>
                    <View style={globalStyles.mb_50}>
                        <Field
                            type="password"
                            placeholder={t(selectorsApp.getLang()).fields.PASSWORD}
                            isError={error => setLoginState({...loginState, passwordError: error})}
                            onChange={value => setLoginState({...loginState, password: value})}
                        />
                    </View>
                    <View>
                        <Cta 
                            value={t(selectorsApp.getLang()).auth.LOGIN}
                            _style={[cta.main, cta.first]}
                            disabled={loginState.mailError || loginState.passwordError}
                            onPress={() => actionsUser.login(loginState.mail, loginState.password).then((data) => {
                                manageResponseUI(data,
                                    selectorsApp.getLang(),
                                    function (res) {
                                        actionsUser.updateIsConnected(true)
                                    },
                                    function (error) {
                                        actionsApp.addPopupStatus(error);
                                    })
                                })}
                        />
                    </View>
                </View>
                <View style={globalStyles.h_separator} />
                <View style={[globalStyles.flexColumn, globalStyles.w_100]}>
                    <Txt _style={[globalStyles.ta_c, globalStyles.m_5]}>
                        {t(selectorsApp.getLang()).auth.NO_ACCOUNT}
                    </Txt>
                    <Cta 
                        value={t(selectorsApp.getLang()).auth.CREATE_AN_ACCOUNT}
                        _style={[cta.main, cta.second]}
                        onPress={() => navigation.navigate(global.screens.REGISTRATION)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

