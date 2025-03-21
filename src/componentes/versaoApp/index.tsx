import React from 'react';
import {
    View,
    Style,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';
import CustomText from '../componentes/customText';

type versoesAppProps = {
    style?: Style | Style[]
}

const VersoesApp: React.FC<versoesAppProps|any> = ({ style, fontSize }) => {
    const version = DeviceInfo.getVersion();
    
    const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;

    return(
        <View
            style={[{...passedStyles,
                flexDirection: 'row',
                justifyContext: 'center',
                alignItems: 'center',
                //width: wp('100%')
            }]}
        >
            <CustomText textType="montserratLight" style={{color: CustomDefaultTheme.colors.text, fontSize: fontSize != undefined ? fontSize :15}}>Versão {version}</CustomText>
        </View>
    ); 
}

export default VersoesApp;
