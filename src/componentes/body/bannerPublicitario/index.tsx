import React,{ } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './Styles';
import FastImage from 'react-native-fast-image';

interface BannerPublicitarioProps  {
  url: string;
  url_click:string;
  item: any;
}

const BannerPublicitario: React.FC<BannerPublicitarioProps> = ({ url, item }) => {
  const navigation = useNavigation() as any;

  const hadleAoVivo = () => {
      navigation.navigate('PlayerDrawer',{item: item, hls: item.hls, nome_programacao: 'AO VIVO'});
  }
    
  return(
    <TouchableOpacity  
      style={styles.thumbContent}    
      onPress={hadleAoVivo}
    >
      <FastImage
        source={{uri:url}} 
        style={styles.imgThumbContent} 
      />                
    </TouchableOpacity>
  );
}
export default BannerPublicitario;
