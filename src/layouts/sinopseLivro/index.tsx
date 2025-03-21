import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StarRating from "react-native-star-rating-widget"; // --> novo
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// estilos
import Styles from "./Styles";
import CustomText from "../../componentes/componentes/customText";
import FastImage from "react-native-fast-image";
import PageHeader from "../../componentes/header";
import Loading from "../../componentes/funcionalidade/Loading";
import { Button } from "react-native-paper";
import { useAuth } from "../../configuracoes/hooks/auth";
import { postData } from "../../configuracoes/services/request";
import { retornaNumeroComMascara } from "../../configuracoes/utils/utils";
import MinhaListaButtonBook from "../../componentes/botoes/minhaListaButtonBook";
import TextoExpand from "../../componentes/funcionalidade/TextoExpand";
import CompartilharButton from "../../componentes/botoes/compartilharButton";

const screenHEIGHT = Dimensions.get("screen").height;

const SinopseLivro: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const scrollRef = useRef() as any;
  const { pagina_origem } = // categoria
    props.route.params.pagina_origem != undefined ? props.route.params : "";
  const { item } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [leituras, setLeituras] = useState<number>(0);
  const [book, setBook] = useState<any>(item != undefined && item);
  const [rating, setRating] = useState(item.rating_avg);

  const handleTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleOpenUrl = () => {
    navigation.navigate("BookReaderDrawer", {
      item: item,
      pagina_origem: "SinopseLivroDrawer",
    });
  };

  function ratingCompleted(rating) {
    ratinkBook(rating);
    setRating(rating);
  }

  const livroVisualizado = async () => {
    try {
      let parametros = {
        rota: `/biblioteca/viewed/${item.cod_biblioteca}`,
        parametros: {
          token: user.token,
        },
        showNotification: false,
        showLogError: false,
      };

      const response = (await postData(parametros)) as any;
      setLeituras(response.data.data.viewed);
    } catch (error) {
      console.log(error);
    }
  };

  const ratinkBook = async (data: any) => {
    try {
      setIsLoading(true);
      let parametros = {
        rota: `/biblioteca/rate/${item.cod_biblioteca}`,
        //parametros: `token=${user.token}&rating=${data}`,
        parametros: {
          token: user.token,
          rating: data,
        },
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      await buscaBook();
      console.log("Rating enviado", response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const buscaBook = async () => {
    try {
      let parametros = {
        rota: `/biblioteca/get/${item.cod_biblioteca}`,
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      const response = (await postData(parametros)) as any;
      setBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              if (pagina_origem != undefined) {
                navigation.navigate(pagina_origem, {});
              } else {
                navigation.navigate("HomeDrawer");
              }
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
  console.log(book, "boook");

  const COMPONETEINFORMACOES = () => {
    return (
      <>
        <View
          style={{
            width: "90%",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            bottom: wp("115"),
            position: "absolute",
          }}
        >
          <View
            style={[
              Platform.OS == "ios" ? Styles.sombraIos : Styles.sombraAndroid,
            ]}
          >
            <FastImage
              source={{
                uri: book.capa_biblioteca,
              }}
              style={[
                {
                  width: 140,
                  height: 202,
                  borderRadius: 10,
                },
              ]}
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <CustomText
              numberOfLines={2}
              textType="montserratBold"
              style={{
                color: CustomDefaultTheme.colors.text,
                fontSize: 18,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              {book.titulo_biblioteca}
            </CustomText>
            <CustomText
              style={{
                color: CustomDefaultTheme.colors.text,
                fontSize: 10,
              }}
            >
              {book.autor_biblioteca}
            </CustomText>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <StarRating
              rating={rating}
              onChange={ratingCompleted}
              emptyColor={"#FFF"}
              color={CustomDefaultTheme.colors.primaryButton}
            />

            {/*<Rating
              style={{ paddingVertical: 3, backgroundColor: 'transparent' }}
              ratingCount={5}
              imageSize={26}
              tintColor={'#111'}
              ratingBackgroundColor={CustomDefaultTheme.colors.primary}
              onFinishRating={ratingCompleted}
              startingValue={book.rating_avg}
            >*/}
          </View>

          <View
            style={{
              //backgroundColor: CustomDefaultTheme.colors.sliderTrackplayer,
              padding: 5,
              borderRadius: 10,
              height: 70,
              marginTop: 15,
            }}
          >
            <View
              style={{
                backgroundColor: CustomDefaultTheme.colors.informacoesLivroSinopse,
                width: "100%",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 10,
                flexDirection: "row",
                borderWidth: 0.2,
                borderColor: CustomDefaultTheme.colors.sliderTrackplayer,
              }}
            >
              <View style={[Styles.tituloinformacoesiconPaiView]}>
                <View style={[Styles.tituloinformacoesicon]}>
                  <AntDesign name="eyeo" size={20} color={CustomDefaultTheme.colors.text} />
                  <CustomText textType="montserratBold" style={[Styles.fontTituloIcon]}>
                    Leituras
                  </CustomText>
                </View>
                <CustomText textType="montserratBold" style={{}}>
                  {retornaNumeroComMascara(leituras)}
                </CustomText>
              </View>
              <View
                style={[Styles.borderinformacoes]}
              />
              <View
                style={[
                  Styles.tituloinformacoesiconPaiView,
                  {
                    //borderLeftWidth: 0.2,
                    //borderRightWidth: 0.2,
                    padding: 10,
                    //borderColor: "#8C8990",
                  },
                ]}
              >
                <View style={[Styles.tituloinformacoesicon]}>
                  <AntDesign name="staro" size={20} color={CustomDefaultTheme.colors.text} />
                  <CustomText textType="montserratBold" style={[Styles.fontTituloIcon]}>Votos</CustomText>
                </View>
                <CustomText textType="montserratBold" style={{}}>
                  {retornaNumeroComMascara(book.rating_total)}
                </CustomText>
              </View>
              <View
                style={[Styles.borderinformacoes]}
              />
              <View style={[Styles.tituloinformacoesiconPaiView]}>
                <View style={[Styles.tituloinformacoesicon]}>
                  <AntDesign name="bars" size={20} color={CustomDefaultTheme.colors.text} />
                  <CustomText textType="montserratBold" style={[Styles.fontTituloIcon]}>
                    Páginas
                  </CustomText>
                </View>
                <CustomText textType="montserratBold" style={{}}>{book.paginas}</CustomText>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    if (isFocused) {
      setBook(item);
      handleTop();
      livroVisualizado();
    }

    return () => {};
  }, [isLoading, isFocused, item]);

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
              <View>
                <FastImage
                  source={{
                    //uri: book.capa_biblioteca,
                  }}
                  style={[Styles.b2,]}
                >
                  <LinearGradient
                    colors={[
                      Platform.OS == "ios" ? "transparent" : "transparent",
                      Platform.OS == "ios" ? "transparent" : "transparent",
                      CustomDefaultTheme.colors.background,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{
                      x: 0,
                      y: Platform.OS == "ios" ? 0.9 : 0.9,
                    }}
                    style={Styles.LineaImagem}
                  ></LinearGradient>
                </FastImage>
              </View>

              <Animated.View style={[Styles.linha]}>
                <Animated.View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <COMPONETEINFORMACOES />
                  <View
                    style={{
                      width: "100%",
                      marginTop: 0,
                      paddingHorizontal: wp("5"),
                      height: wp("85"),
                      //backgroundColor: '#F00'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        textType="montserratSemiBold"
                        style={{
                          color: CustomDefaultTheme.colors.primaryButton,
                          fontSize: 14,
                          letterSpacing: 0.14,
                          lineHeight: 15,
                        }}
                      >
                        Sinopse
                      </CustomText>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MinhaListaButtonBook
                          size={20}
                          cod_biblioteca={item.cod_biblioteca}
                        />
                        <View style={{width: 10}} />
                        <CompartilharButton
                          size={20}
                          background={CustomDefaultTheme.colors.backgroundIconsButton}
                          tipo={199}
                          array={book}
                        />
                      </View>
                    </View>

                    <TextoExpand
                      text={book.descricao_biblioteca}
                      children={
                        <>
                          <Button
                            uppercase={false}
                            style={{
                              borderRadius: 10,
                              backgroundColor:
                                CustomDefaultTheme.colors.primaryButton,
                            }}
                            contentStyle={{
                              width: "100%",
                              marginRight: 15,
                              padding: 10
                            }}
                            onPress={handleOpenUrl}
                          >
                            <CustomText
                              textType="montserratBold"
                              style={{
                                color: "#FFF",
                              }}
                            >
                              Começar a Ler
                            </CustomText>
                          </Button>
                        </>
                      }
                    />
                  </View>
                </Animated.View>
              </Animated.View>
              <View style={{ height: 100 }} />
            </>
          );
        }}
      />

      {isLoading && <Loading />}
    </>
  );
};

export default SinopseLivro;
