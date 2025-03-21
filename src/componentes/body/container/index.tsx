import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, ActivityIndicator, View } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

import styles from './styles';

interface ContainerProps{
    ContentChildren: ReactNode;
}
const ContainerComponente: React.FC<ContainerProps> = ({ ContentChildren }) => {

    return(
        <KeyboardAvoidingView>  
                <View style={styles.conteudoFilho}>
                    {ContentChildren}
                </View>   
        </KeyboardAvoidingView>
    ); 
}

export default ContainerComponente;

