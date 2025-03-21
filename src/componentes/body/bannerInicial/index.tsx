import React,{ useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import { UtilContext } from '../../../configuracoes/contexts/UtilContext';
import { ScrollView } from 'react-native-gesture-handler';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const BannerInicial: React.FC<any> = ({}) => {

  const [ modalVisible, setModalVisible ] = useState(false);

  const { conf } = useContext(UtilContext);

  const handleClosePopup = () =>{        
    addPopupStorage();
    //setShowPopup(false);
  }

  const addPopupStorage = async () =>{
    await AsyncStorage.removeItem('@tvminas:popup_inicial');  
    await AsyncStorage.setItem('@tvminas:popup_inicial', conf.texto_popup_home);
  }

  useEffect(() => {
    //alert(conf.texto_popup_home);
    const verificaPopup = async () => {
      let resp =  await AsyncStorage.getItem('@tvminas:popup_inicial');
      //await AsyncStorage.removeItem('@tvminas:popup_inicial');  
      if(resp == null || resp != conf.texto_popup_home){
        //setModalVisible(true);
        if(conf.texto_popup_home != '' && conf.texto_popup_restricao == ''){
          Alert.alert('',conf.texto_popup_home);
          handleClosePopup();
        }else{
          if(conf.texto_popup_restricao != ''){
            Alert.alert('',conf.texto_popup_restricao);
          }
        }
      }
    }

    verificaPopup();
    return () => {};
  }, []);
  

  return(
    <View  
      style={{backgroundColor: CustomDefaultTheme.colors.primary}}      
    >
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{
              //backgroundColor: CustomDefaultTheme.colors.bgcarrossel,
              //top: hp('40'),
              position: 'absolute',
              zIndex: 1
          }}
          onRequestClose={() => {
          }}
      >
          <TouchableOpacity 
              style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxHeight: hp('100'),
                  backgroundColor: CustomDefaultTheme.colors.primaryTransparent,
                  padding:10
              }} 
              onPress={() => {
                setModalVisible(!modalVisible)
                handleClosePopup();
              }}
            >
              <ScrollView style={{
                  //marginTop: 10, 
                  backgroundColor: CustomDefaultTheme.colors.primary, 
                  padding:30, 
                  maxHeight: hp('70%')
                }}
              >
                <Text style={{color: '#FFF', fontSize: 15}}>{conf.texto_popup_home}</Text>
              </ScrollView>
            </TouchableOpacity>
      </Modal>
    </View>
  );
}
export default BannerInicial;
