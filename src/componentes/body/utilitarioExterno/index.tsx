import React,{ useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

// Configuraes 
import styles from './Styles';

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

const UtilitarioExterno: React.FC<UtilitariosInternoProps> = ({ array }) => {
  const navigation = useNavigation() as any;
  const URLPADRAO = 'https://www.google.com.br';

  useEffect(()=>{
    //console.log(array,'entries')
  
  },[]);
  return(
    <>
      <View style={styles.container}>        
        <ScrollView
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        > 
          { 
            (array != undefined) &&
              (
                Object.values(array).map((_:any, i:any)=>{ 
                  return(
                    <TouchableOpacity
                      key={i} 
                      onPress={() => Linking.openURL(Platform.OS == 'ios' ? _.url_ios_utilitario == '' ? URLPADRAO : _.url_ios_utilitario : _.url_android_utilitario == '' ? URLPADRAO :  _.url_android_utilitario  )}
                    >
                      <View                      
                        style={styles.thumbContent} 
                      >
                        <FastImage 
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: _.imagem_quadrada_utilitario,
                            priority: FastImage.priority.high,
                          }} 
                          style={
                            styles.imgThumbContent
                          } 
                        >
                        </FastImage>
                      </View>
                    </TouchableOpacity>
                  )
                })
              ) 
          }
        </ScrollView>
      </View>        
    </>
  );
}
export default UtilitarioExterno;
