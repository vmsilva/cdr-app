import React, { useState, useEffect, useMemo } from "react";
import { View, Platform, TouchableOpacity, Animated, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import Styles from "./Styles";
import CustomText from "../../componentes/componentes/customText";
import FastImage from "react-native-fast-image";
import PageHeader from "../../componentes/header";
import Loading from "../../componentes/funcionalidade/Loading";
import { useAuth } from "../../configuracoes/hooks/auth";
import { convertTime } from "../../configuracoes/utils/constants/utils";
import CardTemporada from "./cardTemporada";

const FiltroTemporada: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation() as any;
  const { user, cliente } = useAuth();
  const { item } = props.route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [categoria, setCategoria] = useState<any>([]);
  const [QTDVIDEOS, setQTDVIDEOS] = useState<any>(0);
  const [QTDARQUIVOSDACATEGORIA, setQTDARQUIVOSDACATEGORIA] = useState<any>(0);
  const [DURACAVIDEOSCATEGORIA, setDURACAOVIDEOSCATEGORIA] = useState<any>("");

  const limpaVariaveis = () => {
    console.log('variaveis limpas filtroTemporada')
    setQTDVIDEOS(0);
    setQTDARQUIVOSDACATEGORIA(0);
    setDURACAOVIDEOSCATEGORIA("");
  }

  useEffect(() => {
    if(!isFocused){
      limpaVariaveis();
    }
  },[isFocused]);

  const buscaCategoria = async () => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${item.cod_categoria}`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      let parametrosCAT = {
        rota: `/categorias/categoria/${item.cod_categoria}/temporadas`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const responseCat = (await getData(parametrosCAT)) as any;
      let response = (await getData(parametros)) as any;

      response.data.data['temporadas'] =  responseCat.data.data.temporadas;

      //console.log('              ---->>>',response.data.data,'<<-----           ');
      setCategoria(response.data.data);
      setQTDVIDEOS(response.data.data.videos.length);
      setQTDARQUIVOSDACATEGORIA(
        response.data.data.categoria.arquivos_categoria.length
      );
      setDURACAOVIDEOSCATEGORIA(
        convertTime(response.data.data.categoria.duracao_total_time)
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
              navigation.navigate("HomeDrawer");
            }}
          >
            <View
              style={{
                backgroundColor: "#0000006b",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 199,
                paddingRight: 3,
              }}
            >
              <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
            </View>
          </TouchableOpacity>
        }
        titulo={item.titulo}
        headerRight={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                right: 10,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{
                right: 10,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  const COMPONENTECARDSTEMPORADA = useMemo(() => {
    if(categoria.temporadas == undefined){
      return <></>;
    }

    return(<>
      <FlatList
        data={categoria.temporadas}
        renderItem={(item, index) => {
          //console.log(item.item, '--->> itemmmmm')
          return <CardTemporada item={item.item} categoria={categoria}/>
        }} />
    </>)
  },[categoria])

  const COMPONENTEINFORMACOESDOCURSO = useMemo(() => {
    return (
      <View
        style={{
          marginTop: 10,
          width: "100%",
          borderTopWidth: 0.4,
          paddingTop: 10,
          //backgroundColor: '#FFF'
        }}
      >
        <CustomText textType="montserratBold" style={[Styles.titulogenerico]}>
          Informações do Curso
        </CustomText>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: CustomDefaultTheme.colors.informacoesSinopse,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="movie-play"
              size={24}
              color={CustomDefaultTheme.colors.bioapresentadorFont}
            />
            <CustomText
              style={{
                left: 10,
                fontSize: 12,
                color: CustomDefaultTheme.colors.bioapresentadorFont,
                letterSpacing: 0.12,
                lineHeight: 15,
              }}
              textType="montserratMedium"
            >
              {QTDVIDEOS} Aulas
            </CustomText>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons
              name="clock"
              size={24}
              color={CustomDefaultTheme.colors.bioapresentadorFont}
            />
            <CustomText
              style={{
                left: 10,
                fontSize: 12,
                color: CustomDefaultTheme.colors.bioapresentadorFont,
                letterSpacing: 0.12,
                lineHeight: 15,
              }}
              textType="montserratMedium"
            >
              {DURACAVIDEOSCATEGORIA}
            </CustomText>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              display: 'none'
            }}
          >
            <MaterialCommunityIcons
              name="folder-plus"
              size={24}
              color={CustomDefaultTheme.colors.bioapresentadorFont}
            />
            <CustomText
              style={{
                left: 10,
                fontSize: 12,
                color: CustomDefaultTheme.colors.bioapresentadorFont,
                letterSpacing: 0.12,
                lineHeight: 15,
              }}
              textType="montserratMedium"
            >
              {QTDARQUIVOSDACATEGORIA} Materiais complementares
            </CustomText>
          </View>
        </View>
      </View>
    );
  }, [DURACAVIDEOSCATEGORIA, QTDVIDEOS, QTDARQUIVOSDACATEGORIA]);

  const executaMetodos = async () => {
    try {
      //await buscaAssistidos();
      await buscaCategoria();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (isLoading) {
        //buscaCategoria();
        executaMetodos();
      }
    } else {
      if (categoria != undefined)
        if (Object.values(categoria).length > 0) {
          setCategoria([]);
        }
      setIsLoading(true);
    }

    return () => {};
  }, [isLoading, isFocused]);

  if (!isFocused) {
    return <></>;
  }

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
        data={[1]}
        renderItem={() => {
          return (<>
          <COMPONENTEHEADER />
        <View
          style={[{ backgroundColor: CustomDefaultTheme.colors.background }]}
        >
          <FastImage
            source={{
              uri:
                categoria == undefined
                  ? ""
                  : categoria.categoria != undefined
                  ? categoria.categoria.url_foto_categoria
                  : "",
            }}
            style={[Styles.b2]}
          >
            <LinearGradient
              colors={[
                Platform.OS == "ios" ? "transparent" : "transparent",
                Platform.OS == "ios" ? "transparent" : "transparent",
                //Platform.OS == "ios" ? "transparent" : "transparent",
                CustomDefaultTheme.colors.background,
              ]}
              start={{
                x: 0,
                y: .65//Platform.OS == "ios" ? 0.15 : 0,
              }}
              end={{
                x: 0,
                y: 0.91//Platform.OS == "ios" ? 0.99 : 0.99,
              }}
              style={Styles.LineaImagem}
            >
              <View
                style={{
                  paddingHorizontal: "2.5%",
                  position: "absolute",
                  bottom: 1,
                }}
              >
                <CustomText
                  textType="montserratBold"
                  style={{
                    color: CustomDefaultTheme.colors.text,
                    fontSize: 16,
                    letterSpacing: 0.36,
                    lineHeight: 22,
                  }}
                >
                  {item.nome_categoria}
                </CustomText>
                <CustomText
                  textType="montserratRegular"
                  numberOfLines={4}
                  style={{
                    color: "#999999",
                    fontSize: 14.4,
                    letterSpacing: 0.24,
                    lineHeight: 19,
                  }}
                >
                  {item.descricao_categoria}
                </CustomText>
              </View>
            </LinearGradient>
          </FastImage>
          <Animated.View style={[Styles.linha, { marginTop: 10 }]}>
            <Animated.View style={{ paddingBottom: 30 }}>
              <View
                style={{
                  paddingHorizontal: "2.5%",
                  width: wp("100%"),
                }}
              >
                {COMPONENTEINFORMACOESDOCURSO}

                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    borderTopWidth: 0.4,
                    paddingTop: 10,
                  }}
                >
                  <CustomText
                    textType="montserratBold"
                    style={[Styles.titulogenerico]}
                  >
                    Apresentado por:
                  </CustomText>
                  {COMPONENTECARDSTEMPORADA}
                 
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
          </>)
        }}
      />
      {isLoading && <Loading />}
    </>
  );
};

export default FiltroTemporada;
