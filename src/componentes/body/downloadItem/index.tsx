import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Linking, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { Ionicons   , FontAwesome } from '@expo/vector-icons';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import { Button } from 'react-native-paper';
import Styles from './Styles';
import CustomText from '../../componentes/customText';


interface DownloadItemProps  {
  descricao:any,
  url: any,
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const DownloadItem: React.FC<DownloadItemProps|any> = ({ descricao, url }) => {
  

  useEffect(() => {
    return() => {}
  }, []);

  return(
    <>
      <TouchableOpacity
        onPress={() => {
        }}
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
          <CustomText
            style={{fontSize: 12,color: CustomDefaultTheme.colors.cinza, width: wp('40'),maxHeight: wp('15%'), padding: 0}}
          >
            {descricao}
          </CustomText>
        </View>
        <View >
            <Button
                mode="contained"
                style={{
                    backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                    height: 35,
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: -10,
                    width: wp('35'),
                }}
                contentStyle={{borderRadius: 30, height: 50, padding: 1}}
                onPress={() => Linking.openURL(url)}
                icon={()=><Ionicons name="play-circle-outline" size={20} color={CustomDefaultTheme.colors.textFundoEscuro} />}
                
            >
                <CustomText 
                  style={{marginBottom: 10,fontSize: 12, textAlign: 'center',color:CustomDefaultTheme.colors.textFundoEscuro, fontWeight: '400'}}
                >
                  Download
                </CustomText>
            </Button>
        </View>
      </TouchableOpacity>
    </>
  );
}
export default DownloadItem;

