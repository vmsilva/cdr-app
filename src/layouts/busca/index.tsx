import React, { useState, useEffect, useMemo } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";

// styles
import Styles from "./Styles";

// Config
import { getData, postData } from "../../configuracoes/services/request";
import { useAuth } from "../../configuracoes/hooks/auth";

// Components
import PageHeaderBuscar from "../../componentes/headerBuscar";
import CustomText from "../../componentes/componentes/customText";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import HeaderScroll from "../../componentes/headerSroll";
import ScrollHorizontalFlatListAudio from "../../componentes/body/scrollHorizontalFlatListAudio";
import ScrollHorizontalFlatListAudioFaixa from "../../componentes/body/scrollHorizontalFlatListAudio/Faixa";
import ScrollHorizontalFlatList from "../../componentes/body/scrollHorizontalFlatList";

const Buscar: React.FC<any> = (props) => {
  const route = useRoute();
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { user, cliente } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [termoBusca, setTermoBusca] = React.useState("");
  const [termoBusca2, setTermoBusca2] = React.useState("__");
  const columns = 3;
  const [retornoBusca, setRetornoBusca] = useState<any>(
    props.route.params != undefined ? props.route.params.item : []
  );
  const [retornoVideos, setRetonroVideos] = useState<any>([]);
  const [retornoBiblioteca, setRetornoBiblioteca] = useState<any>([]);
  const [categorias, setCategorias] = useState<any>([]);
  const [buscaGenerica, setBuscaGenerica] = useState<any>([]);

  const handleOpenUrl = (item: any) => {
    navigation.navigate("SinopseLivroDrawer", {
      item: item,
      pagina_origem: route.name,
    });
  };

  const buscaTermo = async () => { 
    //console.log('buscatermo');return;
    try {
      setIsLoading(true);

      let parametrosBuscaGenerica = {
        rota: "/busca",
        parametros: `token=${user.token}&q=${termoBusca}`,
        showNotification: false,
        showLogError: true,
      };

      let parametrosVideos = {
        rota: "/videos/",
        parametros: {
          token: user.token,
          token_client: cliente.token,
          q: termoBusca,
        },
        showNotification: false,
        showLogError: true,
      };

      let parametrosCategorias = {
        rota: "/categorias",
        parametros: `token=${user.token}&busca=${termoBusca}`,
        showNotification: false,
        showLogError: true,
      };

      let parametrosBiblioteca = {
        rota: "/biblioteca",
        parametros: `token=${user.token}&busca=${termoBusca}`,
        showNotification: false,
        showLogError: true,
      };

      const responseVideos = (await postData(parametrosVideos)) as any;
      const responseCategorias = (await getData(parametrosCategorias)) as any;
      const responseBiblioteca = (await getData(parametrosBiblioteca)) as any;
      const responseBuscaGenerica = (await getData(
        parametrosBuscaGenerica
      )) as any;

      setCategorias(responseCategorias.data.data.categorias);
      setRetonroVideos(responseVideos.data.data);
      //console.log(responseVideos.data.data, 'videos');
      setRetornoBiblioteca(responseBiblioteca.data.data);
      setBuscaGenerica(responseBuscaGenerica.data.data);

      setIsLoading(false);
      setTermoBusca2(termoBusca);
      return;
    } catch (error) {
      setIsLoading(false);
      console.log(error, "--> buscatermo error");
    }
  };

  const queryTermo = (data) => {
    console.log(data.length < 1)
    if(data.length < 1){
      return;
    }

    setTermoBusca(data);
    setIsLoading(true);
  };

  const MEMOVIDEOS = useMemo(() => {
    return (
      <>
        <View style={{ height: 15 }} />
        {retornoVideos.videos != undefined &&
          Object.values(retornoVideos.videos).length > 0 && (
            <>
              <HeaderScroll
                label={`Videos (${Object.values(retornoVideos.videos).length})`}
                show={false}
              />
              <ScrollHorizontalFlatList
                isFullScreen={false}
                numberOfLines={2}
                pagina_origem={route.name}
                serie={true}
                array={retornoVideos.videos != undefined
                  ? Object.values(retornoVideos.videos)
                  : []}
                categoria={{ categoria: {cod_categoria: Object.values(retornoVideos.videos)[0].cod_categoria_especifica}, videos: retornoVideos.videos != undefined
                  ? Object.values(retornoVideos.videos)
                  : [] }}
                playlist={retornoVideos.videos != undefined
                  ? Object.values(retornoVideos.videos)
                  : []}
                aovivo={false}
              />
            </>
          )}
        {buscaGenerica.playlists != undefined &&
          buscaGenerica.playlists.length > 0 && (
            <>
              <HeaderScroll
                //icon={"list-circle-outline"}
                label={`Playlists (${Object.values(buscaGenerica.playlists).length})`}
                show={false}
              />
              <ScrollHorizontalFlatListAudio
                numberOfLines={1}
                pagina_origem={route.name}
                array={buscaGenerica.playlists}
              />
            </>
          )}
        {buscaGenerica.audios != undefined && buscaGenerica.audios.length > 0 && (
          <>
            <View style={{ height: 15 }} />
            <HeaderScroll
              //icon={"musical-notes-outline"}
              label={`Audios (${Object.values(buscaGenerica.audios).length})`}
              show={false}
            />
            <ScrollHorizontalFlatListAudioFaixa
              numberOfLines={1}
              pagina_origem={route.name}
              array={buscaGenerica.audios}
            />
          </>
        )}
        <View style={{ height: 15 }} />
        {Object.values(retornoBiblioteca).length > 0 && <HeaderScroll 
          label={`Biblioteca Digital (${Object.values(retornoBiblioteca).length})`}
          show={false} 
        />}
      </>
    );
  }, [retornoVideos, buscaGenerica]);

  useEffect(() => {
    if (isFocused) {
      //alert(termoBusca);
      if (props.route.params != undefined) {
        setRetornoBusca(props.route.params.item);
      }

      if (retornoBusca != undefined)
        if (termoBusca == "" && retornoBusca.length > 0) {
          setRetornoBusca([]);
        }

      if (termoBusca != "") {
        //buscaTermo();
      }
    } else {
      //setRetonroVideos([]);
      //setRetornoBiblioteca([]);
      //setCategorias([]);

      if (retornoBusca != undefined)
        if (retornoBusca.length > 0) {
          setRetornoBusca([]);
        }

      if (termoBusca != "") {
        // setTermoBusca("");
        // setTermoBusca2("");
      }
    }

    const timeoutId = setTimeout(() => {
      if (termoBusca != "" && termoBusca != termoBusca2) buscaTermo();
    }, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFocused, termoBusca, retornoBusca, termoBusca2]);

  useEffect(()=>{
    if(isFocused){
      //alert(route.name)
     // alert('foooocusedddd'+ termoBusca)
    }
  },[isFocused])



  return (
    <>
      <PageHeaderBuscar termo={queryTermo} />
      <View style={{ alignItems: "center", paddingTop: hp("18.5%"), flex: 1 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {retornoBusca != undefined &&
              (termoBusca != "" ? (
                <CustomText
                  textType="montserratMedium"
                  style={{
                    fontSize: 15,
                    color: CustomDefaultTheme.colors.tabButtonBorder,
                  }}
                >
                  Exibindo resultado para: 
                  <CustomText
                    textType="montserratMedium"
                    style={{
                      fontSize: 15,
                      color: CustomDefaultTheme.colors.text,
                    }}
                  >
                    "{termoBusca}"
                  </CustomText>
                </CustomText>
              ) : termoBusca == termoBusca2 && retornoBusca.length < 1 ? (
                <CustomText
                  textType={"montserratMedium"}
                  style={{
                    fontSize: 15,
                    color: CustomDefaultTheme.colors.tabButtonBorder,
                  }}
                >
                  Nenhum resultado para "{termoBusca}"
                </CustomText>
              ) : (
                <></>
              ))}
          </View>
          {isLoading && termoBusca != "" ? (
              <View
              style={{
                paddingTop: 10,
              }}
            >
              <ActivityIndicator
                color={CustomDefaultTheme.colors.activityLoading}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                display: termoBusca == "" ? "none" : "flex",
              }}
            >
              <View>
                <FlatList
                  ListHeaderComponent={MEMOVIDEOS}
                  contentContainerStyle={{ flexGrow: 1, overflow: "scroll" }}
                  nestedScrollEnabled
                  data={retornoBiblioteca}
                  keyExtractor={(item) => item.cod_categoria}
                  numColumns={columns}
                  renderItem={({ item, index }) => {
                    if (item.empty) {
                      return <View style={[Styles.item, Styles.itemEmpty]} />;
                    }

                    return (
                      <>
                        <View style={Styles.thumbContent}>
                          <>
                            <TouchableOpacity
                              onPress={() => handleOpenUrl(item)}
                            >
                              <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={{
                                  uri: item.capa_biblioteca,
                                }}
                                style={[
                                  Styles.imgThumbContent,
                                  //{ ...passedStyles },
                                ]}
                              >
                                <CustomText
                                  style={{
                                    textAlign: "center",
                                    color:
                                      CustomDefaultTheme.colors.backgroundCards,
                                  }}
                                >
                                  {item.nome_categoria}
                                </CustomText>
                              </FastImage>
                            </TouchableOpacity>
                          </>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Buscar;
