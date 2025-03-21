import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import styles from './Styles';

const FakeScrollVerticalDinamico: React.FC<any> = ({}) => {
  const CAPAS = [1,2,3,4,5,6,7,8]
  useEffect(() => {
  }, []);

  return(
    <>
      <View style={styles.contentTitulo}>
          <View style={styles.contentInsideFake} />
      </View> 
      <View style={styles.container}>    
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        > 
          { 
            CAPAS.map((_:any, i:any)=>{
                return(
                  <TouchableOpacity
                    key={i} 
                  >
                    <View                      
                      style={[styles.thumbContent,{backgroundColor: CustomDefaultTheme.colors.fakerBG}]} 
                    >
                      <View 
                        style={
                          styles.imgThumbContent
                        } 
                      />
                    </View>
                  </TouchableOpacity>
                )
            })
          }
        </ScrollView>
      </View>        
    </>
  );
}
export default FakeScrollVerticalDinamico;
