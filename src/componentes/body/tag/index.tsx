import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';


import Styles from './styles';

interface TagProps{
    tag: string,
}

const Tag: React.FC<TagProps> = ({ tag }) => {

    useEffect(() => {}, []);

    return(
        <View
            style={[Styles.conteudoClassificacao,{backgroundColor: CustomDefaultTheme.colors.tagBackground}]}
        >
            <CustomText style={[Styles.classificacao,{color:CustomDefaultTheme.colors.textFundoEscuro}]}>{tag}</CustomText>
        </View>
    ); 
}

export default Tag;
