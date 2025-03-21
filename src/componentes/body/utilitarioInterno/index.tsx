import React,{ useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

import styles from './Styles';

import CustomText from '../../componentes/customText';

interface utilitarioProps {
  cod_utilitario:any;        
  cod_cliente:any;           
  cod_utilitario_grupo:any;  
  nome_utilitario:any;       
  imagem_utilitario:any;     
  url_utilitario:any;        
  url_ios_utilitario:any;    
  url_android_utilitario:any;
  ordem_utilitario:any;      
  status_utilitario:any;     
  slug:any;    
}

interface UtilitariosInternoProps  {
  array: utilitarioProps[];
}

const UtilitarioInterno: React.FC<UtilitariosInternoProps> = ({ array }) => {
  const navigation = useNavigation() as any;

  useEffect(()=>{
    
  },[]);
  return(
    <>
      <View style={styles.container}>      
       {
          Object.values(array).map((_: utilitarioProps, i)=> {
            return (
              <TouchableOpacity
                key={i}
                onPress={()=>  navigation.navigate('WebSeeAppInternoDrawer', {url: _.url_utilitario, titulo: _.nome_utilitario}) }
                style={{
                  marginLeft: wp('0'),
                  width: wp('90'),
                  marginTop: 15,
                  marginBottom:15.5,
                }}
              >
                <View
                  style={{
                    flexDirection:'row',
                    left: 7,
                    marginBottom: 5
                  }}
                >
                  <CustomText
                    textType="bold"
                    style={[styles.textoSubititulo,{fontSize: 18}]}
                  >
                    {_.nome_utilitario}:
                  </CustomText>
                
                </View>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: _.imagem_utilitario}}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.backgroundCards,
                    width: wp('93'),
                    height: wp('45'),
                    borderRadius: 10
                  }}
                />

            
              
              </TouchableOpacity>
            )
        })
       }
      </View>        
    </>
  );
}
export default UtilitarioInterno;
