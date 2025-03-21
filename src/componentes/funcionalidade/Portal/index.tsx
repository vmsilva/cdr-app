import React, { ReactNode } from 'react';
import {
    View,
    ViewStyle,
    
} from 'react-native';

import Sytles from './styles';
import { Portal } from 'react-native-paper';

type PortalProps = {
    style?: ViewStyle | ViewStyle[];
    children : ReactNode;
}

const PortalComponente: React.FC<PortalProps> = ({ style, children }) => {
    
    const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;

    return(
       <Portal>
            <View style={[Sytles.container, passedStyles]}>
                {children}
            </View>
       </Portal>
    ); 
}

export default PortalComponente;
