import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { PulseAnimation } from 'react-native-animated-pulse';

import { CustomDefaultTheme } from '../../../../configuracoes/styles/Theme';
import Styles from './Styles';

interface fakeDownloadBlocoProps  {}

const FakeDownloadBloco: React.FC<fakeDownloadBlocoProps> = ({}) => {
  return(
    <>
      <View
        style={[{paddingLeft: wp('10'),marginTop: 100, justfiyContent: 'space-between', flexDirection: 'row', width: wp('100')}]}
      >
          <View style={{justfiyContent: 'space-between', flexDirection: 'row',}}>
              <Text style={{marginBottom: 10,textAlign: 'center',color:CustomDefaultTheme.colors.branco, fontWeight: '800', marginRight: 10}}>MATERIAL DE APOIO</Text>
              <FontAwesome name="chevron-down" size={16} color={CustomDefaultTheme.colors.primary} />
          </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between'
          }}
        > 
          <View
            style={{
              opacity: 0.9,
              width: wp('47'), 
              height: 45,
              padding: 10,
              flexDirection: 'row', 
            }}
          >
            <View
              style={{opacity: 0.1,backgroundColor: CustomDefaultTheme.colors.fakerBG, width: wp('42'),height: hp('2%')}}
            >
            </View>
          </View>
          <View>
              <View
                style={{
                    opacity: 0.1,
                    backgroundColor: CustomDefaultTheme.colors.fakerBG,
                    height: 35,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: -10,
                    width: wp('35'),
                }}
              >
              </View>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between'
          }}
        > 
          <View
            style={{
              opacity: 0.9,
              width: wp('47'), 
              height: 45,
              padding: 10,
              flexDirection: 'row', 
            }}
          >
            <View
              style={{opacity: 0.1,backgroundColor: CustomDefaultTheme.colors.fakerBG, width: wp('42'),height: hp('2%')}}
            >
            </View>
          </View>
          <View>
              <View
                style={{
                    opacity: 0.1,
                    backgroundColor: CustomDefaultTheme.colors.fakerBG,
                    height: 35,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: -10,
                    width: wp('35'),
                }}
              >
              </View>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between'
          }}
        > 
          <View
            style={{
              width: wp('47'), 
              height: 45,
              padding: 10,
              flexDirection: 'row', 
            }}
          >
            <View
              style={{opacity: 0.1,backgroundColor: CustomDefaultTheme.colors.fakerBG, width: wp('42'),height: hp('2%')}}
            >
            </View>
          </View>
          <View>
              <View
                style={{
                    opacity: 0.1,
                    backgroundColor: CustomDefaultTheme.colors.fakerBG,
                    height: 35,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: -10,
                    width: wp('35'),
                }}
              >
              </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default FakeDownloadBloco;

