import React from "react";
import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from "react-native-google-cast"; 
import { montaJsonVideo } from "../../../configuracoes/utils/utils";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { View } from "react-native";

interface castButtonProps {
  item: any;
  color: any;
}

const CastButtomFloat: React.FC<any> = ({ item, color }) => {   //return <></>
  const client = useRemoteMediaClient();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        position: "absolute",
        bottom: 60,
        backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
        borderWidth: 1,
        borderColor: CustomDefaultTheme.colors.iconsPrimaryColor,
        borderRadius: 99,
        right: 20,
        display: client ? "flex" : "none",
      }}
    >
      <CastButton
        style={{
          width: 24,
          height: 24,
          tintColor: CustomDefaultTheme.colors.iconsPrimaryColor,
        }}
      />
    </View>
  );
};

export default CastButtomFloat;
