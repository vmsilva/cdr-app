// FullScreenControls.tsx
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import  Styles from './Styles';
import Settings from '../../botoes/settings';
import CustomText from '../../componentes/customText';
import { millisToMinutesSeconds } from '../../../configuracoes/utils/constants/utils';
import PipButton from '../../botoes/pipButton';
import AirPlayButtonComponente from '../../botoes/airPlayButton';
import CastButtom from '../../botoes/castButton';
import Subtitulo from '../../botoes/subtitulo';

const Controls_16_9: React.FC<any> = ({
  aovivo,
  backButton,
  status,
  item,
  infos,
  controles,
  handleRate,
  handleSubtitulo,
  rateNumber,
  handleShowControlls,
  slider,
  subtitulos,
  legendas_video,
  subtituloSelecionado,
  settingsOpen,
  subtituloOpen
}) => {
  const [settingsBoolean, setSettingsBoolean] = useState<boolean>(false);
  const [subtituloBoolean, setSubtituloBoolean] = useState<boolean>(false);
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
    setSettingsBoolean(data);
    settingsOpen(data);
  };
  const subtituloOpenBoolean = (data) => {
    setSubtituloBoolean(data);
    subtituloOpen(data);
  };
  const containerStyle = Styles.controllView16x9; /*isTablet
  ? StylesTablet.container16_9
  : Styles.controllView16x9; */

return (
  <View style={containerStyle}>
    <LinearGradient
      start={{ x: 0, y: Platform.OS === "ios" ? 0.02 : 0.01 }}
      end={{ x: 0, y: Platform.OS === "ios" ? 0.88 : 0.95 }}
      colors={linearGradienteColors}
      style={Styles.controllLinearGradient16x9}
    />

    <View style={Styles.linhaSuperior16x9}>
      <View style={Styles.backButtonContainer}>{backButton}</View>

      <View style={Styles.titleContainer}>
        <CustomText textType="medium" style={Styles.titleText}>
          {item.titulo_video}
        </CustomText>
      </View>

      <View style={Styles.buttonRow}>
        <AirPlayButtonComponente />
        <View style={Styles.spacing} />
        <CastButtom item={item} />
      </View>
    </View>

    <View style={Styles.linhaControll16x9}>{controles}</View>

    <View style={Styles.linhaSlider16x9}>
      <View style={Styles.linhaBaixo16x9}>
        <View />
        <View
          style={{
            flexDirection: 'row',
            //backgroundColor: '#0F0',
            alignItems: 'center',
            justifyContent: 'space-between',
            //minWidth: 55
          }}
        >
         {<Subtitulo
            subtitulos={legendas_video}
            subtituloOpen={subtituloOpenBoolean}
            children={null}
            handleSubtitulo={handleSubtitulo}
            subtituloSelecionado={subtituloSelecionado}
            rate={rateNumber}
          />}
          <Settings
            settingsOpen={settingsOpenBoolean}
            children={null}
            handleRate={handleRate}
            rate={rateNumber}
          />
        </View>
      </View>

      {slider}

      <View style={Styles.linhaTempo16x9}>
        <CustomText style={Styles.timeText}>
          {millisToMinutesSeconds(parseInt(status.currentTime) * 1000)}
        </CustomText>
        <CustomText style={[Styles.timeText, Styles.timeTextRight]}>
          {item.titulo_video === "AO VIVO"
            ? ""
            : millisToMinutesSeconds(parseInt(infos.duration) * 1000)}
        </CustomText>
      </View>
    </View>
  </View>
);
  
};

export default Controls_16_9;
