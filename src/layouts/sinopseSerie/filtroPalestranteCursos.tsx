import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
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
import CardCategoria from "./cardCategoria";

const FiltroPalestranteCursos: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation() as any;
  const scrollRef = useRef() as any;
  const { item, categorias } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  //const [categoria, setCategoria] = useState<any>([]);
  const [QTDVIDEOS, setQTDVIDEOS] = useState<any>(0);
  const [QTDARQUIVOSDACATEGORIA, setQTDARQUIVOSDACATEGORIA] = useState<any>(0);
  const [DURACAVIDEOSCATEGORIA, setDURACAOVIDEOSCATEGORIA] = useState<any>("");

  const limpaVariaveis = () => {
    console.log("variaveis limpas filtroTemporada");
    setQTDVIDEOS(0);
    setQTDARQUIVOSDACATEGORIA(0);
    setDURACAOVIDEOSCATEGORIA("");
  };

  useEffect(() => {
    if (!isFocused) {
      limpaVariaveis();
    }
  }, [isFocused]);

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

  const COMPONENTECARDSCATEGORIA = useMemo(() => { console.log(categorias)
    return (
      <>
        <FlatList
          data={categorias}
          renderItem={(item_categoria, index) => { console.log(item_categoria,'item categoriaaa')
            if(!item_categoria.item){
              return 
            }

            return <CardCategoria item={item_categoria.item} palestrante={item} categorias={categorias} />;
          }}
        />
      </>
    );
  }, [categorias]);

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
            backgroundColor: "#222222",
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

  const COMPONENTEDESCRICAOPALESTRANTE = useMemo(() => {
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
        <CustomText
          textType="montserratLight"
          style={[
            Styles.titulogenerico,
            { color: CustomDefaultTheme.colors.apresentadorFont },
          ]}
        >
          {item.descricao_palestrante}
        </CustomText>
      </View>
    );
  }, [item]);

  const executaMetodos = async () => {
    try {
      //await buscaAssistidos();
      //await buscaCategoria();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          return (
            <>
              <COMPONENTEHEADER />
              <View
                style={[
                  { backgroundColor: CustomDefaultTheme.colors.background },
                ]}
              >
                <FastImage
                  source={{
                    uri: item.url_foto_palestrante,
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
                      y: 0.82//Platform.OS == "ios" ? 0.99 : 0.99,
                    }}
                    style={Styles.LineaImagem}
                  >
                    <View
                      style={{
                        paddingHorizontal: "2.5%",
                        //padding: 15,
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
                        {item.nome_palestrante}
                      </CustomText>
                      <CustomText
                        textType="montserratBold"
                        style={{
                          color: "#999999",
                          fontSize: 14.4,
                          letterSpacing: 0.24,
                          lineHeight: 19,
                        }}
                      >
                        {item.subnome_palestrante}
                      </CustomText>
                      <CustomText
                        numberOfLines={5}
                        textType="montserratLight"
                        style={[
                          Styles.titulogenerico,
                          { color: CustomDefaultTheme.colors.text, display: 'none' }, // Descricao palestrante apresentador
                        ]}
                      >
                        {item.descricao_palestrante}
                      </CustomText>
                    </View>
                  </LinearGradient>
                </FastImage>
                <Animated.View style={[Styles.linha, { marginTop: 0 }]}>
                  <Animated.View style={{ paddingBottom: 30 }}>
                    <View
                      style={{
                        paddingHorizontal: "2.5%",
                        width: wp("100%"),
                      }}
                    >
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
                          style={[Styles.titulogenerico, { color: CustomDefaultTheme.colors.primaryButton }]}
                        >
                          Cursos:
                        </CustomText>
                        {COMPONENTECARDSCATEGORIA}
                      </View>
                    </View>
                  </Animated.View>
                </Animated.View>
              </View>
            </>
          );
        }}
      />
      {isLoading && <Loading />}
    </>
  );
};

export default FiltroPalestranteCursos;
