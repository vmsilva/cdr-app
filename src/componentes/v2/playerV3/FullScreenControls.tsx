// FullScreenControls.tsx
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import  Styles from './Styles';
import Settings from '../../botoes/settings';
import CustomText from '../../componentes/customText';
import { millisToMinutesSeconds } from '../../../configuracoes/utils/constants/utils';
import PipButton from '../../botoes/pipButton';
import AirPlayButtonComponente from '../../botoes/airPlayButton';
import CastButtom from '../../botoes/castButton';

const FullScreenControls: React.FC<any> = ({
  aovivo,
  backButton,
  status,
  item,
  infos,
  controles,
  handleRate,
  rateNumber,
  handleShowControlls,
  slider,
  legendas_video
}) => {
  const [settingsBoolean, setSettingsBoolean] = useState<boolean>(false);
  const [onSliding, setOnSliding] = useState(false);
  const linearGradienteColors = [
    CustomDefaultTheme.colors.backgroundControlesplayer,
    'transparent',
    'transparent',
    'transparent',
    CustomDefaultTheme.colors.backgroundControlesplayer,
  ];

  // Rating
  const settingsOpenBoolean = (data) => {
    //console.log(data); // victor
    setSettingsBoolean(data);
  };

  return (
    <View style={[Styles.controllViewFullScreen, {}]}>
      <LinearGradient
        start={{ x: 0, y: Platform.OS == 'ios' ? 0.02 : 0.01 }}
        end={{ x: 0, y: Platform.OS == 'ios' ? 0.44 : 0.99 }}
        colors={linearGradienteColors}
        style={[Styles.controllLinearGradientFullScreen]}
      ></LinearGradient>

      <View style={Styles.linhaSliderTopFull}>
        <View>{backButton}</View>

        <View style={{ width: hp('50') }}>
          <CustomText style={{ color: '#FFF', textAlign: 'center' }}>
            {item.titulo_video}
          </CustomText>
        </View>
        <View style={{ paddingRight: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
          <PipButton />
          <AirPlayButtonComponente />
          <View style={{ width: 30 }} />
          <CastButtom item={item} />
        </View>
      </View>
      <View style={Styles.controlesFull}>{controles}</View>
      <View style={Styles.linhaSliderFull}>
        <View style={Styles.linhaTempoFull}>
          <CustomText
            style={{
              color: '#FFF',
              backgroundColor: 'transparent',
              width: '50%',
              textAlign: 'left',
              display: aovivo ? 'none' : 'flex',
              paddingLeft: 5,
            }}
          >
            {millisToMinutesSeconds(parseInt(status.currentTime) * 1000)}
          </CustomText>
          <CustomText style={[Styles.controllTextoFullScreen]}>
            {item.titulo_video == 'AO VIVO' ? '' : millisToMinutesSeconds(parseInt(infos.duration) * 1000)}
          </CustomText>
        </View>
        {slider}
        <View style={[Styles.linhaBaixoSlide]}>
          <View></View>
          <Settings settingsOpen={settingsOpenBoolean} children={<></>} handleRate={handleRate} rate={rateNumber} />
        </View>
      </View>
    </View>
  );
  
};

export default FullScreenControls;
