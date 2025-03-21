import React, { useEffect, useState } from 'react';
import { View,  TextStyle, Style } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';


import Styles from './styles';

interface ClassificacaoIndicativaProps{
    classificacao: string,
    style?: Style | Style[],
    styleFonte?: TextStyle | TextStyle[],
}

const ClassificacaoIndicativa: React.FC<ClassificacaoIndicativaProps> = ({ classificacao, style, styleFonte }) => {
    const [classificacaoIndicativa, setClassificacaoIndicativa] =  useState('L');
    const [corClassificacaoIndicativa, setCorClassificacaoIndicativa] =  useState('#00B150');

    useEffect(() => {
        ExibeClassificacao();
    }, [classificacao]);

    function ExibeClassificacao(){
        
        switch(classificacao){
            case '1':
                setClassificacaoIndicativa('L');
                setCorClassificacaoIndicativa('#00B150');
            break;
            case '2':
                setClassificacaoIndicativa('10');
                setCorClassificacaoIndicativa('#00CDFF');
            break;
            case '3':
                setClassificacaoIndicativa('12');
                setCorClassificacaoIndicativa('#FFCD00');
            break;
            case '4':
                setClassificacaoIndicativa('14');
                setCorClassificacaoIndicativa('#FF6600');
            break;
            case '5':
                setClassificacaoIndicativa('16');
                setCorClassificacaoIndicativa('#FE0000');
            break;
            case '6':
                setClassificacaoIndicativa('18');
                setCorClassificacaoIndicativa('#000000');
            break;
        }
    }
    
    return(
        <View
            style={[Styles.conteudoClassificacao, style, {backgroundColor: corClassificacaoIndicativa}]}
        >
            <CustomText textType="bold" style={[Styles.classificacao,{color:CustomDefaultTheme.colors.textFundoEscuro}, styleFonte]}>{classificacaoIndicativa}</CustomText>
        </View>
    ); 
}

export default ClassificacaoIndicativa;
