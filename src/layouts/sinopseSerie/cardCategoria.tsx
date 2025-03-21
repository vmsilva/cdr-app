import React, { useState } from "react";
import { View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import CustomText from "../../componentes/componentes/customText";
import FastImage from "react-native-fast-image";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { EMPRESA } from "../../configuracoes/utils/constants";
import { useAuth } from "../../configuracoes/hooks/auth";
import Loading from "../../componentes/funcionalidade/Loading";

const CardCategoria: React.FC<any> = ({ item, palestrante, categorias }) => {
  const navigation = useNavigation() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const buscaCategoria = async (cod_categoria: any) => {
    try {
      setIsLoading(true);
      let parametrosTemporadas = {
        rota: `/categorias/categoria/${cod_categoria}/temporadas`,
        parametros: `token=${EMPRESA.EMPRESA.token_cliente}&token_usuario=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
     
      //alert(`/categorias/categoria/${cod_categoria}/temporadas`); 
      let response = (await getData(parametrosTemporadas)) as any;
      setIsLoading(false);

      //console.log(parametrosTemporadas,'------>>>>> codigooooo')

      return response.data.data
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'buscar categoria');
    } 
  };


  const handleOpenUrl = async() => {
    try{

    let ITEMCAT = item;
    let RESPOSTATEMPORADASSINGLE = await buscaCategoria(ITEMCAT.cod_categoria);
    //return;

    ITEMCAT["apresentacao_apresentador"] =  palestrante.descricao_palestrante;
    ITEMCAT["nome_apresentador"] = palestrante.nome_palestrante;
    ITEMCAT["subtitulo_apresentador"] =  palestrante.subnome_palestrante;
    ITEMCAT["url_foto_apresentador"] =  palestrante.url_foto_palestrante;

    let CATEGORIASINGLE = {
      categoria: {
        categoria: ITEMCAT,
        temporadas: RESPOSTATEMPORADASSINGLE.temporadas,
        videos: {}
      },
      cod_categoria_temporada : RESPOSTATEMPORADASSINGLE.temporadas[0].cod_categoria_temporada,
      item: ITEMCAT,
      pagina_origem: "FiltroPalestranteCursosDrawer",
      relacionados: [],
      categorias: categorias,
      palestrante: palestrante
    }

    //console.log(CATEGORIASINGLE.categoria.temporadas[0].palestrantes_temporada); return

    navigation.navigate("SinopseSerieDrawer", CATEGORIASINGLE);


    }catch(error){
      console.log(error, 'error cardTemporada')
    }
  };

  return (
    <View>
      <View
        style={{
          //borderTopWidth: 1,
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
              uri: item.url_foto_categoria,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              paddingHorizontal: 10,
              maxWidth: "77%", //320,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
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
                {item.nome_categoria}
              </CustomText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: 'none'
                }}
              >
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
                    marginLeft: 4
                  }}
                  textType="montserratMedium"
                >
                  {
                    (item.duracao_formatada)
                    //convertTime(item.duracao_total_time)
                  }
                </CustomText>
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

            <CustomText
              numberOfLines={2}
              style={{
                fontSize: 8,
                color: CustomDefaultTheme.colors.text,
                letterSpacing: 0.16,
                lineHeight: 10,
              }}
              textType="montserratMedium"
            >
              {item.sinopse_categoria}asdfadsfasas
            </CustomText>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        >
          <Button
            //onPress={() => console.log(item)}
            onPress={handleOpenUrl}
            style={{
              borderRadius: 10,
              //borderWidth: 1,
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

export default CardCategoria;
