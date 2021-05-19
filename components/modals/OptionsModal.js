import React, {useState} from 'react';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import Cta from '../cta/Cta';
import globalStyles from '../../assets/styles/global';
import global from '../../providers/global';
import { cta, optionsModal } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Txt from '../Txt';

/**
 * options modal
 * 
 * @param {string|null} title options modal title
 * @param {object} options options in modal => confirm, style, value, icon, iconColor
 * @param {number|null} buttonSize button size
 * @param {string|null} buttonColor button color
 * @param {string|null} icon icon name
 * @param {component} children
 * @param {boolean} isActive true if modal is active
 * @param {boolean} onPress true if toggle modal just onPress cta and not onLongPress
 * @returns 
 */
export default function OptionsModal({
  title = null, 
  options, 
  buttonSize = null, 
  buttonColor = null, 
  icon = null, 
  children = null, 
  isActive = true,
  onPress = false,
  isVisible = false
}) {

    const {selectors} = useApp();

    const [visible, setVisible] = useState(isVisible);
    const toggleModalView = () => {
      setVisible(!visible);
    };

    /**
     * calc options modal height according to number of options
     */
    let height = (title !== null ? 80 : 0) + 65 + 51.5 * options.length

    return (
      <View>
        {children !== null ?
          React.cloneElement(children, isActive ? onPress ? {onPress: () => toggleModalView()} : {onLongPress: () => toggleModalView()} : {})
        :
          <Cta
            onPress={() => toggleModalView()}
            _style={[cta.main]}
            underlayColor="transparent"
          >
            <View style={globalStyles.alignCenter}>
                <Ionicons color={buttonColor !== null ? buttonColor : global.colors.ANTHRACITE} name={icon !== null ? icon : "ellipsis-vertical-outline"} size={buttonSize !== null ? buttonSize : 30} />
            </View>
          </Cta>
        }
        <BottomSheet visible={visible} onBackButtonPress={() => toggleModalView()} onBackdropPress={() => toggleModalView()} >
          <View style={[{height: height}, optionsModal.container, globalStyles.justifyCenter, globalStyles.alignCenter]}>
            <View
              style={[{flex: 1}, globalStyles.w_100, globalStyles.flexColumn, globalStyles.flexBetween]}>
                { title !== null ?
                    <View style={optionsModal.containerTitle} >
                        <Txt _style={[globalStyles.ta_c, optionsModal.title]}>
                            {title}
                        </Txt>
                    </View>
                  : 
                    null
                }
                <View style={[{ flex: 1 }, globalStyles.flexColumn]}>
                    {
                      options.map((params, index) => 
                        <View key={index}>
                          <Cta
                            disabled={params.disabled !== undefined ? params.disabled : false}
                            onPress={() => {
                              toggleModalView();
                              params.action();
                            }}
                            underlayColor={global.colors.VERY_LIGHT_GREY}
                            confirm={typeof params.confirm !== undefined ? params.confirm : null}
                            _style={[cta.main, globalStyles.ta_l, optionsModal.optionCta, typeof params.style === "object" ? params.style : {}]}
                            value={params.value}
                            icon={typeof params.icon !== "undefined" ? params.icon : null}
                            iconSize={30}
                            iconColor={typeof params.iconColor !== "undefined" ? params.iconColor : null}
                          />
                        </View>
                      )
                    }
                    <Cta
                      onPress={() => toggleModalView()}
                      value={t(selectors.getLang()).CANCEL}
                      _style={[globalStyles.mt_20, globalStyles.m_10, optionsModal.cancel]}
                    />
                </View>
              
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }