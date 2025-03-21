import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Platform, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import styles from "./styles";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { postData } from "../../../configuracoes/services/request";
import { buscaLoacalLikeDisLike, salvaLoacalLikeDisLike } from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import { ActivityIndicator } from "react-native-paper";

const DislikeButton: React.FC<any> = ({ cod_video }) => {
  const { user } = useAuth();
  const { like, disLike, setDisLike } = useContext(UtilContext);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [likes_, setLikes_] = useState(like);
  const [dislikes_, setDisLikes_] = useState(disLike);

  const buscaDislikes = async () => {
    setIsLoading(true)
    try{
      const dislikeretorno = await buscaLoacalLikeDisLike({tipo: 'dislike'});

      setDisLikes_(dislikeretorno);
      setDisLike(dislikeretorno);
    }catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }

  const dislike = async () => {
    setIsLoading(true)
   try{
    let parametros = {
      rota: `/videos/like/`,
      parametros: {
        token: user.token,
        cod_video: cod_video,
        like: 1
      },
      showNotification: false,
      showLogError: true,
      showLog: true,
    };

    const response = (await postData(parametros)) as any;

    await salvaLoacalLikeDisLike({tipo: 'dislike', cod_video: cod_video})

    await buscaDislikes();

    
   }catch(error){
    console.log('error like ->>')
   }finally{
    setIsLoading(false)
   }

  };
  return (
    <>
      <View style={Platform.OS == 'ios' ? [styles.content, styles.shadow, styles.shadowElevation]:[styles.content]}>
      {
        isLoading ?
          <ActivityIndicator size={24} />
        :  
        <TouchableOpacity
          style={styles.buttonControll}
          onPress={() => dislike()}
        >
          <AntDesign  
            //name="dislike2"
            name={(dislikes_ && JSON.parse(dislikes_)[cod_video] != undefined) ? "dislike1" :  "dislike2"}
            size={24}
            color={(dislikes_ && JSON.parse(dislikes_)[cod_video] != undefined) ? CustomDefaultTheme.colors.iconsPrimaryColor :  CustomDefaultTheme.colors.iconsBackgroundEscuro }
            //color={CustomDefaultTheme.colors.iconsBackgroundEscuro}
          />
        </TouchableOpacity>
}
      </View>
    </>
  );
};

export default DislikeButton;
