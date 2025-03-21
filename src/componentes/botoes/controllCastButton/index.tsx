import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleCast, { useRemoteMediaClient } from 'react-native-google-cast';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

import styles from './styles';

const ControllCastButton: React.FC<any> = ({}) => {
    const client = useRemoteMediaClient()
    const sessionManager = GoogleCast.getSessionManager()

    return(<>
      {client && 
        <View style={[styles.content, styles.shadow, styles.shadowElevation]}> 
          <TouchableOpacity
            style={styles.buttonControll}
            onPress={()=> GoogleCast.showExpandedControls()}
          >
            <MaterialCommunityIcons name="remote-tv" size={35} color={CustomDefaultTheme.colors.text} />
          </TouchableOpacity> 
        </View>
      }
    </>); 
}

export default ControllCastButton;
