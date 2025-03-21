import React, { useEffect } from "react";
import {
  AirplayButton,
  showRoutePicker,
  useAirplayConnectivity,
  useExternalPlaybackAvailability,
  useAvAudioSessionRoutes,
} from 'react-airplay';
import { View } from "react-native";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

interface airPlayButtonProps {
  item: any;
}

const AirPlayButtonComponente: React.FC<any | airPlayButtonProps> = ({ item }) => {
  const isAirplayConnected = useAirplayConnectivity() as any;
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability() as any;
  const routes = useAvAudioSessionRoutes() as any;

  
  return (
    <View>
      {isExternalPlaybackAvailable && (
        <AirplayButton
          prioritizesVideoDevices={true}
          tintColor={'#FFF'}
          activeTintColor={CustomDefaultTheme.colors.buttonPrimary}
          style={{
            width: 30,
            height: 30,
          }}
        />
      )}
     
    </View>
  );
  
};

export default AirPlayButtonComponente;
