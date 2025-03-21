import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TrackPlayer from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import LottieView from 'lottie-react-native';

import Styles from './Styles';
import { PlayerContext } from '../../../configuracoes/contexts/PlayerContext';

interface TrackListProps  {
  item:any,
  posicao: any,
  posicao_tocando: any;
  child: ReactNode
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const TrackList: React.FC<TrackListProps|any> = ({ item, posicao, posicao_tocando, trackListRetorno }) => {
  
  const { setIsPlayingGlobal } = useContext(PlayerContext);
  
  const tocaPlayList = async  () => {

    try{
      trackListRetorno(true);
      await TrackPlayer.skip(posicao);
      await TrackPlayer.play();
    }catch(error: any){
      console.log(error, 'track listtt error')
    }

  }

  useEffect(() => {
    console.log(item.title)
    return() => {}
  }, [item]);

  //return(<></>)

  return(
    <>
      <TouchableOpacity
        onPress={() => {
          tocaPlayList()
        }}
        style={{
          //width: wp('100'), 
          paddingLeft: 10, 
          paddingRight: 10, 
          flexDirection: 'row', 
          justifyContent: 'space-between'
        }}
      > 
        <FastImage
          source={{
            uri:item.artwork,
            priority: FastImage.priority.high
          }}
          style={{
            width: wp('15%'),
            height: wp('15%'),
            backgroundColor: CustomDefaultTheme.colors.cinza
          }}
        />
        <View
          style={{
            width: wp('60'), 
            padding: 10,
            flexDirection: 'row', 
            //backgroundColor: CustomDefaultTheme.colors.cinza,
          }}
        >
          <Text
            style={{color: CustomDefaultTheme.colors.cinza, width: wp('55'),maxHeight: wp('15%'), padding: 0}}
          >
            {item.title}
            {'\n'}
            {item.subtitle}
            {'\n'}
            {item.artista}
          </Text>
        </View>
        <View 
          style={{
            //backgroundColor: '#FF0',
            width: wp('15%'),
            height: wp('15%')
          }}
        >
            {
              posicao_tocando &&
                <LottieView
                  source={require('../../../../assets/lottie/lottie_playing.json')}
                  autoPlay
                  loop
                  colorFilters={[
                    { keypath: "Red Heart", color: CustomDefaultTheme.colors.bgcarrossel },
                    { keypath: "Grey Heart", color: CustomDefaultTheme.colors.bgcarrossel },
                  ]}
                />
            }
        </View>
      </TouchableOpacity>
      <View
        style={{height: .5, width: wp('95'), backgroundColor: CustomDefaultTheme.colors.cinzaSecundario, marginBottom: 15, left: wp('2.5'), right: wp('2.5')}}
      />
    </>
  );
}
export default TrackList;

