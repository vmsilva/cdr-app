import React, { useState, useEffect, useMemo, useContext } from "react";
import { FlatList, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";

import Styles from "./Styles";
import CustomText from "../../componentes/componentes/customText";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { addTracks, removerQueues } from "../../../trackPlayerServices";
import { PlayerContext } from "../../configuracoes/contexts/PlayerContext";
import { useAuth } from "../../configuracoes/hooks/auth";
import { getData } from "../../configuracoes/services/request";
import { convertObjetoZoeParaPlaylistReactTrackPlayer } from "../../configuracoes/utils/utils";
import MosaicoVertical from "../../componentes/body/mosaicoVertical";
import PageHeader from "../../componentes/header";
import CardAudio from "../../componentes/audioPlayer/cardAudio";
import CardVideo from "../../componentes/body/cardVideo";

const MinhaLista: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const { setExibePlayer } = useContext(PlayerContext);
  const { meusAudios, minhaListaBook, minhaLista } = useContext(UtilContext); //minhaListaBook
  const [isLoading, setIsLoading] = useState(true);
  const [minhaLista_, setMinhaLista_] = useState<any>([]);
  const [minhaListaBook_, setMinhaListaBook_] = useState<any>([]);
  const [minhaListaAudio, setMinhaListaAudio] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState("meus_videos");

  const addTrackCard = async (params: any = null, posicao: any = null) => {
    //alert(posicao); return;
    try {
      let OBJETEOZOE = convertObjetoZoeParaPlaylistReactTrackPlayer(params);
      //console.log(params.length); return;
      await removerQueues();
      await addTracks(OBJETEOZOE, posicao);

      if (posicao != undefined && posicao > 0) {
        await TrackPlayer.skip(posicao, 0);
      }

      setExibePlayer(true);
      await TrackPlayer.play();

      return;
    } catch (error) {
      console.log("addtrack error -->", error);
    }
  };

  const changeMinhaLista = (data) => {
    console.log(data);
    if (data == "atualiza_video") {
      buscaMinhaLista();
    }
    if (data == "atualiza_livro") {
      buscaMinhaListaBook();
    }
  };

  const buscaMinhaLista = async () => {
    console.log("busca minha lista");
    setIsLoading(true);
    try {
      let parametros = {
        rota: "/minhalista",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      const response = (await getData(parametros)) as any;
      setMinhaLista(response.data.data);
      console.log(parametros);
    } catch (error) {
      console.log(`--> error ${error}`);
    }
    setIsLoading(false);
  };

  const buscaMinhaListaBook = async () => {
    console.log("busca minha lista");
    setIsLoading(true);
    try {
      let parametros = {
        rota: "minhalista/biblioteca",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
        showLog: true,
      };
      const response = (await getData(parametros)) as any;
      setMinhaListaBook_(response.data.data);
      console.log(parametros);
    } catch (error) {
      console.log(`--> error ${error}`);
    }
    setIsLoading(false);
  };

  const buscaMinhaListaAudio = async () => {
    console.log("busca minha lista audio");
    setIsLoading(true);
    try {
      let parametros = {
        rota: "/minhalista/playlistaudio",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      setMinhaListaAudio(response.data.data);
      console.log(parametros);
    } catch (error) {
      console.log(`--> error ${error}`);
    }
    setIsLoading(false);
  };

  const CHAMAMETODOS = async () => {
    try {
      setIsLoading(true);
      await buscaMinhaLista();
      await buscaMinhaListaBook();
      await buscaMinhaListaAudio();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
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
        titulo={"Minha Lista"}
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
                right: 0,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  // TAB
  const COMPONENTEMEUSVIDEOS = useMemo(
    () => (
      <>
        <ScrollView
          style={{
            height: "100%",
            paddingTop: "1%",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={300}
        >
          <View style={[Styles.contentTab]}>
            <>
              {Object.values(minhaLista).map((_: any, index) => {
                return (
                  <View key={index + _.cod_video} style={[{ marginTop: 10 }]}>
                    <CardVideo item={_} array={Object.values(minhaLista)} index={index}/>
                  </View>
                );
              })}
            </>
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </>
    ),
    [minhaLista]
  );

  const RENDERITEMAUDIO = ({ item, index }) => {

    return (<CardAudio item={item} index={index} playlist={minhaListaAudio}/>);
  };

  const COMPONENTEMEUSAUDIOS = useMemo(
    () => (
      <>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={minhaListaAudio}
          horizontal={false} // Define a lista como horizontal
          renderItem={RENDERITEMAUDIO}
        />
      </>
    ),
    [minhaListaAudio, meusAudios]
  );

  useEffect(() => {
    buscaMinhaListaAudio();
    return () => {};
  }, [meusAudios]);

  const COMPONENTEBIBLIOTECADIGITAL = useMemo(
    () => (
      <>
        <View style={[Styles.contentTab]}>
          <MosaicoVertical
            item={Object.values(minhaListaBook_)}
            array={Object.values(minhaListaBook_)}
            tipo={"biblioteca_digital"}
          />
        </View>
      </>
    ),
    [minhaListaBook_]
  );

  const COMPONENTEHEADERTAB = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "2.5%",
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              Styles.tabButton,
              tabIndex == "meus_videos"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("meus_videos")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: .24,
                  lineHeight: 15,
                  color:
                    tabIndex == "meus_videos"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Meus Videos
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              //{display: 'none'},
              Styles.tabButton,
              tabIndex == "biblioteca_digital"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("biblioteca_digital")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: .24,
                  lineHeight: 15,
                  color:
                    tabIndex == "biblioteca_digital"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Meus Livros
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              //{display: 'none'},
              Styles.tabButton,
              tabIndex == "audios_tab"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("audios_tab")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: .24,
                  lineHeight: 15,
                  color:
                    tabIndex == "audios_tab"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Meus Audios
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <COMPONENTEBODYTAB />
      </>
    );
  };

  const COMPONENTEBODYTAB = () => {
    switch (tabIndex) {
      case "meus_videos":
        return (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30
            }}
          >
            {COMPONENTEMEUSVIDEOS}
          </View>
        );
        break;
      case "audios_tab":
        return (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 5
            }}
          >
            {COMPONENTEMEUSAUDIOS}
          </View>
        );
        break;
      case "biblioteca_digital":
        return (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 5
            }}
          >
            {COMPONENTEBIBLIOTECADIGITAL}
          </View> //BIBLIOTECADIGITAL
        );
        break;
    }
  };
  // TAB

  useEffect(() => {
    if (isFocused) {
      CHAMAMETODOS();
    } else {
     
      if (Object.values(minhaListaBook_).length > 0) {
        setMinhaListaBook_([]);
      }
    }
    return () => {};
  }, [isFocused]);

  return (
    <>
      <COMPONENTEHEADER />
      <View style={[Styles.container]}>
        <COMPONENTEHEADERTAB />
      </View>
    </>
  );
};

export default MinhaLista;
