import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import styles from "./styles";
import { postData } from "../../../configuracoes/services/request";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { ActivityIndicator } from "react-native-paper";
import { buscaLoacalLikeDisLike, salvaLoacalLikeDisLike } from "../../../configuracoes/utils/utils";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

const LikeButton: React.FC<any> = ({ cod_video}) => {
  const { user } = useAuth();
  const { like, setLike } = useContext(UtilContext);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [likes_, setLikes_] = useState(like);

  const buscaLikes = async () => {
    setIsLoading(true)
    try{
      const likeretorno = await buscaLoacalLikeDisLike({tipo: 'like'});

      setLikes_(likeretorno);
      setLike(likeretorno);
    }catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }

  const persistelike = async () => {
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

    await salvaLoacalLikeDisLike({tipo: 'like', cod_video: cod_video});

    await buscaLikes();
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
          onPress={() => persistelike()}
        >
          <AntDesign
            name={(likes_ && JSON.parse(likes_)[cod_video] != undefined) ? "like1" :  "like2"}  
            size={24}
            color={(likes_ && JSON.parse(likes_)[cod_video] != undefined) ? CustomDefaultTheme.colors.iconsPrimaryColor :  CustomDefaultTheme.colors.iconsBackgroundEscuro}
          />
        </TouchableOpacity>}
      </View>
    </>
  );
};

export default LikeButton;
