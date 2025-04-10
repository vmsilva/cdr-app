import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  useWindowDimensions,
  FlatList,
  ScrollView,
  BackHandler,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  useNavigation,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { ActivityIndicator, Button } from "react-native-paper";

// Componentes
import CustomText from "../../componentes/componentes/customText";
import PageHeader from "../../componentes/header";
import MinhaListaButton from "../../componentes/botoes/minhaListaButton";
import CastButtom from "../../componentes/botoes/castButton";
import MaterialComplementar from "../../componentes/body/materialComplementar";
import Accordion from "../../componentes/body/accordion";

// Configuracoes
import Styles from "./Styles";
import StylesTablet from "./StylesTablet";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import { getData } from "../../configuracoes/services/request";
import { EMPRESA } from "../../configuracoes/utils/constants";
import { useAuth } from "../../configuracoes/hooks/auth";
import DownloadButton from "../../componentes/botoes/downloadButton";
import InputTextChat from "../../componentes/funcionalidade/inputTextChat";
import ItemBoxMensagem from "../../componentes/funcionalidade/itemBoxMensagem";
import AoVivoRelacionados from "../../componentes/body/aoVivoRelacionados";
import PlayerV3 from "../../componentes/v2/playerV3";
import { removerQueues } from "../../../trackPlayerServices";
import { PlayerContext } from "../../configuracoes/contexts/PlayerContext";
import { convertSeconds } from "../../configuracoes/utils/constants/utils";
import CompartilharButton from "../../componentes/botoes/compartilharButton";
import AccordionGenerico from "../../componentes/body/accordionGenerico";
import CardVideo from "../sinopseSerie/cardVideo";
import {
  checkNetworkConnection,
  MONTACATEGORIACOMTRILHAAPRESENTADORUNICA,
} from "../../configuracoes/utils/utils";
import ComponenteApresentador from "../sinopseSerie/componenteApresentador";

/*
i = sequencial
t = hora
n = nome base64
m = mensagem nome base64
a = url do avatar
u = codigo do usuario
p = Grupo do usuario

1 => 'Chat Liberado - Sem moderação',
2 => 'Chat Liberado - Com moderação',
3 => 'Chat Desativado',

*/
interface videoProps {
  cod_video: string;
  cod_cliente: string;
  hash_video: string;
  titulo_video: string;
  descricao_video: string;
  id_cdn_video: string;
  hls_path: string;
  data_upload_video: string;
  data_liberacao_video: string;
  data_remocao_video: string;
  url_thumb_video: string;
  url_thumb_vertical_video: string;
  url_hover_vertical_video: string;
  duracao_video: string;
  json_video: string;
  url_tmp_video: string;
  tags_video: string;
  versao_streaming: string;
  ordem_video: string;
  status_video: string;
  cod_categoria: string;
}

const screenHEIGHT = Dimensions.get("screen").height;
const TEMPOWATHING = 10;

const PlayerPage: React.FC<any> = (props) => {
  const windowDimensions = useWindowDimensions();
  const WindowHeight = windowDimensions.height;
  const orientation =
    windowDimensions.width > windowDimensions.height ? "landscape" : "portrait";
  const navigation = useNavigation() as any;
  const routes = useNavigationState((state) => state.routes);
  const isFocused = useIsFocused();
  const { aovivo } =
    props.route.params.aovivo != undefined ? props.route.params : "";
  const {
    item,
    isFullScreen,
    pagina_origem,
    cod_categoria_temporada,
    categoria,
  } = props.route.params.item != undefined ? props.route.params : ""; // categoria
  const { user, cliente } = useAuth();
  const { isTablet, pip, tvsAoVivo } = useContext(UtilContext);
  const { setExibePlayer } = useContext(PlayerContext);
  const [subTitulo, setSubTitulo] = useState<any>([]);

  //flag para orientacao vertical nao ficar em loop infinito
  const [verticalDisparo, setVerticalDisparo] = useState(false);
  const [flagVerificaOrientacao, setFlagVerificaOrientacao] = useState(true);
  const [largura, setLargura] = useState(Dimensions.get("screen").width);
  const [altura, setAltura] = useState(Dimensions.get("screen").height);
  const [orientacao, setOrientacao] = useState("PORTRAIT");
  const [headerHide, setHeaderHide] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [statusRede, setStatusRede] = useState(false);
  const [mensagens, setMensagens] = useState<any>([]);
  const [enviarTracker, setEnviarTracker] = useState(true);
  const [video, setVideo] = useState<videoProps | any>(
    item != undefined ? item : []
  );
  const [cod_status_chat, setCod_status_chat] = useState(
    item.cod_status_chat != undefined ? item.cod_status_chat : 3
  );
  const [showVideoTag, setShowVideoTag] = useState(false);
  const scrollRelacionadosRef = useRef() as any;
  const [mensagemEnviada, setMensagemEnviada] = useState<boolean>(false);
  const [keyBoardIsOpen, setKeyBoardIsOpen] = useState<boolean>(false);
  const [isLoadingRequestMessage, setIsloadingRequestMessage] = useState<
    boolean
  >(false);
  const scrollRef = useRef() as any;
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y;
  });
  const [legendas, setLegendas] = useState([]);
  const [cat, setCat] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState("componente_relacionados");
  const [botaoOrientacao, setBotaoOrientacao] = useState<boolean>(false); // victor orientacao true
  const [temporadaSelecionada, setTemporadaSelecionada] = useState<any>({});
  // Teclado aberto
  const flatListRef = useRef(null);
  // virando player automatico se orientacao desbloqueada
  const [orientation_, setOrientation_] = useState<any>("");

  // Teclado aberto
  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setKeyBoardIsOpen(true);

    setTimeout(() => rolarParaOFinal(), 10);
  });

  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setKeyBoardIsOpen(false);
  });

  const rolarParaOFinal = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  let STYLECHAT = {};

   // TAB
   const SELECTSTYLE = {
    backgroundColor: CustomDefaultTheme.colors.primaryButton,
    borderRadius: 10,
  };

  const STYLEBUTTONLAYOU = {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CustomDefaultTheme.colors.primaryButton
  };

  if (WindowHeight > 720 && WindowHeight < 810) {
    STYLECHAT = {
      maxHeight: keyBoardIsOpen
        ? Platform.OS == "android"
          ? hp("20")
          : hp("14")
        : Platform.OS == "android"
        ? hp("43")
        : hp("32"),
      paddingTop: keyBoardIsOpen
        ? Platform.OS == "android"
          ? hp("8")
          : 50
        : Platform.OS == "android"
        ? 10
        : 50,
    };
  }

  if (WindowHeight > 811 && WindowHeight < 910) {
    STYLECHAT = keyBoardIsOpen
      ? {
          paddingTop: 0,
          maxHeight: keyBoardIsOpen
            ? Platform.OS == "android"
              ? hp("17")
              : hp("13.5")
            : hp("44"),
        }
      : {
          maxHeight: keyBoardIsOpen
            ? Platform.OS == "android"
              ? hp("17")
              : hp("11")
            : hp("44"),
          paddingTop: 50,
        };
  }

  if (WindowHeight > 911) {
    STYLECHAT = {
      maxHeight: keyBoardIsOpen
        ? Platform.OS == "android"
          ? hp("20")
          : hp("16")
        : Platform.OS == "android"
        ? hp("48")
        : hp("44"),
      paddingTop: Platform.OS == "android" ? 0 : 50,
    };
  }

  const buscaLegendas = useCallback(async () => {
    console.log("buscaLegenda");
    try {
      let params = {
        rota: `/videos/legenda/${item.cod_video}`,
        parametros: ``,
        showNotification: false,
        showLogError: true,
      } as any;

      //console.log(params);
      const response = (await getData(params)) as any;

      if (response.error != undefined) {
        return false;
      }

      setLegendas(Object.values(response.data.data));
    } catch (error) {
      //console.log(error, "ao buscar legendasss");
    }
  }, [legendas, item]);

  useEffect(() => {}, [legendas]);

  const acoordionItemPress = (data: any) => {
    handleTop();
  };

  const handleUrl = async () => {
    //console.log(temporadaSelecionada.palestrantes_temporada[0].url_foto_palestrante, '-->> itemmmm'); return;
    try {
      let conec = await checkNetworkConnection();
      if (!conec) {
        navigation.navigate("DownloadTab");
        return;
      }

      if (pagina_origem != undefined) {
        //alert('boraaaaa'+pagina_origem)
        console.log(categoria.categoria);
        if (categoria.categoria == undefined) {
          navigation.goBack();
          return;
        }

        let ITMETRATA = categoria.categoria;
        ITMETRATA["url_foto_apresentador"] =
          temporadaSelecionada.palestrantes_temporada[0].url_foto_palestrante;
        ITMETRATA["subtitulo_apresentador"] =
          temporadaSelecionada.palestrantes_temporada[0].subtitulo_apresentador;
        ITMETRATA["apresentacao_apresentador"] =
          temporadaSelecionada.palestrantes_temporada[0].apresentacao_apresentador;
        ITMETRATA["nome_apresentador"] =
          temporadaSelecionada.palestrantes_temporada[0].nome_palestrante;
        ITMETRATA["duracao_formatada"] = temporadaSelecionada.duracao_formatada;
        ITMETRATA["videos"] = temporadaSelecionada.videos;
        //console.log(ITMETRATA.nome_apresentador, temporadaSelecionada.palestrantes_temporada[0].nome_palestrante);return;

        //console.log(ITMETRATA, '-->> itemmmm'); return;

        navigation.navigate(pagina_origem, {
          item: ITMETRATA, //categoria.categoria,
          categoria: categoria,
          cod_categoria_temporada: cod_categoria_temporada,
        });
      } else {
        navigation.navigate("HomeDrawer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTop = () => {
    //return;
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleOrientacao = async () => {
    try {
      const orientation = await ScreenOrientation.getOrientationAsync();

      if (!headerHide) {
        PlayerNaHorizontalButton();
      } else {
        if (orientation == 3 || orientation == 4) {
          await PlayerVerticalButton();
        }

        setBotaoOrientacao(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PlayerVertical = async (bloqueia_vertical: any = null) => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );

      setHeaderHide(false);
      setSubTitulo([]);
      setVerticalDisparo(false);
      setOrientacao("PORTRAIT");

      if (!bloqueia_vertical) {
        await ScreenOrientation.unlockAsync();
      }
      console.log("verticall");
    } catch (error) {
      console.log(error);
    }
  };

  const buscaCategoria = async () => {
    try {
      let parametros = {
        rota: `/categorias/categoria/${item.cod_categoria}`,
        parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      //setCategoria(response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error, "Erro ao buscar categoria");
    }
  };

  const PlayerNaHorizontalButton = async (orient: any = null) => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );

      setHeaderHide(true);
      setOrientacao("landscape");
      setBotaoOrientacao(true);
      //setOrientation_(3);

      //await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const PlayerVerticalButton = async (orient: any = null) => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );

      setHeaderHide(true);
      setOrientacao("landscape");
      setBotaoOrientacao(true);
      //setOrientation_(3);

      //await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const PlayerNaHorizontal = async (orient: any = null) => {
    try {
      if (!orient) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        );
      } else {
        if (orient == 3) {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
          );
        }
        if (orient == 4) {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
          );
        }
      }
      setHeaderHide(true);
      setOrientacao("landscape");

      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const reloadRelacionados = async (data) => {
    try {
      if (data) {
        const resp = await buscaCategoria();
        console.log(categoria, "categoooriaaaa--->victor");
        //setCategoria(resp);
      }
    } catch (error) {
      console.log(error, "reloadRelacionados");
    }
  };

  const buscaMensagens = useCallback(async () => {
    try {
      let parametrosSala = {
        rota: `/salas/get/${item.cod_video}`,
        parametros: `token_cliente=${cliente.token}`,
        showNotification: false,
        showLogError: true,
      };
      //console.log(parametrosSala);
      const responseSala = (await getData(parametrosSala)) as any;

      let parametros = {
        rota: `/salas/chat/${item.cod_video}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await getData(parametros)) as any;

      //console.log(responseSala.data.data.cod_status_chat)
      setCod_status_chat(responseSala.data.data.cod_status_chat);

      if (response.data.data != null) {
        setMensagens(response.data.data);
      }
    } catch (error) {
      console.log("carrega mensagens", error);
    }
  }, [mensagens, item]);

  const retornoSendChatAoVivo = useCallback(
    async (data: any) => {
      try {
        await buscaMensagens();
        rolarParaOFinal();
      } catch (error) {
        console.log(error);
      }
    },
    [mensagens]
  );

  const COMPONENTELABEL = (props) => {
    return (
      <View
        style={{
          marginTop: 10,
          width: "100%",
          borderTopWidth: 0.4,
          paddingTop: 10,
          paddingHorizontal: "5%",
        }}
      >
        <CustomText
          textType="montserratBold"
          style={[
            {
              color: CustomDefaultTheme.colors.tituloCategoria,
              fontSize: 14,
              lineHeight: 18,
            },
          ]}
        >
          {props.label}
        </CustomText>
      </View>
    );
  };

  const COMPONENTEHEADER = useMemo(() => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity onPress={handleUrl}>
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
              <FontAwesome
                name="angle-left"
                size={27}
                color={CustomDefaultTheme.colors.branco}
              />
            </View>
          </TouchableOpacity>
        }
        titulo={""}
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
            >
              <TouchableOpacity
                onPress={() => {
                  setFlagVerificaOrientacao(false);
                  if (orientation == "landscape") {
                  }
                }}
                style={[
                  {},
                  Platform.OS == "ios"
                    ? Styles.orientacaoBtnIos
                    : Styles.orientacaoBtnAndroid,
                ]}
              ></TouchableOpacity>
            </View>
          </View>
        }
      />
    );
  }, [cod_categoria_temporada, temporadaSelecionada]);

  const COMPONENTECARREGANDOPLAYER = () => {
    return (
      <>
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: item.url_thumb_video }}
            style={{
              marginTop: Platform.OS == "ios" ? 100 : 100,
              height: hp("30%"),
              width: "100%",
            }}
          />
          <View
            style={{
              marginTop: Platform.OS == "ios" ? 10 : 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <ActivityIndicator
                color={CustomDefaultTheme.colors.buttonPrimary}
                size={40}
              />
              <CustomText
                textType="bold"
                style={{
                  color: CustomDefaultTheme.colors.buttonPrimary,
                  fontSize: 20,
                }}
              >
                Carregando ....
              </CustomText>
            </View>
          </View>
        </View>
      </>
    );
  };

  const COMPONENTEMATERIALCOMPLEMENTAR = (props) => {
    if (props.array != undefined)
      return (
        <View
          style={{
            marginTop: 10,
            paddingLeft: wp("5"),
            paddingRight: wp("5"),
            width: wp("100"),
          }}
        >
          <MaterialComplementar array={props.array} />
        </View>
      );
  };

  const COMPONENTEACORDION = useMemo(() => {
    if (aovivo) {
      return;
    }

    if (!categoria) {
      return <></>;
    }

    return (
      <View
        style={{
          marginTop: 10,
          paddingLeft: wp("5"),
          paddingRight: wp("5"),
          width: wp("100"),
        }}
      >
        <Accordion
          isPressed={acoordionItemPress}
          isExpanded={true}
          titulo={
            categoria.categoria != undefined
              ? categoria.categoria.nome_categoria
              : ""
          }
          array={categoria}
          isFullScreen={false}
          pagina_origem={"SinopseSerieDrawer"}
          serie={true}
          materia={item}
          objeto_curricular={categoria.filhos}
          material={categoria.arquivos_categoria}
          categoria={categoria}
        />
      </View>
    );
  }, [categoria, props.route.params.categoria, aovivo]);

  const COMPONENTEACORDIONGENERICOTEMPORADA = useMemo(() => {

    if(categoria == undefined){
      return;
    }

    if (categoria.videos == undefined) {
      return <></>;
    }

    if (categoria.temporadas == undefined) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 10,
          paddingLeft: wp("5"),
          paddingRight: wp("5"),
          width: wp("100"),
        }}
      >
        {categoria.temporadas.map((item, index) => {
          if (item.cod_categoria_temporada == cod_categoria_temporada) {
            console.log(
              cod_categoria_temporada,
              "codigo categoria temporada",
              item
            );

            let CATPORAPRESENTADOR = MONTACATEGORIACOMTRILHAAPRESENTADORUNICA(
              categoria,
              item
            );

            setTemporadaSelecionada(item);

            return (
              <View
                key={item.cod_categoria_temporada}
                style={{
                  marginTop: 10,
                  width: "100%",
                }}
              >
                {
                  <AccordionGenerico
                    isExpanded={false}
                    headerColor={CustomDefaultTheme.colors.bottomTab}
                    background={"transparent"}
                    titulo={item.nome_temporada}
                    children={
                      <>
                        {Object.values(item.videos).map((_: any, i) => {
                          return (
                            <CardVideo
                              key={`${_.cod_categoria}_${_.cod_video}`}
                              item={_}
                              categoria={CATPORAPRESENTADOR}
                              pagina_origem={"SinopseSerieDrawer"}
                              index={i + 1}
                              cod_categoria_temporada={
                                item.cod_categoria_temporada
                              }
                            />
                          );
                        })}
                      </>
                    }
                  />
                }
              </View>
            );
          }
        })}
      </View>
    );
  }, [categoria, aovivo, cod_categoria_temporada, item]);

  // evita ficar renderizando o componente de maneira desnecessaria
  const COMPONENTEMSG = useMemo(() => {
    //return
    if (mensagens.length == 0) {
      return;
    }

    if (cod_status_chat == 3) {
      return;
    }

    return (
      <FlatList
        onLayout={rolarParaOFinal}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
          //backgroundColor: '#000'
        })}
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={mensagens}
        keyExtractor={(item, index) => `${index}`}
        initialScrollIndex={0}
        renderItem={({ item, index }) => {
          return (
            <>
              <ItemBoxMensagem mensagem={item} />
            </>
          );
        }}
        inverted
        windowSize={5}
        style={STYLECHAT}
        decelerationRate="fast"
      />
    );
  }, [mensagens, keyBoardIsOpen, cod_status_chat]);

  // TAB
  const COMPONENTEHEADERTAB = useMemo(() => {
    return (
      <>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingBottom: 10,
            },
            Platform.OS == "android" && { top: -20 },
          ]}
        >
          {aovivo  && (
            <TouchableOpacity
              style={[
                Styles.tabButton,
                tabIndex == "componente_chat" ? SELECTSTYLE : STYLEBUTTONLAYOU,
                { display: item.status_chat_tv == 0 ? "none" : "flex" },
              ]}
              onPress={() => setTabIndex("componente_chat")}
            >
              <View style={[Styles.tabContentButton]}>
                <CustomText
                  numberOfLines={2}
                  textType="extraBold"
                  style={[Styles.fontTabHeader]}
                >
                  Chat
                </CustomText>
              </View>
            </TouchableOpacity>
          )}

          {item.descricao_video != "" && (
            <TouchableOpacity
              style={[
                Styles.tabButton,
                tabIndex == "componente_sobre" ? SELECTSTYLE : STYLEBUTTONLAYOU,
              ]}
              onPress={() => setTabIndex("componente_sobre")}
            >
              <View style={[Styles.tabContentButton]}>
                <CustomText
                  numberOfLines={2}
                  textType="montserratSemiBold"
                  style={[Styles.fontTabHeader]}
                >
                  Programação
                </CustomText>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              Styles.tabButton,
              tabIndex == "componente_relacionados"
                ? SELECTSTYLE
                : STYLEBUTTONLAYOU,
            ]}
            onPress={() => setTabIndex("componente_relacionados")}
          >
            <View style={[Styles.tabContentButton]}>
              <CustomText
                numberOfLines={2}
                textType="montserratSemiBold"
                style={[Styles.fontTabHeader]}
              >
                Relacionados
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }, [tabIndex, mensagens, item]);

  // COMPONENTE
  const AOVIVORELACIONADOSCOMPONENTE = useMemo(() => {
    //console.log(Object.values(tvsAoVivo).length, '--> tvs ao vivo'); return;

    if (
      Object.values(tvsAoVivo).length == 0 ||
      Object.values(tvsAoVivo) == undefined
    ) {
      return;
    }

    return (
      <>
        {Object.values(tvsAoVivo).map((_: any, index) => {
          if (_.cod_aovivo == item.cod_aovivo) {
            return;
          }

          return (
            <AoVivoRelacionados
              key={_.cod_aovivo + index}
              item={_}
              array={Object.values(tvsAoVivo)}
            />
          );
        })}
      </>
    );
  }, [tvsAoVivo, item]);
  // COMPONENTE

  const COMPONENTESOBRE = useMemo(() => {
    return (
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <CustomText
          textType="montserratLight"
          style={{
            fontSize: 16,
          }}
        >
          {item.nome_video}
        </CustomText>
        <CustomText
          textType="montserratLight"
          style={{
            fontSize: 16,
          }}
        >
          {item.descricao_video}
        </CustomText>
      </ScrollView>
    );
  }, [item]);

  const COMPONENTEBODYTAB = useMemo(() => {
    switch (tabIndex) {
      case "componente_relacionados":
        return (
          <View style={[Styles.tabContent]}>
            {AOVIVORELACIONADOSCOMPONENTE}
          </View>
        );
        break;
      case "componente_chat":
        return (
          <View
            style={[
              Styles.tabContent,
              Platform.OS == "android" && { marginTop: -20 },
            ]}
          >
            {COMPONENTEMSG}
          </View>
        );
        break;
      case "componente_sobre":
        return <View style={[Styles.tabContent]}>{COMPONENTESOBRE}</View>;
        break;
    }
  }, [tabIndex, mensagens, keyBoardIsOpen]);

  const COMPONENTEAPRESENTADOR = useMemo(() => {

    if(aovivo){
      return
    }
    //console.log(categoria.length, '-->> categoria') ///
    //if (categoria.length == 0) return <></>;
    console.log(categoria.palestrante_temporada, "temporada selecionadaaaa victor");

    if (categoria.palestrante_temporada != undefined) {
      //console.log(temporadaSelecionada, "temporada selecionadaaaa");
      return (
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: wp("5"),
            width: wp("100"),
          }}
        >
          <ComponenteApresentador
            item={categoria.palestrante_temporada}
          />
        </View>
      );
    }
  }, [categoria]);

  // COMPONENTES
  // mata audio player
  const MATAPLAYERAUDIO = async () => {
    try {
      await removerQueues();

      setExibePlayer(false);
    } catch (error) {
      console.log(error);
    }
  };

  // tracker
  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setEnviarTracker(!enviarTracker);
      if (aovivo && aovivo != undefined) {
        buscaMensagens();
      }
    }, TEMPOWATHING * 1000);

    return () => window.clearTimeout(timeoutID);
  }, [item, enviarTracker]);

  useEffect(() => {
    if (isFocused) {
      if (isFullScreen && flagVerificaOrientacao) {
        PlayerNaHorizontal(); // victor aqui
      }

      setVideo(item == undefined ? [] : item);
      setVerticalDisparo(true);
      setTimeout(() => setShowVideoTag(true), 300);
      scrollRelacionadosRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      if (verticalDisparo) {
        PlayerVertical(true); // victor aqui

        setShowVideoTag(false);
      }

      if (!flagVerificaOrientacao) {
        setFlagVerificaOrientacao(true);
      }

      if (mensagens.length > 0) {
        setMensagens([]);
      }

      if (legendas.length > 0) {
        setLegendas([]);
      }
    }

    return () => {
      setIsloading(false);
    };
  }, [
    isFocused,
    subTitulo,
    verticalDisparo,
    flagVerificaOrientacao,
    largura,
    altura,
    orientacao,
    headerHide,
    isLoading,
    statusRede,
    video,
    item,
  ]);

  useEffect(() => {
    if (isFocused) {
      if (aovivo != undefined && aovivo) buscaMensagens();

      /*setCategoria(
        props.route.params.categoria != undefined
          ? props.route.params.categoria
          : null
      ); */

      MATAPLAYERAUDIO();
    }
    return () => {};
  }, [isFocused, item]);

  useEffect(() => {
    return () => {};
  }, [item]);

  useEffect(() => {
    return () => {};
  }, [orientation]);

  useEffect(() => {
    console.log(pip, "--->>> pip status");
    return () => {};
  }, [pip]);

  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };

    unlockOrientation();

    return () => {};
  }, []);

  useEffect(() => {
    const getOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (botaoOrientacao) {
        return;
      }
      setOrientation_(orientation);

      if (orientation == 1 || orientation == 2) {
        //alert('vertical bbbb')
        PlayerVertical();
      }

      if (orientation == 3 || orientation == 4) {
        //alert(orientation +'--'+ botaoOrientacao);

        PlayerNaHorizontal(orientation);
      }
    };

    //alert(orientation_)

    const subscription = ScreenOrientation.addOrientationChangeListener(
      getOrientation
    );

    getOrientation(); // Obtém a orientação inicial

    return () => {
      subscription.remove(); // Remove o ouvinte ao desmontar o componente
    };
  }, [botaoOrientacao]);

  if (aovivo) {
    return (
      <>
        <Animated.View
          style={[
            !pip && { height: hp("92.5") },
            pip && {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {!pip && !headerHide && <>{COMPONENTEHEADER}</>}

          <View
            style={{
              marginTop: !headerHide
                ? screenHEIGHT > 750
                  ? Platform.OS == "ios"
                    ? wp("26")
                    : wp("46")
                  : wp("18.1")
                : 0,
            }}
          >
            <PlayerV3 // victor
              cod_categoria_temporada={cod_categoria_temporada}
              reloadCategoria={reloadRelacionados}
              legendas_video={legendas.length > 0 ? legendas : null}
              categoria={cat ? cat : categoria}
              playlist={
                cat
                  ? cat
                  : categoria != undefined
                  ? categoria.videos != undefined
                    ? categoria.videos
                    : []
                  : []
              }
              aovivo={aovivo}
              pagina_origem={pagina_origem}
              seek_video={
                video.segundos_assistidos != undefined
                  ? video.segundos_assistidos
                  : 0
              }
              publicidade={[]}
              orientacao={orientacao}
              item={item}
              width={pip ? "100%" : headerHide ? altura : largura}
              height={pip ? "100%" : headerHide ? largura : altura}
              titulo={""}
              backButton={
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setFlagVerificaOrientacao(false);
                      handleOrientacao();
                      //PlayerVertical()
                    }}
                    style={[
                      {},
                      Platform.OS == "ios"
                        ? Styles.orientacaoBtnIos
                        : Styles.orientacaoBtnAndroid,
                    ]}
                  >
                    {false ? (
                      <MaterialCommunityIcons
                        name={"keyboard-backspace"}
                        size={30}
                        color="#FFF"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={!headerHide ? "fullscreen" : "fullscreen-exit"}
                        size={30}
                        color="#FFF"
                      />
                    )}
                  </TouchableOpacity>
                </>
              }
              castButton={
                <>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[
                      {},
                      Platform.OS == "ios"
                        ? Styles.orientacaoBtnIos
                        : Styles.orientacaoBtnAndroid,
                    ]}
                  >
                    <CastButtom color={props.color} item={item} />
                  </TouchableOpacity>
                </>
              }
            />
          </View>

          {!pip && !headerHide && showVideoTag && (
            <View
              style={[
                {
                  //backgroundColor: CustomDefaultTheme.colors.preto,
                  zIndex: 101,
                  marginTop:
                    Platform.OS == "ios" ? (isTablet ? 60 : 0) : wp("-1.5"), //-70
                  paddingTop: 0,
                },
                keyBoardIsOpen && {
                  backgroundColor: CustomDefaultTheme.colors.background,
                  marginTop:
                    Platform.OS == "ios"
                      ? WindowHeight > 780
                        ? -90
                        : -120
                      : -50,
                },
              ]}
            >
              <View
                style={
                  isTablet
                    ? StylesTablet.blocoInformacoes
                    : Styles.blocoInformacoes
                }
              >
                {aovivo && (
                  <>
                    {video.imagem_logo_tv != "" ? (
                      <FastImage
                        source={{
                          uri: video.imagem_logo_tv,
                        }}
                        style={{
                          minWidth: wp("18"),
                          minHeight: wp("10"),
                          marginRight: 30,
                          display: "none",
                        }}
                        //resizeMode="contain"
                      />
                    ) : (
                      <CustomText
                        textType="bold"
                        style={{ marginTop: 10, fontSize: 12, width: wp("35") }}
                      >
                        {video.titulo_video}
                      </CustomText>
                    )}
                  </>
                )}

                <View style={{ marginTop: -5 }}>
                  <View
                    style={{
                      paddingTop: 5,
                    }}
                  >
                    <CustomText
                      numberOfLines={1}
                      textType="bold"
                      style={[Styles.font, { maxWidth: wp("100") }]}
                    >
                      {video.titulo_video}
                    </CustomText>
                    <CustomText
                      numberOfLines={2}
                      textType="light"
                      style={[{ maxWidth: wp("100"), fontSize: 12 }]}
                    >
                      {video.descricao_video}
                    </CustomText>
                  </View>
                </View>
              </View>

              {aovivo && cod_status_chat != 3 && (
                <View
                  style={[Platform.OS == "android" && { bottom: wp("20") }]}
                >
                  {COMPONENTEHEADERTAB}

                  {COMPONENTEBODYTAB}
                </View>
              )}
            </View>
          )}
        </Animated.View>

        {cod_status_chat != 3 && tabIndex == "componente_chat" && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "position"}
            style={[
              keyBoardIsOpen && {
                bottom: Platform.OS == "ios" ? -20 : 17,
              },
            ]}
            keyboardVerticalOffset={0}
          >
            <InputTextChat
              mensagensCarrega={retornoSendChatAoVivo}
              avatar={user.url_avatar}
              style={[
                {
                  position: "relative",
                },
                Platform.OS == "android" && { top: 20 },
              ]}
              cod_video={item.cod_video}
            />
          </KeyboardAvoidingView>
        )}
      </>
    );
  }

  useEffect(() => {
    console.log(item, "item");

    scrollToTop();
  }, [item]);

  // carrega legendas
  useEffect(() => {
    if (isFocused) {
      if (legendas) buscaLegendas();
    }else{ 
      //setTabIndex('componente_relacionados')
    }
    return () => {};
  }, [isFocused, item]);

 
  // backbutton android 
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) { 
        handleUrl()
        //navigation.goBack();
        return true; // Impede o fechamento do app
      }
      return false; // Permite o fechamento do app se não houver navegação
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    return () => backHandler.remove();
  }, [navigation]);

  // virando player automatico se orientacao desbloqueada
  return (
    <>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[!pip && { height: hp("100") }, pip && {}]}
        data={[1]}
        contentContainerStyle={[
          pip && {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        renderItem={() => {
          return (
            <View
              style={[
                pip && {
                  height: "100%",
                  width: "100%",
                  //flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              {!pip && !headerHide && showVideoTag && <>{COMPONENTEHEADER}</>}

              {showVideoTag ? ( //showVideoTag
                <View
                  style={{
                    marginTop: !headerHide
                      ? screenHEIGHT > 750
                        ? Platform.OS == "ios"
                          ? wp("26")
                          : wp("46")
                        : wp("18.1")
                      : 0,
                  }}
                >
                  <PlayerV3
                    reloadCategoria={reloadRelacionados}
                    categoria={cat ? cat : categoria}
                    legendas_video={legendas.length > 0 ? legendas : null}
                    playlist={
                      cat
                        ? cat
                        : categoria != undefined
                        ? categoria.videos != undefined
                          ? Object.values(categoria.videos)
                          : []
                        : []
                    }
                    aovivo={aovivo}
                    pagina_origem={pagina_origem}
                    seek_video={
                      video.segundos_assistidos != undefined
                        ? video.segundos_assistidos
                        : 0
                    }
                    publicidade={[]}
                    orientacao={orientacao}
                    item={item}
                    width={pip ? "100%" : headerHide ? altura : largura}
                    height={pip ? "100%" : headerHide ? largura : altura}
                    titulo={""}
                    backButton={
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setFlagVerificaOrientacao(false);
                            handleOrientacao();
                          }}
                          style={[
                            {},
                            Platform.OS == "ios"
                              ? Styles.orientacaoBtnIos
                              : Styles.orientacaoBtnAndroid,
                          ]}
                        >
                          {false ? (
                            <MaterialCommunityIcons
                              name={"keyboard-backspace"}
                              size={30}
                              color="#FFF"
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name={
                                !headerHide ? "fullscreen" : "fullscreen-exit"
                              }
                              size={30}
                              color="#FFF"
                            />
                          )}
                        </TouchableOpacity>
                      </>
                    }
                    castButton={
                      <>
                        <TouchableOpacity
                          onPress={() => {}}
                          style={[
                            {},
                            Platform.OS == "ios"
                              ? Styles.orientacaoBtnIos
                              : Styles.orientacaoBtnAndroid,
                          ]}
                        >
                          <CastButtom color={props.color} item={item} />
                        </TouchableOpacity>
                      </>
                    }
                  />
                </View>
              ) : (
                <COMPONENTECARREGANDOPLAYER />
              )}

              {!pip && !headerHide && showVideoTag && (
                <>
                  <View
                    style={
                      isTablet
                        ? StylesTablet.blocoInformacoes
                        : Styles.blocoInformacoes
                    }
                  >
                    {aovivo && (
                      <>
                        {video.imagem_logo_tv != "" ? (
                          <FastImage
                            source={{
                              uri: video.imagem_logo_tv,
                            }}
                            style={{
                              minWidth: wp("18"),
                              minHeight: wp("10"),
                              marginRight: 30,
                              display: "none",
                            }}
                          />
                        ) : (
                          <CustomText
                            textType="bold"
                            style={{
                              marginTop: 10,
                              fontSize: 12,
                              width: wp("35"),
                            }}
                          >
                            {video.titulo_video}
                          </CustomText>
                        )}
                      </>
                    )}

                    <View style={{ marginTop: -5 }}>
                      {!aovivo && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              minWidth: "70%",
                            }}
                          >
                            {item.subtitulo_video !== "" &&
                              item.subtitulo_video != undefined && (
                                <View
                                  style={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginRight: 10,
                                    display:
                                      item.subtitulo_video !== ""
                                        ? "flex"
                                        : "none",
                                  }}
                                >
                                  <CustomText
                                    textType="montserratMedium"
                                    numberOfLines={2}
                                    style={{
                                      //width: '30%',
                                      color: CustomDefaultTheme.colors.fontPlayerPage, //, color: CustomDefaultTheme.colors.fontPlayerPage
                                      fontSize: 18,
                                      letterSpacing: 0.18,
                                      lineHeight: 22,
                                    }}
                                  >
                                    {item.subtitulo_video}
                                  </CustomText>
                                </View>
                              )}
                            <View
                              style={{
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <CustomText
                                numberOfLines={2}
                                textType="montserratRegular"
                                style={{
                                  //width: '30%',
                                  fontSize: 11,
                                  color:
                                    CustomDefaultTheme.colors
                                      .bioapresentadorFont,
                                  letterSpacing: 0,
                                  lineHeight: 14,
                                }}
                              >
                                {`${convertSeconds(video.duracao_video)}`}
                              </CustomText>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <MinhaListaButton
                              background={CustomDefaultTheme.colors.backgroundIconsButton}
                              cod_video={item.cod_video}
                              changeMinhaLista={() => {}}
                            />
                            <View
                              style={{
                                marginLeft: 10,
                                display:
                                  item.mp4 == undefined ? "none" : "flex",
                              }}
                            >
                              <DownloadButton
                                color={CustomDefaultTheme.colors.primaryButton}
                                item={item}
                                hls={item.mp4}
                              />
                            </View>
                            <View
                              style={{
                                marginLeft: 10,
                                display:
                                  item.mp4 == undefined ? "none" : "flex",
                              }}
                            >
                              <CompartilharButton
                                background={CustomDefaultTheme.colors.backgroundIconsButton}
                                tipo={aovivo ? 2 : 210}
                                array={item}
                                temporada={temporadaSelecionada}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                      <View
                        style={{
                          paddingTop: 5,
                        }}
                      >
                        <CustomText
                          numberOfLines={2}
                          textType="montserratBold"
                          style={[Styles.font, { maxWidth: wp("100") }]}
                        >
                          {video.titulo_video}
                        </CustomText>
                        <CustomText
                          numberOfLines={2}
                          textType="montserratRegular"
                          style={[
                            {
                              maxWidth: wp("100"),
                              fontSize: 12,
                              letterSpacing: 0.24,
                              lineHeight: 19,
                              color:
                                CustomDefaultTheme.colors.bioapresentadorFont,
                            },
                          ]}
                        >
                          {video.descricao_video}
                        </CustomText>
                      </View>
                    </View>
                  </View>

                  {aovivo && cod_status_chat != 3 && (
                    <View
                      style={[Platform.OS == "android" && { bottom: wp("20") }]}
                    >
                      <COMPONENTELABEL label="Envie sua mensagem" />
                      {COMPONENTEMSG}
                    </View>
                  )}

                  {!aovivo && (
                    <View
                      style={[Platform.OS == "android" && { bottom: wp("20") }]}
                    >
                      {video.arquivos_video != undefined &&
                        video.arquivos_video.length > 0 && (
                          <>
                            <COMPONENTELABEL label="Material Complementar" />
                            <COMPONENTEMATERIALCOMPLEMENTAR
                              array={video.arquivos_video}
                            />
                          </>
                        )}

                      {categoria != undefined && categoria.length != 0 && (
                        <>
                          <COMPONENTELABEL label={"Próximas aulas"} />

                          {COMPONENTEACORDIONGENERICOTEMPORADA}
                        </>
                      )}

                      {categoria != undefined  && (
                        <>{COMPONENTEAPRESENTADOR}</>
                      )}
                    </View>
                  )}
                </>
              )}
            </View>
          );
        }}
      />
    </>
  );
};

export default PlayerPage;
