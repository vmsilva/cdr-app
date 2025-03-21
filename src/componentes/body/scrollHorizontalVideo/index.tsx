import React, { useContext, useRef, useState } from "react";
import { View, TouchableOpacity, Linking, Image } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

import styles from "./Styles";
import stylesTablet from "./StylesTablet";
import FastImage from "react-native-fast-image";
import CustomText from "../../componentes/customText";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";
import Loading from "../../funcionalidade/Loading";
import PortalComponente from "../../funcionalidade/Portal";
import { AntDesign } from "@expo/vector-icons";
import { montaJsonVideo } from "../../../configuracoes/utils/utils";

interface videoProps {
  cod_video: any;
  cod_cliente: any;
  uuid_video: any;
  storage: any;
  cod_associacao_conteudo: any;
  cod_serie: any;
  cod_serie_temporada: any;
  cod_visibilidade_conteudo: any;
  grupos_conteudo: any;
  subgrupos_conteudo: any;
  assuntos: any;
  titulo_video: any;
  descricao_video: any;
  sinopse_video: any;
  ficha_tecnica_video: any;
  imagem_h_video: any;
  imagem_v_video: any;
  imagem_fhd_video: any;
  data_cadastro_video: any;
  data_video: any;
  classificacao_indicativa_video: any;
  trailer_video: any;
  legenda_video: any;
  json_video: any;
  duracao_video: any;
  flg_destaque: any;
  ordem_serie: any;
  ordem_video: any;
  status_video: any;
  tags: any;
  generos: any;
  slug: any;
  hls: any;
}

interface CapaHorizontalProps {
  isFullScreen: boolean;
  array: videoProps[];
  numberOfLines: any;
  pagina_origem: any;
  serie: any;
  categoria: any;
}

const ScrollHorizontalVideo: React.FC<CapaHorizontalProps> = ({
  array,
  isFullScreen,
  numberOfLines,
  pagina_origem,
  categoria,
}) => {
  const CustomBottomSheetRef = useRef<any>(null);
  const navigation = useNavigation() as any;
  const { isTablet, TEXTO_PADRAO_COMPRA_PLANO_ANUAL, LINK_ASSINATURA } = useContext(UtilContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBloq, setShowBloq] = useState<boolean>(false);

  const handleOpenUrl = (item) => {
      //navigation.navigate("SinopseTrilhaDrawer", { item: item});
      navigation.navigate("PlayerDrawer", {
        item: montaJsonVideo(item, "videozoeplay"),
        relacionados: [],
        aovivo: false,
        isFullScreen: isFullScreen,
        pagina_origem: pagina_origem,
        materia: [],
        categoria: categoria
      });
  
  };

  const COMPONENTEPORTAL = () => {
    return <PortalComponente
    children={<>
          <View
            style={{
              position: 'absolute',
              top: 60,
              right: 20
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                
              }}
            >
              <TouchableOpacity
                onPress={() => setShowBloq(!showBloq)
                }
              >
                <AntDesign name="closecircle" size={50} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              //flex: 1,
              backgroundColor: '#FFF',
              //borderWidth: 1,
              padding: 30
            }}
          >
            <CustomText>{TEXTO_PADRAO_COMPRA_PLANO_ANUAL}</CustomText>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingTop: 20
              }}
            >
              <TouchableOpacity
                onPress={() => Linking.openURL(LINK_ASSINATURA)
                }
              >
                <Button
                  style={{
                    backgroundColor: '#00e500'
                  }}
                >
                  <CustomText style={{color: '#FFF', letterSpacing: 1.2}}>CLIQUE AQUI PARA ASSINAR</CustomText>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </>}
            />
  }

  return (
    <>
      <View style={isTablet ? stylesTablet.container : styles.container}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          {array.length != undefined ? (
            array.map((_: any, i: any) => {
              return (
                <TouchableOpacity
                  key={_.cod_video}
                  style={
                    isTablet ? stylesTablet.containerView : styles.containerView
                  }
                  onPress={() => {
                    handleOpenUrl(_);
                  }}
                >
                  <View style={styles.thumbContent}>
                    <Image
                      source={{
                        uri: _.url_thumb_video,
                      }}
                      style={
                        isTablet
                          ? stylesTablet.imgThumbContent
                          : styles.imgThumbContent
                      }
                      resizeMode="cover"
                    />
                    <View
                      style={{ 
                        display: 'none',
                        left: 7,
                        marginTop: 1,
                      }}
                    >
                      <CustomText
                        textType="regular"
                        style={[
                          isTablet
                            ? stylesTablet.textoSubititulo
                            : styles.textoSubititulo,
                        ]}
                        numberOfLines={numberOfLines}
                      >
                        {_.titulo_video}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ width: wp("100%") }}>
              <ActivityIndicator
                animating={true}
                color={CustomDefaultTheme.colors.buttonPrimary}
                size={wp("20%")}
                style={{
                  justifyContent: "center",
                  top: hp("1"),
                  height: hp("20%"),
                }}
              />
            </View>
          )}
          <View style={{ width: 15 }} />
        </ScrollView>
      </View>

      {isLoading && <Loading />}
      {showBloq && <COMPONENTEPORTAL />}



    </>
  );
};
export default ScrollHorizontalVideo;
