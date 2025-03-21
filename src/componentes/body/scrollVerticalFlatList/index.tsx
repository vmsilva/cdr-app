import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

// Configuracões
import styles from "./Styles";
import CustomImage from "../../componentes/CustomImage";
import LinearGradient from "react-native-linear-gradient";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import { useAuth } from "../../../configuracoes/hooks/auth";
import { getData } from "../../../configuracoes/services/request";
import { EMPRESA } from "../../../configuracoes/utils/constants";
import Loading from "../../funcionalidade/Loading";
import CustomText from "../../componentes/customText";

interface CapaVerticalProps {
  array: any[];
  tipo: string; // audio ou video
}

const ScrollVerticalFlatList: React.FC<CapaVerticalProps> = ({
  array,
  tipo,
}) => {
  const navigation = useNavigation() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const buscaCategoria = async (cod_categoria: any) => {
    //console.log(cod_categoria); return;
    try {
      setIsLoading(true);
      let parametrosTemporadas = {
        rota: `/categorias/categoria/${cod_categoria}/temporadas`,
        parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };

      //alert(`/categorias/categoria/${cod_categoria}/temporadas`)

      console.log(parametrosTemporadas, "parametros temporada");

      let response = (await getData(parametrosTemporadas)) as any;
      setIsLoading(false);

      return response.data.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error, "buscar categoria");
    }
  };

  const montaJSONOBJETOS = async (item) => {
    try {
      let ITEMCAT = item;
      //alert('palestrante curssoooo')
      if (item.categorias.length > 1) {
        navigation.navigate("FiltroPalestranteCursosDrawer", {
          item: item.palestrante,
          categorias: item.categorias,
        });
      } else {
        //alert('palestrante curssoooo')
        let RESPOSTATEMPORADASSINGLE = await buscaCategoria(
          ITEMCAT.categorias[0].cod_categoria
        );

        //console.log(RESPOSTATEMPORADASSINGLE); return;
        ITEMCAT.categorias[0]["apresentacao_apresentador"] =
          item.palestrante.descricao_palestrante;
        ITEMCAT.categorias[0]["nome_apresentador"] =
          item.palestrante.nome_palestrante;
        ITEMCAT.categorias[0]["subtitulo_apresentador"] =
          item.palestrante.subnome_palestrante;
        ITEMCAT.categorias[0]["url_foto_apresentador"] =
          item.palestrante.url_foto_palestrante;

        //let temporadasDaCategoria = item.temporadas.filter(temporada => temporada.cod_categoria === ITEMCAT.categorias[0].cod_categoria);

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
          relacionados: [],
        };
        //console.log(CATEGORIASINGLE.categoria.temporadas, 'victor'); return
        navigation.navigate("SinopseSerieDrawer", CATEGORIASINGLE);
      }
    } catch (error) {
      console.log(error, "montajson error");
    }
  };

  const handleBuscar = async (item) => {
    try {
      setIsLoading(true);
      let parametros = {
        rota: `palestrantes/get/${item.cod_palestrante}`,
        parametros: `token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;
      console.log(
        "------------",
        response.data.data,
        user.token,
        "-------------"
      );

      await montaJSONOBJETOS(response.data.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, "Busca palestrante conteudo");
    }
  };

  const handleOpenUrl = (item: any) => {
    //console.log(item.cod_categoria, '----> categoria', item); return;

    switch (tipo) {
      case "programas":
        navigation.navigate("FiltroTemporadaDrawer", {
          //SinopseSerieDrawer
          item: item,
          relacionados: [],
          categoria: item,
        });
        break;
      case "palestrantes":
        console.log(item.cod_palestrante, "-->> cod palestrante");
        handleBuscar(item);
        break;
      default:
        navigation.navigate("SinopseLivroDrawer", { item: item });
        break;
    }
  };

  const COMPONENTEIMAGEM = (props) => {
    switch (tipo) {
      case "programas":
        return (
          <CustomImage
            source={{
              uri: props.item.url_foto_v_categoria,
            }}
            style={styles.imgThumbContent}
            children={
              <>
                <LinearGradient
                  colors={["transparent", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{
                    x: 0,
                    y: 0.99, //Platform.OS == "ios" ? 0.9 : 0.8,
                  }}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.transparent,
                    height: "100%",
                    width: "100%",
                    borderRadius: 10,
                  }}
                ></LinearGradient>
              </>
            }
          />
        );
        break;
      case "palestrantes": console.log(props.item)
        return (
          <FastImage
            source={{
              uri: props.item.url_foto_palestrante,
            }}
            style={styles.imgThumbContent}
            children={
              <>
                <LinearGradient
                  colors={[
                    "transparent",
                    "transparent",
                    CustomDefaultTheme.colors.corsombradestaque,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{
                    x: 0,
                    y: 0.99, //Platform.OS == "ios" ? 0.9 : 0.8,
                  }}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.transparent,
                    height: "100%",
                    width: "100%",
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 15
                  }}
                >

                  <CustomText textType="montserratBold" style={{
                    fontSize: 12,
                    textAlign: 'center'
                      //bottom: 25, position: 'absolute'
                      }}>{props.item.nome_palestrante}</CustomText>
                </LinearGradient>
              </>
            }
          />
        );

        break;
      default:
        return (
          <CustomImage
            source={{
              uri: props.item.capa_biblioteca,
            }}
            style={styles.imgThumbContent}
            children={
              <>
                <LinearGradient
                  colors={["transparent", "transparent", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{
                    x: 0,
                    y: 0.99, //Platform.OS == "ios" ? 0.9 : 0.8,
                  }}
                  style={{
                    backgroundColor: CustomDefaultTheme.colors.transparent,
                    height: "100%",
                    width: "100%",
                    borderRadius: 10,
                  }}
                ></LinearGradient>
              </>
            }
          />
        );
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={array != undefined ? array : [1]}
          horizontal={true} // Define a lista como horizontal
          renderItem={({ item, index }) => {
            //console.log(index == 0 ? item : '')
            return (
              <TouchableOpacity onPress={() => handleOpenUrl(item)}>
                <View style={styles.thumbContent}>
                  <COMPONENTEIMAGEM item={item} />
                </View>
                {/*tipo == 'palestrantes' && <View
                  style={{
                    width: 180,
                    paddingHorizontal: 10
                    //backgroundColor: '#FF0'
                  }}
                >
                    <CustomText textType="montserratBold">{item.nome_palestrante}</CustomText>
                    <CustomText numberOfLines={2} textType="montserratLight" style={{fontSize: 10}} >{item.subnome_palestrante}</CustomText>
                    </View>
                */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {isLoading && <Loading />}
    </>
  );
};
export default ScrollVerticalFlatList;
