import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import { useAuth } from '../../../configuracoes/hooks/auth';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

import Styles from './Styles';
import { PlayerContext } from '../../../configuracoes/contexts/PlayerContext';
import api from '../../../configuracoes/services/api';

interface FavoritoListProps  {
  item: any,
  array:any,
  posicao: any,
  child: ReactNode
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const FavoritoList: React.FC<FavoritoListProps|any> = ({ item, array, posicao, child }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { setLastQueue, setQueue, queue, lastQueue } = useContext(PlayerContext)
  const { user } = useAuth();

  const tocaPlayList = () => {

    setLastQueue(queue.length > 0 ? queue : lastQueue)
    setQueue(array);
    //navigation.navigate('sinopseDrawer',{item: item});
    navigation.navigate('PlayerPageDrawer',{item: array, posicao: posicao});
  }

  

  useEffect(() => {
    if(isFocused){

    }
    return() => {}
  }, [item]);


  return(
    <>
      <TouchableOpacity
        onPress={() => {
          tocaPlayList()
        }}
        style={{
          width: wp('100'), 
          paddingLeft: 10, 
          paddingRight: 10, 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          //borderBottomColor: CustomDefaultTheme.colors.cinzaSecundario,
          //borderBottomWidth: 1,
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
          style={{width: wp('70'), padding: 10}}
        >
          <Text
            style={{color: CustomDefaultTheme.colors.cinza, maxWidth: wp('70'), padding: 0}}
          >
            {item.title}
            {'\n'}
            {item.subtitle}
            {'\n'}
            {item.artista}
          </Text>
        </View>
        <TouchableOpacity>
          {
            child
          }
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{height: .5, width: wp('95'), backgroundColor: CustomDefaultTheme.colors.cinzaSecundario, marginBottom: 15, left: wp('2.5'), right: wp('2.5')}}
      />
    </>
  );
}
export default FavoritoList;


/*

<TouchableOpacity
  onPress={() => {
    alert('heart beat')
    //onButtonPressed(item.id, musica[item.id]);
  }}
>
  <MaterialCommunityIcons 
    //name={true ? "stop-circle" : "play-circle"} 
    name={"heart"} 
    size={wp('10%')} 
    color={CustomDefaultTheme.colors.primary} 
  />
</TouchableOpacity>

*/