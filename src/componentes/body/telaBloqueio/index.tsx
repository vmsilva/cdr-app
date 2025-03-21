import React,{ useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UtilContext } from '../../../configuracoes/contexts/UtilContext';
import { ScrollView } from 'react-native-gesture-handler';

import Styles from './Styles';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const TelaBloqueio: React.FC<any> = ({}) => {
  const { conf } = useContext(UtilContext);

  useEffect(() => {
   
    return () => {};
  }, []);
  

  return(
    <>
      <View style={{marginTop: hp('10')}}>
            <Text style={[{color:'#FFF',fontSize: 50, textAlign: 'center', fontWeight: '300'}]}>
              <Text style={[{color:'#FFF',fontSize: 50, textAlign: 'center', fontWeight: '500'}]}>EMC</Text>PLAY
            </Text>
            <ScrollView
              style={{
                //flex:1
              }}
            >
              <Text
                style={{
                  padding: 15,
                  color: '#FFF',
                  marginTop: hp('10'),
                  fontSize: 17
                }}
              >
                {conf.texto_popup_restricao}
              </Text>
            </ScrollView>
      </View>
    </>
  );
}
export default TelaBloqueio;
