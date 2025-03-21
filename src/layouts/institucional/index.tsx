import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  View,
  Text
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// Config
import Styles from './Styles';
import { useAuth } from '../../configuracoes/hooks/auth';
import { HitContext } from '../../configuracoes/contexts/HitContext';

// component
import Header from '../../componentes/header';

const Explore: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const { user } = useAuth();


  
  useEffect(() => {
    if(isFocused){
    
    }else{
      
    }
    return () => {};
  }, []);

  return (
    <>
       <Header 
        headerRight={(
          <TouchableOpacity
              onPress={()=>  props.navigation.toggleDrawer()}
              style={{
                  marginRight: wp('5'),
                  marginBottom: 10
              }}
          >
              <FontAwesome name="reorder" size={hp('4%')} color="#FFF" />
          </TouchableOpacity>
        )}
      />
    
      <ScrollView 
        style={{flex: 1,marginTop: hp('15'), height: hp('90'), backgroundColor: 'transparent'}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollBegin={() => {}}
      >
        
           
      </ScrollView>
    </>
  );
};

export default Explore;
