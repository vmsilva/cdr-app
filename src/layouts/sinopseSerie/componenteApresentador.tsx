import React, { useState } from "react";
import { View } from "react-native";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

// config
import { getData } from "../../configuracoes/services/request";

// estilos
import CustomText from "../../componentes/componentes/customText";
import FastImage from "react-native-fast-image";

const ComponenteApresentador: React.FC<any> = ({ item }) => {
  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        //borderTopWidth: 0.4,
        paddingTop: 10,
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
        Apresentado por:
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
            width: "90%",
            flexDirection: "row",
          }}
        >
          <FastImage
            style={{
              borderRadius: 90,
              width: 90,
              height: 90,
              backgroundColor: CustomDefaultTheme.colors.backgroundCards,
            }}
            source={{
              uri: item.url_foto_apresentador,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              //paddingRight: 25,
              paddingLeft: 5,
              paddingVertical: 20,
              //backgroundColor: '#FF0',
              width: '85%'
            }}
          >
            <CustomText
              numberOfLines={2}
              style={{
                fontSize: 14,
                color: CustomDefaultTheme.colors.apresentadorFont,
                letterSpacing: 0.14,
                lineHeight: 18,
              }}
              textType="montserratBold"
            >
              {item.nome_apresentador}
            </CustomText>
            <CustomText
              numberOfLines={2}
              style={{
                fontSize: 12,
                color: CustomDefaultTheme.colors.cinzaEscuro,
                letterSpacing: 0.12,
                lineHeight: 15,
              }}
              textType="montserratMedium"
            >
              {item.subtitulo_apresentador}
            </CustomText>
           
          </View>
        </View>
        <View
          style={{
            padding: 15,
          }}
        >
          <CustomText
            style={{
              fontSize: 12,
              color: CustomDefaultTheme.colors.bioapresentadorFont,
              letterSpacing: 0.12,
              lineHeight: 16,
            }}
            textType="montserratMedium"
          >
            {item.apresentacao_apresentador}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default ComponenteApresentador;
