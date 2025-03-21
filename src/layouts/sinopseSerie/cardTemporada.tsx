import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import Styles from "./Styles";
import CustomText from "../../componentes/componentes/customText";
import FastImage from "react-native-fast-image";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { EMPRESA } from "../../configuracoes/utils/constants";
import { useAuth } from "../../configuracoes/hooks/auth";
import Loading from "../../componentes/funcionalidade/Loading";

const CardTemporada: React.FC<any> = ({ item, categoria }) => {
  const navigation = useNavigation() as any;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      setIsLoading(true);
      let parametrosTemporadas = {
        rota: `/categorias/categoria/${cod_categoria}/temporadas`,
        parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      let response = (await getData(parametrosTemporadas)) as any;
      setIsLoading(false);

      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error, "buscar categoria");
    }
  };

  const montaJSONOBJETOSOLD = async (item) => {
    
    try {
      let ITEMCAT = item;

      let RESPOSTATEMPORADASSINGLE = await buscaCategoria(
        ITEMCAT.categorias[0].cod_categoria
      );

      ITEMCAT.categorias[0]["apresentacao_apresentador"] =
        item.palestrante.descricao_palestrante;
      ITEMCAT.categorias[0]["nome_apresentador"] =
        item.palestrante.nome_palestrante;
      ITEMCAT.categorias[0]["subtitulo_apresentador"] =
        item.palestrante.subnome_palestrante;
      ITEMCAT.categorias[0]["url_foto_apresentador"] =
        item.palestrante.url_foto_palestrante;

      let CATEGORIASINGLE = {
        categoria: {
          categoria: ITEMCAT.categorias[0],
          temporadas: RESPOSTATEMPORADASSINGLE.temporadas,
          videos: {},
        },
        cod_categoria_temporada:
          RESPOSTATEMPORADASSINGLE.temporadas[0].cod_categoria_temporada,
        item: ITEMCAT.categorias[0],
        palestrante: item.palestrante,
        pagina_origem: "FiltroTemporadaDrawer",
        relacionados: [],
      };
      //console.log(CATEGORIASINGLE.categoria.temporadas); return
      navigation.navigate("SinopseSerieDrawer", CATEGORIASINGLE);
    } catch (error) {
      console.log(error, "montajson error");
    }
  };
  
  const montaJSONOBJETOS = async (item_montajson) => {
    //console.log(item); return;
    try {
      let ITEMCAT = item_montajson;

      let RESPOSTATEMPORADASSINGLE = await buscaCategoria(
        item.cod_categoria//ITEMCAT.categorias[0].cod_categoria
      );

      ITEMCAT.categorias[0]["apresentacao_apresentador"] =
        item.palestrantes_temporada[0].descricao_palestrante;
      ITEMCAT.categorias[0]["nome_apresentador"] =
        item.palestrantes_temporada[0].nome_palestrante;
      ITEMCAT.categorias[0]["subtitulo_apresentador"] =
        item.palestrantes_temporada[0].subnome_palestrante;
      ITEMCAT.categorias[0]["url_foto_apresentador"] =
        item.palestrantes_temporada[0].url_foto_palestrante;

      let CATEGORIASINGLE = {
        categoria: {
          palestrante_temporada: {
            apresentacao_apresentador: item.palestrantes_temporada[0].descricao_palestrante,
            nome_apresentador: item.palestrantes_temporada[0].nome_palestrante,
            subtitulo_apresentador: item.palestrantes_temporada[0].subnome_palestrante,
            url_foto_apresentador: item.palestrantes_temporada[0].url_foto_palestrante,
          },
          categoria: ITEMCAT.categorias[0],
          temporadas: RESPOSTATEMPORADASSINGLE.temporadas,
          videos: {},
        },
        cod_categoria_temporada:
          RESPOSTATEMPORADASSINGLE.temporadas[0].cod_categoria_temporada,
        item: ITEMCAT.categorias[0],
        palestrante: item.palestrantes_temporada[0],
        pagina_origem: "FiltroTemporadaDrawer",
        relacionados: [],
      };
      //console.log(CATEGORIASINGLE.categoria.temporadas); return
      navigation.navigate("SinopseSerieDrawer", CATEGORIASINGLE);
    } catch (error) {
      console.log(error, "montajson error");
    }
  };

  const handleBuscar = async () => {
    //console.log(item);  return;
    try {
      //console.log(item); return; //apresentadores_temporada

      //console.log(item, "-->> cod_palestrante");return

      setIsLoading(true);
      let parametros = {
        rota: `palestrantes/get/${item.apresentadores_temporada[0]}`,
        parametros: `token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      //console.log(parametros, item, '--->> testeeeee booooora');
      const response = (await getData(parametros)) as any;

      await montaJSONOBJETOS(response.data.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, "Busca palestrante conteudo");
    }
  };

  if (item.palestrantes_temporada[0] == undefined) {
    return;
  }

  return (
    <View style={{}}>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#343434",
          marginTop: 5,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            maxWidth: "100%",
            flexDirection: "row",
          }}
        >
          <FastImage
            style={{
              borderRadius: 10,
              width: 90,
              height: 90,
              backgroundColor: CustomDefaultTheme.colors.backgroundCards,
            }}
            source={{
              uri: item.palestrantes_temporada[0].url_foto_palestrante,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              paddingHorizontal: 10,
              width: "76%", //320,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "84%",
                //backgroundColor: '#FF0'
              }}
            >
              <CustomText
                numberOfLines={2}
                style={{
                  fontSize: 15,
                  color: CustomDefaultTheme.colors.iconsPrimaryColor,
                  lineHeight: 20,
                }}
                textType="montserratBold"
              >
                {item.palestrantes_temporada[0].nome_palestrante}
              </CustomText>
              <View
                style={{
                  justifyContent: "flex-end",
                  left: 5
                }}
              >
                <View style={[Styles.clockCard]}>
                  <MaterialCommunityIcons
                    name="clock"
                    size={15}
                    color={CustomDefaultTheme.colors.bioapresentadorFont}
                  />
                  <CustomText
                    numberOfLines={2}
                    style={{
                      fontSize: 10,
                      color: "#828282",
                      lineHeight: 20,
                      marginRight: 10,
                      marginLeft: 4,
                    }} 
                    textType="montserratMedium"
                  >
                    {
                      item.duracao_formatada != '' && item.duracao_formatada.substring(0,6)
                    }
                  </CustomText>
                </View>
                <View style={[Styles.clockCard]}>
                  <Ionicons name="videocam" size={15} color="#828282" />
                  <CustomText
                    numberOfLines={2}
                    style={{
                      fontSize: 10,
                      color: "#828282",
                      lineHeight: 20,
                    }}
                    textType="montserratMedium"
                  >
                    {`  ${
                      item.videos != null && Object.values(item.videos).length
                    } aulas`}
                  </CustomText>
                </View>
              </View>
            </View>

            <CustomText
              numberOfLines={2}
              style={{
                fontSize: 8,
                color: CustomDefaultTheme.colors.descricao_palestrante,
                letterSpacing: 0.16,
                lineHeight: 10,
              }}
              textType="montserratMedium"
            >
              {item.nome_temporada}
            </CustomText>

            <CustomText
              numberOfLines={6}
              style={{
                fontSize: 8,
                color: CustomDefaultTheme.colors.cinzaEscuro,
                letterSpacing: 0.16,
                lineHeight: 10,
              }}
              textType="montserratMedium"
            >
              {item.palestrantes_temporada[0].descricao_palestrante}
            </CustomText>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        >
          <Button
            uppercase={false}
            onPress={handleBuscar}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: CustomDefaultTheme.colors.buttonCardSerie,
              backgroundColor: CustomDefaultTheme.colors.buttonCardSerie,
              height: 46,
            }}
            contentStyle={{
              height: 46,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomText
              numberOfLines={2}
              style={{
                fontSize: 15,
                color: CustomDefaultTheme.colors.branco,
                //letterSpacing: 0.12,
                lineHeight: 19,
              }}
              textType="montserratBold"
            >
              Assista
            </CustomText>
          </Button>
        </View>
      </View>
      {isLoading && <Loading />}
    </View>
  );
};

export default CardTemporada;
