import React, { useState, useEffect, useContext } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Header from "../../componentes/header";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Card, Chip } from "react-native-paper";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

import Styles from "./Styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CardProgramacao from "../../componentes/body/cardProgramacao";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import {
  DIASSEMANA,
  MES,
  MESES,
  MESSTRING,
} from "../../configuracoes/utils/constants";
import CustomText from "../../componentes/componentes/customText";
import { EMPRESA } from "../../configuracoes/utils/constants/empresa";
import { postData } from "../../configuracoes/services/request";
import CardProgramacaoShimmer from "../../componentes/funcionalidade/shimmer/cardProgramacaoShimmer";

const Programacao: React.FC<any> = (props) => {
  const isFocused = useIsFocused();
  const { empresas } = useContext(UtilContext);
  const CONSTANTE_EMPRESA = Object.values(empresas)[0].cod_empresa as any; //props.route.params.empresa !== undefined ? props.route.params.empresa : "1";
  const CONSTANTE_ANO = new Date().getFullYear();
  const CONSTANTE_MES = new Date().getMonth() + 1;
  const CONSTANTE_DIA = new Date().getDate();
  const CONSTANTE_DIA_SEMANA = new Date().getDay();
  const diaSemanaTexto = DIASSEMANA.DIASSEMANA;
  const mesString = MESSTRING.MESSTRING;

  const [isLoading, setIsLoading] = useState(false);
  const [ano, setAno] = useState<any>();
  const [programacao, setProgramacao] = useState<any>([]);
  const [meses, setMeses] = useState<any>(MESES.MESES);
  const [mesSelecionado, setMesSelecionado] = React.useState<any>([
    mesString[CONSTANTE_MES],
    CONSTANTE_MES,
    "2023",
  ]);

  const carregaDiasMes = (mes: any, ano: any) => {
    let data = new Date(ano, mes, 0);
    return data.getDate();
  };

  const [diasMes, setDiasMes] = React.useState<any>(
    carregaDiasMes(CONSTANTE_MES, CONSTANTE_ANO)
  );
  const [diaSelecionado, setDiaSelecionado] = useState(CONSTANTE_DIA);
  const [diaSemana, setDiaSemana] = useState(CONSTANTE_DIA_SEMANA);
  const [empresa, setEmpresa] = useState(
    Object.values(empresas)[0].cod_empresa as any
  );

  const [minimoMes, setMinimoMes] = useState(false);
  const [maximoMes, setMaximoMes] = useState(false);
  const [clickEmpresa, setClickEmpresa] = useState(false);

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    if (isFocused) {
      if (!clickEmpresa) {
        setEmpresa(CONSTANTE_EMPRESA);
      }

      meses != undefined && Object.keys(meses).length > 0
        ? ""
        : buscaMesesDisponiveisProgramacao();

      if (mesSelecionado && diaSelecionado) {
        setTimeout(() => buscaProgramacao(), 500);
      }
    } else {
      setClickEmpresa(false);
    }

    return () => {
      setProgramacao([]);
    };
  }, [
    isFocused,
    ano,
    meses,
    mesSelecionado,
    diasMes,
    diaSemana,
    diaSelecionado,
    empresa,
    minimoMes,
    maximoMes,
    clickEmpresa,
  ]);

  //////////////////////////////////////////////
  const buscaMesesDisponiveisProgramacao = async () => {
    // retorno sempre fixo com tres ao vivos
    setMeses(MESES.MESES);

    setMesSelecionado(Object.values(MESES.MESES[`${CONSTANTE_MES}`]));
    setDiasMes(carregaDiasMes(CONSTANTE_MES, CONSTANTE_ANO));
    setDiaSemana(
      carregaDiasSemanaMes(CONSTANTE_MES, CONSTANTE_ANO, CONSTANTE_DIA)
    );
  };

  // botoes de anterior e proximo mes
  const handleProximoMes = () => {
    setMinimoMes(false);
    let proximoMes = parseInt(mesSelecionado[1]) + 1;

    if (
      proximoMes > Object.values(meses)[Object.values(meses).length - 1].mes
    ) {
      setMaximoMes(true);
      return;
    }
    let next = Object.entries(meses).find((e) =>
      parseInt(e[0]) == proximoMes ? e : ""
    );

    if (next != undefined) {
      setMesSelecionado(Object.values(next[1]));
      setDiasMes(carregaDiasMes(proximoMes, Object.values(next[1])[0]));
      CONSTANTE_MES != proximoMes
        ? (setDiaSelecionado(1),
          setDiaSemana(
            carregaDiasSemanaMes(proximoMes, Object.values(next[1])[0], 1)
          ))
        : (setDiaSelecionado(CONSTANTE_DIA),
          setDiaSemana(
            carregaDiasSemanaMes(
              proximoMes,
              Object.values(next[1])[0],
              CONSTANTE_DIA
            )
          ));
    }

    buscaProgramacao();
  };

  const handleMesAnterior = () => {
    setMaximoMes(false);
    let mesAnterior = parseInt(mesSelecionado[1]) - 1;
    if (
      Object.values(meses)[parseInt(mesSelecionado[1])] == undefined ||
      parseInt(mesSelecionado[1]) <= 1
    ) {
      setMinimoMes(true);
      return;
    }
    let next = Object.entries(meses).find((e) =>
      parseInt(e[0]) == mesAnterior ? e : ""
    );
    if (next != undefined) {
      setMesSelecionado(Object.values(next[1]));
      setDiasMes(carregaDiasMes(mesAnterior, Object.values(next[1])[0]));
      CONSTANTE_MES != mesAnterior
        ? (setDiaSelecionado(1),
          setDiaSemana(
            carregaDiasSemanaMes(mesAnterior, Object.values(next[1])[0], 1)
          ))
        : (setDiaSelecionado(CONSTANTE_DIA),
          setDiaSemana(
            carregaDiasSemanaMes(
              mesAnterior,
              Object.values(next[1])[0],
              CONSTANTE_DIA
            )
          ));
    }

    buscaProgramacao();
  };

  const carregaDiasSemanaMes = (mes: any, ano: any, dia: any) => {
    let diasSemanaCarregaDias = new Date(ano, mes - 1, dia).getDay();
    return diasSemanaCarregaDias;
  };

  // botoes de anterior e proximo mes
  const handleProximoDia = () => {
    setProgramacao([]);
    let proximoDia = diaSelecionado + 1;

    if (diaSelecionado < diasMes) {
      setDiaSelecionado(proximoDia);
      setDiaSemana(
        carregaDiasSemanaMes(
          parseInt(mesSelecionado[1]),
          CONSTANTE_ANO,
          proximoDia
        )
      );
    }

    buscaProgramacao();
  };

  const handleDiaAnterior = () => {
    setProgramacao([]);
    let diaAnterior = diaSelecionado - 1;

    if (
      diaAnterior > 0 ||
      (CONSTANTE_DIA <= diaAnterior && CONSTANTE_MES != mesSelecionado)
    ) {
      setDiaSelecionado(diaAnterior);
      setDiaSemana(
        carregaDiasSemanaMes(
          parseInt(mesSelecionado[1]),
          CONSTANTE_ANO,
          diaAnterior
        )
      );
    }

    buscaProgramacao();
  };

  const buscaProgramacao = async () => {
    setIsLoading(true);
    try {
      let parametros = {
        rota: "/programacao",
        parametros: {
          apikey_cliente: EMPRESA.token_cliente,
          data: `${CONSTANTE_ANO}-${mesSelecionado[1]}-${diaSelecionado}`,
        },
        showNotification: false,
        showLogError: true,
      };
      const resp = await postData(parametros) as any;

      let ARRAY = [];
      resp.data.data.programacao_empresas[empresa].map((_, i) => {
        if (resp.data.data.programacao[_] != undefined) {
          ARRAY.push(resp.data.data.programacao[_]);
        }
      });

      setProgramacao(ARRAY);
    } catch (error) {
      console.log(error,'-->arraymonta');
    } finally {
      setIsLoading(false);
    }
  };

  const LABELCOMPONENTE = () => {
    return (
      <View style={{ left: wp("3%"), justifyContent: "center" }}>
        <View style={Styles.legendasProgramacao}>
          <View style={{ backgroundColor: "transparent" }}>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                top: 0,
              }}
            >
              <Chip
                style={{
                  backgroundColor: CustomDefaultTheme.colors.aoVivoLive,
                  width: 50,
                  height: 10,
                }}
              >
                {" "}
              </Chip>
              <CustomText style={{ color: "#FFF", top: -6 }}>
                {" "}
                PROGRAMA AO VIVO
              </CustomText>
            </View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                top: 5,
              }}
            >
              <AntDesign name="plus" size={15} color="#FFF" />
              <CustomText style={{ color: "#FFF", fontSize: 12 }}>
                {" "}
                DETALHES{" "}
              </CustomText>
            </View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                top: windowHeight > 800 ? 20 : 10,
              }}
            >
              <CustomText style={{ color: "#FFF", fontSize: 12 }}>
                {" "}
                Grade sujeita a alterações{" "}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EMPRESACOMPONENTE = () => {
    return Object.values(empresas).map((_: any, i) => {
      return (
        <View
          key={_.cod_empresa}
          style={{
            marginLeft: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setEmpresa(_.cod_empresa);
              setClickEmpresa(true);
              setTimeout(() => {
                setProgramacao([]);
              }, 100);
            }}
            style={{
              borderColor:
                empresa == _.cod_empresa
                  ? CustomDefaultTheme.colors.bgprogramacao
                  : "transparent",
              backgroundColor:
                empresa == _.cod_empresa
                  ? CustomDefaultTheme.colors.bgprogramacao
                  : CustomDefaultTheme.colors.corBotaoProgramacao,
              borderWidth: 0.8,
              borderRadius: 5,
            }}
          >
            <View>
              <Card
                style={[
                  Styles.botaoCards,
                  {
                    width: wp("30%"),
                    borderRadius: 5,
                    backgroundColor:
                      empresa == _.cod_empresa
                        ? CustomDefaultTheme.colors.bgprogramacao
                        : CustomDefaultTheme.colors.corBotaoProgramacao,
                  },
                ]}
              >
                <Card.Content>
                  <CustomText
                    style={{
                      fontSize: 12,
                      color: "#FFF",
                      textAlign: "center",
                    }}
                  >
                    {_.nome_empresa}
                  </CustomText>
                </Card.Content>
              </Card>
            </View>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
        </View>
      );
    });
  };

  return (
    <>
      <Header
        style={{ backgroundColor: CustomDefaultTheme.colors.background }}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
          </TouchableOpacity>
        }
        titulo={"Envie sua Denúncia"}
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
                width: 26
              }}
            />
            <View
              style={{
                right: 10,
                width: 26
              }}
            />
          </View>
        }
      />

      <View style={{ paddingTop: hp("14"), height: hp("52%") }}>
        <View style={{ left: wp("3%"), justifyContent: "center" }}>
          <View style={Styles.mes}>
            <TouchableOpacity
              disabled={minimoMes}
              onPress={() => {
                if (isLoading) {
                } else {
                  setTimeout(() => {
                    handleMesAnterior();
                  }, 90);
                }
              }}
            >
              <View
                style={[
                  Styles.botaoMes,
                  {
                    backgroundColor: minimoMes
                      ? "#2b2e36"
                      : CustomDefaultTheme.colors.corBotaoProgramacao,
                  },
                ]}
              >
                <View>
                  {minimoMes ? (
                    <></>
                  ) : (
                    <AntDesign name="left" size={hp("2.1%")} color="#FFF" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ width: 5 }}></View>
            <View style={Styles.informacaoMes}>
              <View>
                <CustomText
                  style={{
                    textAlign: "center",
                    color: "#FFF",
                    fontSize: hp("1.5"),
                  }}
                >
                  {MESSTRING.MESSTRING[parseInt(mesSelecionado[1])]}
                </CustomText>
              </View>
            </View>
            <View style={{ width: 5 }}></View>
            <TouchableOpacity
              disabled={maximoMes}
              onPress={() => {
                if (isLoading) {
                } else {
                  setTimeout(() => {
                    handleProximoMes();
                  }, 90);
                }
              }}
            >
              <View
                style={[
                  Styles.botaoMes,
                  {
                    backgroundColor: maximoMes
                      ? "#2b2e36"
                      : CustomDefaultTheme.colors.corBotaoProgramacao,
                  },
                ]}
              >
                <View>
                  {maximoMes ? (
                    <></>
                  ) : (
                    <AntDesign name="right" size={hp("2.1%")} color="#FFF" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={Styles.dia}>
            <TouchableOpacity
              onPress={() => {
                if (isLoading) {
                } else {
                  setTimeout(() => {
                    handleDiaAnterior();
                  }, 90);
                }
              }}
            >
              <View style={Styles.botaoDia}>
                <View>
                  <AntDesign name="left" size={24} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ width: 5 }}></View>
            <View style={Styles.informacaoDia}>
              <View>
                <CustomText
                  style={{
                    //top: hp("-1.5%"),
                    textAlign: "center",
                    color: "#FFF",
                  }}
                >
                  {diaSemanaTexto[diaSemana]}
                </CustomText>
                <CustomText
                  style={{
                    top: hp("-.5%"),
                    fontSize: windowHeight > 800 ? hp("5.5") : hp("3.5"),
                    textAlign: "center",
                    color: "#FFF",
                  }}
                >
                  {diaSelecionado}
                </CustomText>
              </View>
            </View>
            <View style={{ width: 5 }}></View>
            <TouchableOpacity
              onPress={() => {
                if (isLoading) {
                } else {
                  setTimeout(() => {
                    handleProximoDia();
                  }, 90);
                }
              }}
            >
              <View style={Styles.botaoDia}>
                <View>
                  <AntDesign name="right" size={24} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <LABELCOMPONENTE />

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            top: hp("4%"),
          }}
        >
          <EMPRESACOMPONENTE />
        </View>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ top: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
        //{isLoading ? (
          <View
            style={{
              marginTop: hp("0%"),
            }}
          >
           <CardProgramacaoShimmer />
          </View>
        ) : programacao != undefined ? (
          Object.values(programacao).map((item: any, index: any) => {
            return (
              <View key={item.cod_programacao}>
                <CardProgramacao
                  url=""
                  info={item}
                  setUpdateData={[]}
                  dadosEmpresa={[]}
                />
                <View style={{ height: 10 }} />
              </View>
            );
          })
        ) : (
          <View
            style={{
              marginTop: hp("15%"),
            }}
          >
            <ActivityIndicator
              size={wp("20%")}
              color={CustomDefaultTheme.colors.branco}
            />
          </View>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default Programacao;
