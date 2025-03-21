import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { PulseAnimation } from 'react-native-animated-pulse';

import { CustomDefaultTheme } from '../../../../configuracoes/styles/Theme';
import Styles from './Styles';
import FastImage from 'react-native-fast-image';

interface fakeRelacionadosBlocoProps  {}

const FakeRelacionadosBloco: React.FC<fakeRelacionadosBlocoProps> = ({}) => {
  return(
    <>
      <View
        style={[Styles.linha,{marginTop: 100, justfiyContent: 'space-between', flexDirection: 'row'}]}
      >
          <View style={{opacity: .1, height: hp('4%'),width: wp('92%'),backgroundColor: CustomDefaultTheme.colors.fakerBG,justfiyContent: 'space-between', flexDirection: 'row',}}>
            
          </View>
      </View>
      <View
        style={[Styles.linha,{marginTop: 30}]}
      >
        <View
          style={{
            justifyContent: 'space-between',
            
          }}
        > 
          <View 
            style={Styles.containerView}
          >
            <View 
              style={[Styles.imgThumbContent, { 
              width: wp('45%'),
              height: hp('14%'),
              opacity: .1,
              backgroundColor: CustomDefaultTheme.colors.fakerBG,
              left: wp('0'),
              right: wp('0'),}]} 
            />  
            <View 
              style={[Styles.imgThumbContent, { 
              width: wp('45%'),
              height: hp('14%'),
              opacity: .1,
              backgroundColor: CustomDefaultTheme.colors.fakerBG,
              left: wp('2'),
              right: wp('2'),}]} 
            />  
            
          </View> 
          <View
            style={{
              width: wp('100'), 
              paddingLeft: wp('5'),
              flexDirection: 'row', 
              paddingTop: 10
            }}
          >
            <View
              style={{opacity: .1,backgroundColor: CustomDefaultTheme.colors.fakerBG, width: wp('92'),height: wp('10%'),  }}
            />
          </View>
        
        </View>
      </View>
    </>
  );
}

export default FakeRelacionadosBloco;

