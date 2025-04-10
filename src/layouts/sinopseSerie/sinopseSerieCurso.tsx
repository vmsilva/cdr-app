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
import MaterialComplementar from "../../componentes/body/materialComplementar";
import Loading from "../../componentes/funcionalidade/Loading";
import { useAuth } from "../../configuracoes/hooks/auth";
import { convertTime, TEMPORADAOBJETO } from "../../configuracoes/utils/constants/utils";
import AccordionGenerico from "../../componentes/body/accordionGenerico";
import CardVideo from "./cardVideo";
import { convertSeconds, MONTACATEGORIACOMTRILHAAPRESENTADORUNICA } from "../../configuracoes/utils/utils";

const SinopseSerieCurso: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation() as any;
  const { user, cliente } = useAuth();
  const scrollRef = useRef() as any;
  const { item, pagina_origem, categoria: categoriaHERDADA, cod_categoria_temporada, categorias, palestrante } = props.route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [categoria, setCategoria] = useState<any>([]);
  const [QTDVIDEOS, setQTDVIDEOS] = useState<any>(0);
  const [QTDARQUIVOSDACATEGORIA, setQTDARQUIVOSDACATEGORIA] = useState<any>(0);
  const [DURACAVIDEOSCATEGORIA, setDURACAOVIDEOSCATEGORIA] = useState<any>("");
  const [temporadaSelecionada, setTemporadaSelecionada] = useState<any>(TEMPORADAOBJETO);

  const limpaVariaveis = () => {
    console.log('variaveis limpas Sinopse Serie')
    setQTDVIDEOS(0);
    setQTDARQUIVOSDACATEGORIA(0);
    setDURACAOVIDEOSCATEGORIA("");
    setTemporadaSelecionada(TEMPORADAOBJETO);
  }

  useEffect(() => {
    if(!isFocused){
      limpaVariaveis();
    }
  },[isFocused]);

  const cleanVariables = () => {
    setQTDVIDEOS(0);
    setQTDARQUIVOSDACATEGORIA(0);
    setDURACAOVIDEOSCATEGORIA("");
  };

  const handleTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleOpenUrl = () => {
    if (pagina_origem != undefined) {
      switch(pagina_origem){
        case 'FiltroPalestranteCursosDrawer':
          navigation.navigate("FiltroPalestranteCursosDrawer", { 
            item: palestrante,
            categorias: categorias
          });
          break;
        default:
          navigation.navigate(pagina_origem, {
            //SinopseSerieDrawer
            item: item,
            relacionados: [],
            categoria: item,
          });
          break;
      }
      
    } else {
      navigation.navigate("HomeDrawer");
    }
  };

  const buscaCategoria = async () => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${item.cod_categoria}`,
        parametros: `token=${cliente.token}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      console.log(parametros, "sinopse serieeee");
      const response = (await getData(parametros)) as any;

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
          <TouchableOpacity onPress={handleOpenUrl}>
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

  const COMPONENTETEMPORADAS = useMemo(() => { console.log(categoriaHERDADA)

    if(categoriaHERDADA.temporadas == undefined){
      return;
    }

    return ( <View
        style={{
          marginTop: 10,
          width: "100%",
          borderTopWidth: 0.4,
          paddingTop: 10,
        }}
      >
        <CustomText textType="montserratBold" style={[Styles.titulogenerico]}>
          Navegue pelos conteúdos
        </CustomText>

        { 
          categoriaHERDADA.temporadas.map((itemtemporada, index) => { 
            let CATPORAPRESENTADOR = MONTACATEGORIACOMTRILHAAPRESENTADORUNICA(categoriaHERDADA, itemtemporada);
            
             
            if(itemtemporada.videos != undefined && itemtemporada.videos != null && Object.values(itemtemporada.videos).length > 0 ){

              return ( <View
                key={index}
                style={{
                  marginTop: 10,
                  width: "100%",
                }}
              >
                { <AccordionGenerico
                    headerColor={CustomDefaultTheme.colors.bottomTab}
                    background={'transparent'}
                    titulo={itemtemporada.nome_temporada}
                    children={<>
                      {
                        Object.values(itemtemporada.videos).map((_:any, i) => { //console.log(_)
            
                          return (<CardVideo 
                            key={`${_.cod_categoria}_${_.cod_video}`}
                            item={_}
                            categoria={CATPORAPRESENTADOR}
                            pagina_origem={'SinopseSerieCursoDrawer'}
                            index={i + 1}
                            cod_categoria_temporada={itemtemporada.cod_categoria_temporada}
                            
                          />)
                        })
                      }
                    </>}
                  /> }
              
              </View>)
            }
          
          })
        }
       
      </View>
    );

       
  }, [categoriaHERDADA, cod_categoria_temporada, item, isFocused]);

  const COMPONENTEINFORMACOESDOCURSO = useMemo(() => { 
    console.log(temporadaSelecionada, 'victor selecionadddaaaaa')
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
              {temporadaSelecionada.quantidade_videos} Aulas 
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
              {temporadaSelecionada.duracao_total}
            </CustomText>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              display: QTDARQUIVOSDACATEGORIA > 0 ? 'flex' : 'none'
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
  }, [temporadaSelecionada]);

  const COMPONENTEMATERIALCOMPLEMENTAR = useMemo(() => { 

    if (temporadaSelecionada.arquivos_categoria_temporada != undefined)
      if (temporadaSelecionada.arquivos_categoria_temporada != undefined && temporadaSelecionada.arquivos_categoria_temporada.length > 0)
        return (
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
              Material Complementar
            </CustomText>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                borderRadius: 10,
              }}
            >
              <MaterialComplementar
                array={temporadaSelecionada.arquivos_categoria_temporada}
              />
            </View>
          </View>
        );
  }, [temporadaSelecionada]);

  // COMPONENTES LOCAIS

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

      handleTop();
    } else {
      if (categoria != undefined)
        if (Object.values(categoria).length > 0) {
          setCategoria([]);
          cleanVariables();
        }
      setIsLoading(true);
    }

    return () => {};
  }, [isLoading, isFocused]);

  useEffect(()=>{
    console.log(temporadaSelecionada, 'temporada selecionadaaaa')
  },[temporadaSelecionada, isFocused, item])

  const loadingInformacoes = () => {
    let totalVideos = 0;
    let duracaoTotalPorTemporada = 0;
    let materiais = [];

    categoriaHERDADA.temporadas.map((itemtemporada, index) => {
      if (Object.values(itemtemporada.videos).length > 0) {
        if (
          Object.values(itemtemporada.arquivos_categoria_temporada).length > 0
        ) {
          Object.values(
            itemtemporada.arquivos_categoria_temporada
          ).map((mtitem) => materiais.push(mtitem));
        }

        const qtdVideosTemporada = Object.values(itemtemporada.videos).length;
        totalVideos += qtdVideosTemporada;

        duracaoTotalPorTemporada =
          duracaoTotalPorTemporada + itemtemporada.duracao_total;

        if (index + 1 == Object.values(categoriaHERDADA.temporadas).length) {
          
          setTemporadaSelecionada({
            quantidade_videos: totalVideos,
            duracao_total: convertSeconds(duracaoTotalPorTemporada),
            arquivos_categoria_temporada: materiais,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      loadingInformacoes();
    }
  }, [isFocused]);

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
                  { 
                    backgroundColor: CustomDefaultTheme.colors.background
                  },
                ]}
              >
                <FastImage
                  source={{
                    uri: categoria?.categoria?.url_foto_categoria || "",
                  }}
                  style={[Styles.b2]}
                >
                  <LinearGradient
                    colors={[
                      Platform.OS == "ios" ? "transparent" : "transparent",
                      Platform.OS == "ios" ? "transparent" : "transparent",
                      Platform.OS == "ios" ? "transparent" : "transparent",
                      CustomDefaultTheme.colors.background,
                      CustomDefaultTheme.colors.background,
                      CustomDefaultTheme.colors.background,
                    ]}
                    start={{
                      x: 0,
                      y: 0.35//Platform.OS == "ios" ? 0.35 : 0,
                    }}
                    end={{
                      x: 0,
                      y: 0.99 //Platform.OS == "ios" ? 0.98 : 0.98,
                    }}
                    style={Styles.LineaImagem}
                  >
                    <View
                      style={{
                        paddingHorizontal: "5%",
                        position: "absolute",
                        bottom: 40,
                      }}
                    >
                      <CustomText
                        numberOfLines={1}
                        textType="montserratBold"
                        style={{
                          color: CustomDefaultTheme.colors.primaryButton,
                          fontSize: 14,
                          letterSpacing: 0.14,
                          lineHeight: 18,
                        }}
                      >
                        {categoriaHERDADA.palestrante_temporada.nome_apresentador}
                      </CustomText>
                      <CustomText
                        textType="montserratBold"
                        numberOfLines={2}
                        style={{
                          color: CustomDefaultTheme.colors.text,
                          fontSize: 18,
                          letterSpacing: 0.36,
                          lineHeight: 22,
                        }}
                      >
                        {categoriaHERDADA.categoria.nome_categoria}
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
                        {categoriaHERDADA.categoria.descricao_categoria}
                      </CustomText>
                    </View>
                  </LinearGradient>
                </FastImage>
                <Animated.View style={[Styles.linha, { marginTop: -50 }]}>
                  <Animated.View style={{ paddingBottom: 30 }}>
                    <View
                      style={{
                        paddingHorizontal: "5%",
                        width: wp("100%"),
                      }}
                    >
                      {COMPONENTEINFORMACOESDOCURSO}

                     
                      {COMPONENTETEMPORADAS}

                      {COMPONENTEMATERIALCOMPLEMENTAR}

                    </View>

                    {isLoading && <Loading />}
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

export default SinopseSerieCurso;
