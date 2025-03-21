import React from 'react';
import {
    Text,
    View,
    Style,
} from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';

import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

import Sytles from './styles';

type loadingProps = {
    style?: Style | Style[]
}

const Loading: React.FC<loadingProps> = ({ style }) => {
    
    const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;

    return(
       <Portal>
            <View style={[Sytles.container, passedStyles]}>
                <ActivityIndicator size={90} color={CustomDefaultTheme.colors.loading} />
            </View>
       </Portal>
    ); 
}

export default Loading;
