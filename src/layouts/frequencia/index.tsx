import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// imagens
import LOGOHEADER from "../../assets/logo.png";
// component
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";

import Styles from "./Styles";
import StylesBoletim from "../boletim/Styles";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { Avatar } from "react-native-paper";
import { useAuth } from "../../configuracoes/hooks/auth";
import AccordionGenerico from "../../componentes/body/accordionGenerico";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getData } from "../../configuracoes/services/request";
import Loading from "../../componentes/funcionalidade/Loading";

const FrequenciaPage: React.FC<any> = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [frequencia, setFrequencia] = useState<any>([]);

  const buscaFrequencia = async () => {
    try {
      setIsLoading(true);
      console.log("busca frequencia");
      let parametros = {
        rota: "ead/progressocategorias",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      //console.log(response.data.data, 'frequenciaaaaa____', parametros);
      setFrequencia(response.data.data);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={false}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
              navigation.navigate('HomeDrawer');
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
        titulo={"Frequência"}
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

  const COMPONENTEHEADERACCORDION = (props) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            //backgroundColor: "#FF0",
          }}
        >
          <View style={[Styles.conteudoaccordion]}>
            <CustomText
              style={{
                color: CustomDefaultTheme.colors.textFundoClaro,
                fontSize: 16,
              }}
            >
              {props.materia}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "50%",
              // backgroundColor: '#FFF'
            }}
          >
            <View style={[Styles.freqNumero]}>
              <CustomText
                style={{ fontSize: 16, color: CustomDefaultTheme.colors.verde }}
              >
                {props.presenca}
              </CustomText>
            </View>
            <View style={[Styles.freqNumero]}>
              <CustomText style={{ fontSize: 16, color: "red" }}>
                {props.falta}
              </CustomText>
            </View>
          </View>
        </View>
      </>
    );
  };

  const COMPONENTEJUSTIFICADA = () => {
    return (
      <>
        <View
          style={[
            Styles.justificado,
            {
              backgroundColor: CustomDefaultTheme.colors.verde,
            },
          ]}
        >
          <CustomText
            textType="regular"
            style={{ color: "#FFF", fontSize: 10, letterSpacing: 0.1 }}
          >
            Justificada
          </CustomText>
        </View>
      </>
    );
  };
  const COMPONENTENAOJUSTIFICADA = () => {
    return (
      <>
        <View
          style={[
            Styles.justificado,
            {
              backgroundColor: CustomDefaultTheme.colors.vermelho,
            },
          ]}
        >
          <CustomText
            textType="regular"
            style={{ color: "#FFF", fontSize: 10, letterSpacing: 0.1 }}
          >
            Não Justificada
          </CustomText>
        </View>
      </>
    );
  };

  const COMPONENTECONTENTACCORDION = (props) => {
    return (
      <>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: CustomDefaultTheme.colors.cinza,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#FFF",
          }}
        >
          <CustomText textType="light">08/12(ter.)</CustomText>

          {props.justificada ? (
            <COMPONENTEJUSTIFICADA />
          ) : (
            <COMPONENTENAOJUSTIFICADA />
          )}
        </View>
      </>
    );
  };

  //
  const ITEMACCORDION = [
    {
      periodo: "1 Bimestre",
      ementas: [
        {
          materia: "Lingua Portuguesa",
          cod_boletim: 1,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "Matemática",
          cod_boletim: 2,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "História",
          cod_boletim: 3,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
      ],
    },
    {
      periodo: "2 Bimestre",
      ementas: [
        {
          materia: "Lingua Portuguesa",
          cod_boletim: 10,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "Matemática",
          cod_boletim: 12,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "História",
          cod_boletim: 22,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
      ],
    },
  ] as any;

  useEffect(() => {
    if (isFocused) {
      buscaFrequencia();
    }
    return () => {};
  }, [isFocused]);

  useEffect(() => {},[frequencia]);

  return (
    <>
      <View style={[StylesBoletim.headerContent]}>
        <COMPONENTEHEADER />
      </View>

      <ScrollView
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={{
          paddingTop: 0,
          flex: 1,
          padding: "5%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
          }}
        >
          <View>
            {user.url_avatar ? (
              <Avatar.Image
                source={{ uri: user.url_avatar }}
                size={80}
                style={{ marginTop: 10 }}
              />
            ) : (
              <Avatar.Icon
                icon={() => (
                  <FontAwesome5 name="user-alt" size={wp("20%")} color="#FFF" />
                )}
                size={80}
                style={{
                  marginTop: 0,
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#FFF",
                }}
              />
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <CustomText
              style={{ color: CustomDefaultTheme.colors.primary, fontSize: 20 }}
            >
              {user.nome}
            </CustomText>
          </View>
        </View>

        <AccordionGenerico
          iconColor={"#FFF"}
          isExpanded={true}
          titulo="Curso"
          background={CustomDefaultTheme.colors.iconsPrimaryColor}
          color={CustomDefaultTheme.colors.primary}
          children={
            <>
              {
                frequencia.map((item, index) => {
                  return  <View
                  key={index}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.background,
                    padding: 10,
                    borderBottomWidth: .5,
                    borderBottomColor: CustomDefaultTheme.colors.primary
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <CustomText> {item.categoria.nome_categoria}</CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <CustomText style={[Styles.fonteTitulo]}>
                        Presença
                      </CustomText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "50%",
                        //paddingRight: 10,
                        backgroundColor: "#FFF",
                        padding:10,
                        borderRadius: 10
                      }}
                    >
                      <CustomText style={[Styles.fonteTitulo, {color: '#39894C'}]}>
                        {item.videos_assistidos}
                      </CustomText>
                    </View>
                  </View>
                </View>
                })
              }
             
            </>
          }
        />
      </ScrollView>
      {isLoading && <Loading />}
    </>
  );
};

export default FrequenciaPage;

/*
children={
            <>
              <View
                style={{
                  backgroundColor: CustomDefaultTheme.colors.cinza,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingBottom: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "50%",
                      paddingRight: 15,
                    }}
                  >
                      <CustomText style={[Styles.fonteTitulo]}>presença</CustomText>
                    <CustomText style={[Styles.fonteTitulo]}>falta</CustomText>
                  </View>
                </View>

                <AccordionGenerico
                  background={CustomDefaultTheme.colors.gelo}
                  accordionTitulo={
                    <>
                      <COMPONENTEHEADERACCORDION
                        materia={"Língua Portuguesa"}
                        presenca={"12"}
                        falta={"10"}
                      />
                    </>
                  }
                  children={<>
                  <COMPONENTECONTENTACCORDION />
                  <COMPONENTECONTENTACCORDION />
                  </>}
                />
                <AccordionGenerico
                   background={CustomDefaultTheme.colors.gelo}
                  accordionTitulo={
                    <>
                      <COMPONENTEHEADERACCORDION
                        materia={"Matemática"}
                        presenca={"16"}
                        falta={"4"}
                      />
                    </>
                  }
                  children={<>
                    <COMPONENTECONTENTACCORDION  justificada={true}/>
                  </>}
                />
              </View>
            </>
          }

*/
