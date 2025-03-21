import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Card, 
  Button as ButtonPaper  
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';

interface CapaVerticalProps  {
  capaVertical: [];
  rota: string;
}

const CapaVertical: React.FC<CapaVerticalProps> = ({ capaVertical, rota }) => {
  const navigation = useNavigation();
  
  useEffect(() => {
    //console.log('capaVertical teste leak')
  }, [capaVertical]);

  return(
   <>
      <View style={styles.container}>  
        <TouchableOpacity
          onPress={ () => navigation.navigate(rota,{})}
        >
          <Card                      
            style={styles.thumbContent}
          >
            <Card.Cover source={{uri:'https'}} style={styles.imgThumbContent} />
          </Card>
        </TouchableOpacity>
      </View>        
    </>
  );
}
export default CapaVertical;
