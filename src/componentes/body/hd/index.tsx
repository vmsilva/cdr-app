import React, { } from 'react';
import { View,  TextStyle, Style } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';


import Styles from './styles';

interface hdProps{
    style?: Style | Style[],
    styleFonte?: TextStyle | TextStyle[],
}

const Hd: React.FC<hdProps> = ({ style, styleFonte }) => {
    
    return(
        <View
            style={[Styles.conteudoClassificacao, style, {backgroundColor: 'trasparent'}]}
        >
            <CustomText textType="bold" style={[Styles.classificacao,{color:CustomDefaultTheme.colors.textFundoEscuro}, styleFonte]}>HD</CustomText>
        </View>
    ); 
}

export default Hd;
