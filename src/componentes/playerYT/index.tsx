import React, {
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { View, Platform, useWindowDimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import YouTube from 'react-native-youtube-iframe';

import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

//Estilos
import Styles from "./Styles";
import CastBanner from "../body/castBanner";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import { postData } from "../../configuracoes/services/request";
import { useAuth } from "../../configuracoes/hooks/auth";


//const { width: width_, height: height_ } = Dimensions.get("window");

const TEMPOWATHING = 10;
const PlayerYT: React.FC<any> = ({
  width,
  height,
  item,
  isCast,
  trailer_video,
}) => {
  if (isCast) {
    return <CastBanner width={width} height={height} style={{}} />;
  }
  const { user } = useAuth();
  const { isTablet } = useContext(UtilContext);
  const [carregaCast, setCarregaCast] = useState(false);
  const isFocused = useIsFocused();
  const [status, setStatus] = React.useState<any>({});
  const [showControll, setShowControll] = useState(false);
  const [enviarTracker, setEnviarTracker] = useState(true);
 
  const STYLETABLETVIDEO = {
    marginTop:
      width < height ? (Platform.OS == "ios" ? hp("-7") : hp("-9")) : 0,
    left: width > height && Platform.OS == "android" ? hp("0") : 0,
    top:
      width > height
        ? hp("0%")
        : Platform.OS == "android"
        ? hp("-11.2")
        : hp("-0.1"),
    width: width > height ? width : width,
    height: width > height ? height : width,
    backgroundColor:
      width > height
        ? CustomDefaultTheme.colors.preto
        : CustomDefaultTheme.colors.background,
  };

  const STYLEVIDEO = {
    marginTop: isTablet && width < height ? -50 : 0,
    left: width > height && Platform.OS == "android" ? hp("0") : 0,
    top:
      width > height
        ? hp("0%")
        : Platform.OS == "android"
        ? hp("-11.2")
        : hp("-0.1"),
    width: width > height ? width : width,
    height: width > height ? height : width,
    backgroundColor:
      width > height
        ? CustomDefaultTheme.colors.preto
        : CustomDefaultTheme.colors.background,
  };

  const trackerSendOtt = async (st: any) => {
    if (trailer_video || !user) return;

    try {
      let parametros = {
        rota: "stats/videoplaying",
        parametros: {
          token: user.token,
          cod_video: item.cod_video,
          seconds: `${parseInt(status.positionMillis / 1000)}`,
          total: `${parseInt(status.durationMillis / 1000)}`,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      //console.log("tracksend foi");
    } catch (error) {
      console.log(`Tracker no video erro ${error}`);
    }
  };

  const trackerSend = async (st: any) => {
   
  };

  //useKeepAwake();
  useEffect(() => {
    return () => {};
  }, [
    isFocused,
    height,
    width,
    carregaCast,
  ]);

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      item.titulo_video == "AO VIVO"
        ? trackerSend(status)
        : trackerSendOtt(status);
      setEnviarTracker(!enviarTracker);
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [enviarTracker]);

  if (status.didJustFinish && showControll) {
    setShowControll(false);
  }

  return (
      <YouTube
        videoId={item.youtube_id}
        play={true}
        //onChangeState={event => console.log(event)}
        onFullScreenChange={event => console.log(event)}
        onReady={() => console.log('ready')}
        onError={error => console.log(error)}
        width={width}
        height={height}
      />
  );
};

export default PlayerYT;
